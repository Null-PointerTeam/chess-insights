/**
 * Player Controller (Express + Mongoose)
 * Handles player fetching, Chess.com API integration, MongoDB caching, and error handling
 */

const sampleFallbacks = require('../sampleData');
const { compileGameReview, buildRepertoireTree } = require('../chessEngine');
const db = require('../config/db');

// In-Memory Cache for ultra-fast response and MongoDB-offline fallback
const memoryCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const countryNames = {
  IN: 'India', US: 'United States', NO: 'Norway', RU: 'Russia', FR: 'France',
  AM: 'Armenia', NL: 'Netherlands', PL: 'Poland', DE: 'Germany', ES: 'Spain',
  CA: 'Canada', GB: 'United Kingdom', CN: 'China', UZ: 'Uzbekistan'
};

async function fetchChessCom(endpointUrl) {
  console.log(`[OUTGOING API REQUEST] -> ${endpointUrl}`);
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'ChessInsights-MERN-App/1.0 (contact: hackathon@chessinsights.demo; platform: MERN)'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const duration = Date.now() - startTime;
    console.log(`[API RESPONSE] <- Status ${response.status} (${duration}ms) from ${endpointUrl}`);
    return response;
  } catch (err) {
    const duration = Date.now() - startTime;
    console.error(`[API ERROR] Fetch failed after ${duration}ms for ${endpointUrl}:`, err.message);
    throw err;
  }
}

function analyzeGames(games, targetUsername) {
  const lowerUser = targetUsername.toLowerCase();
  let wins = 0, losses = 0, draws = 0;
  const drawResults = new Set(['agreed', 'repetition', 'stalemate', 'timevsinsufficient', 'insufficient', '50move', 'draw']);

  for (const game of games) {
    const isWhite = (game.white?.username || '').toLowerCase() === lowerUser;
    const userSide = isWhite ? game.white : game.black;
    if (!userSide) continue;

    const result = (userSide.result || '').toLowerCase();
    if (result === 'win') wins++;
    else if (drawResults.has(result)) draws++;
    else losses++;
  }

  const totalGames = games.length;
  return {
    totalGames,
    wins,
    winPct: totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) + '%' : '0.0%',
    draws,
    drawPct: totalGames > 0 ? ((draws / totalGames) * 100).toFixed(1) + '%' : '0.0%',
    losses,
    lossPct: totalGames > 0 ? ((losses / totalGames) * 100).toFixed(1) + '%' : '0.0%'
  };
}

function extractRepertoire(games, targetUsername) {
  const lowerUser = targetUsername.toLowerCase();
  const drawResults = new Set(['agreed', 'repetition', 'stalemate', 'timevsinsufficient', 'insufficient', '50move', 'draw']);
  const openingMap = {};

  for (const game of games) {
    const isWhite = (game.white?.username || '').toLowerCase() === lowerUser;
    const userSide = isWhite ? game.white : game.black;
    if (!userSide) continue;

    let firstMove = '1. e4';
    if (game.pgn) {
      const moveMatch = game.pgn.match(/1\.\s*([a-hA-H0-9Nx+#=\-]+)/);
      if (moveMatch) firstMove = `1. ${moveMatch[1]}`;
    }

    let openingName = firstMove;
    if (game.eco) {
      const parts = game.eco.split('/openings/');
      if (parts[1]) {
        const rawName = decodeURIComponent(parts[1]).replace(/-/g, ' ');
        const tokens = rawName.split(' ');
        if (tokens.length > 3 && tokens.some(t => t.includes('.') || !isNaN(t[0]))) {
          const cutIdx = tokens.findIndex(t => t.includes('.') || !isNaN(t[0]));
          openingName = tokens.slice(0, cutIdx > 0 ? cutIdx : 3).join(' ');
        } else {
          openingName = tokens.slice(0, 4).join(' ');
        }
      }
    }

    const key = openingName;
    if (!openingMap[key]) {
      openingMap[key] = { opening: key, firstMove, games: 0, wins: 0, losses: 0, draws: 0 };
    }

    openingMap[key].games++;
    const res = (userSide.result || '').toLowerCase();
    if (res === 'win') openingMap[key].wins++;
    else if (drawResults.has(res)) openingMap[key].draws++;
    else openingMap[key].losses++;
  }

  const sorted = Object.values(openingMap)
    .sort((a, b) => b.games - a.games)
    .slice(0, 6)
    .map(item => {
      const winPct = item.games > 0 ? Math.round((item.wins / item.games) * 100) : 0;
      const perfDiff = (item.wins - item.losses) * 4;
      return {
        opening: item.opening,
        firstMove: item.firstMove,
        games: item.games,
        winPct: `${winPct}%`,
        isWinPositive: winPct >= 50,
        performance: perfDiff >= 0 ? `+${perfDiff}` : `${perfDiff}`
      };
    });

  return sorted.length > 0 ? sorted : sampleFallbacks.default.repertoire;
}

/**
 * Controller: GET /api/player/:platform/:username
 */
exports.getPlayer = async (req, res) => {
  const { platform, username } = req.params;
  const lowerUser = (username || '').trim().toLowerCase();

  // Platform Validation
  if (platform.toLowerCase() === 'lichess') {
    return res.status(501).json({ error: 'Lichess integration coming soon (TODO)' });
  }

  if (platform.toLowerCase() !== 'chess.com') {
    return res.status(400).json({ error: "Unsupported platform. Only 'chess.com' is supported." });
  }

  // 1. Check in-memory cache
  const cached = memoryCache.get(lowerUser);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    console.log(`[CACHE HIT] Returning cached data for '${username}' (age: ${Math.round((Date.now() - cached.timestamp) / 1000)}s)`);
    res.setHeader('X-Cache', 'HIT');
    return res.json(cached.data);
  }

  console.log(`[CACHE MISS] Fetching fresh data for '${username}' from Chess.com...`);

  try {
    // 2. Fetch Profile
    const profileUrl = `https://api.chess.com/pub/player/${encodeURIComponent(lowerUser)}`;
    const profileRes = await fetchChessCom(profileUrl);

    if (profileRes.status === 404) {
      return res.status(404).json({ error: 'Player not found on Chess.com' });
    }

    if (!profileRes.ok) {
      return res.status(502).json({ error: 'Chess.com API unavailable, try again' });
    }

    const profileData = await profileRes.json();

    // 3. Fetch Stats
    const statsUrl = `https://api.chess.com/pub/player/${encodeURIComponent(lowerUser)}/stats`;
    let statsData = {};
    try {
      const statsRes = await fetchChessCom(statsUrl);
      if (statsRes.ok) statsData = await statsRes.json();
    } catch (err) {
      console.warn(`[WARN] Stats fetch failed: ${err.message}`);
    }

    // 4. Fetch Recent Games
    const now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    let gamesMonthLabel = `${now.toLocaleString('default', { month: 'short' })} ${currentYear}`;
    let gamesUrl = `https://api.chess.com/pub/player/${encodeURIComponent(lowerUser)}/games/${currentYear}/${currentMonth}`;
    let games = [];

    try {
      const gamesRes = await fetchChessCom(gamesUrl);
      if (gamesRes.ok) {
        const data = await gamesRes.json();
        games = data.games || [];
      }

      if (games.length === 0) {
        const prevDate = new Date(currentYear, now.getMonth() - 1, 1);
        const prevYear = prevDate.getFullYear();
        const prevMonth = String(prevDate.getMonth() + 1).padStart(2, '0');
        gamesMonthLabel = `${prevDate.toLocaleString('default', { month: 'short' })} ${prevYear}`;
        const prevGamesUrl = `https://api.chess.com/pub/player/${encodeURIComponent(lowerUser)}/games/${prevYear}/${prevMonth}`;

        console.log(`[INFO] Current month has 0 games, checking previous month (${prevYear}/${prevMonth})...`);
        const prevRes = await fetchChessCom(prevGamesUrl);
        if (prevRes.ok) {
          const prevData = await prevRes.json();
          games = prevData.games || [];
        }
      }
    } catch (err) {
      console.warn(`[WARN] Games fetch failed: ${err.message}`);
    }

    // 5. Ratings & Primary Rating
    let primaryRating = { format: 'RAPID', rating: 1200, best: 1200 };
    if (statsData.chess_rapid?.last?.rating) {
      primaryRating = {
        format: 'RAPID',
        rating: statsData.chess_rapid.last.rating,
        best: statsData.chess_rapid.best?.rating || statsData.chess_rapid.last.rating
      };
    } else if (statsData.chess_blitz?.last?.rating) {
      primaryRating = {
        format: 'BLITZ',
        rating: statsData.chess_blitz.last.rating,
        best: statsData.chess_blitz.best?.rating || statsData.chess_blitz.last.rating
      };
    } else if (statsData.chess_bullet?.last?.rating) {
      primaryRating = {
        format: 'BULLET',
        rating: statsData.chess_bullet.last.rating,
        best: statsData.chess_bullet.best?.rating || statsData.chess_bullet.last.rating
      };
    }

    const ratings = {
      bullet: statsData.chess_bullet?.last?.rating || '-',
      blitz: statsData.chess_blitz?.last?.rating || '-',
      rapid: statsData.chess_rapid?.last?.rating || '-',
      puzzle: statsData.tactics?.highest?.rating || statsData.puzzle_rush?.best?.score || '-'
    };

    const gamesStats = analyzeGames(games, lowerUser);
    const repertoire = extractRepertoire(games, lowerUser);
    const repertoireTree = buildRepertoireTree(games, lowerUser);
    const reviewableGames = games.slice(0, 8).map(g => compileGameReview(g, lowerUser));

    const countryCode = profileData.country ? profileData.country.split('/').pop().toUpperCase() : '';
    const countryName = countryNames[countryCode] || countryCode || 'International';
    const joinedFormatted = profileData.joined
      ? new Date(profileData.joined * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Unknown';

    let lastOnlineFormatted = 'Recently';
    if (profileData.last_online) {
      const diffHours = Math.round((Date.now() - profileData.last_online * 1000) / (1000 * 60 * 60));
      if (diffHours < 1) lastOnlineFormatted = 'Just now';
      else if (diffHours < 24) lastOnlineFormatted = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      else lastOnlineFormatted = `${Math.round(diffHours / 24)} day${Math.round(diffHours / 24) > 1 ? 's' : ''} ago`;
    }

    const resultPayload = {
      platform: 'chess.com',
      username: profileData.username || username,
      name: profileData.name || profileData.username || username,
      avatar: profileData.avatar || '',
      country: countryCode,
      countryName: countryName,
      joined: joinedFormatted,
      lastOnline: lastOnlineFormatted,
      status: profileData.status || 'basic',
      primaryRating,
      ratings,
      overallRecord: statsData.chess_rapid?.record || statsData.chess_blitz?.record || { win: gamesStats.wins, loss: gamesStats.losses, draw: gamesStats.draws },
      recentMonth: {
        monthYear: gamesMonthLabel,
        ...gamesStats
      },
      repertoire,
      repertoireTree,
      reviewableGames,
      isFallback: false,
      fetchedAt: new Date().toISOString()
    };

    // Save to in-memory cache
    memoryCache.set(lowerUser, {
      data: resultPayload,
      timestamp: Date.now()
    });

    console.log(`[SUCCESS] Data compiled for '${username}' (${gamesStats.totalGames} games)`);
    res.setHeader('X-Cache', 'MISS');
    return res.json(resultPayload);
  } catch (err) {
    console.error(`[ERROR] Processing failed for '${username}':`, err);

    if (sampleFallbacks[lowerUser] || sampleFallbacks.default) {
      const fallbackData = sampleFallbacks[lowerUser] || {
        ...sampleFallbacks.default,
        username: username,
        name: username
      };
      console.warn(`[SAFETY NET] Activated fallback dataset for '${username}'`);
      res.setHeader('X-Demo-Fallback', 'true');
      return res.json(fallbackData);
    }

    return res.status(502).json({ error: 'Chess.com API unavailable, try again' });
  }
};

/**
 * Controller: GET /api/player/saved
 */
exports.getSavedPlayers = async (req, res) => {
  const defaultList = [
    { username: 'prabhavagarwal1234', name: 'Prabhav Agarwal', rating: '1987 RAPID', country: 'India [IN]' },
    { username: 'hikaru', name: 'Hikaru Nakamura', rating: '3280 BLITZ', country: 'USA [US]' },
    { username: 'magnuscarlsen', name: 'Magnus Carlsen', rating: '2941 RAPID', country: 'Norway [NO]' },
    { username: 'danielnaroditsky', name: 'Daniel Naroditsky', rating: '2614 RAPID', country: 'USA [US]' }
  ];
  return res.json(defaultList);
};
