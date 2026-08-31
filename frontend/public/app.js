/**
 * Chess Insights - Frontend Client
 * Interactive Move-by-Move Repertoire Explorer, Full Game Review Player,
 * Interactive "How to Beat Them" Tabs (Summary, White, Black),
 * Live Chess.com Search, and Streamlined Navigation.
 */

// Crisp Inline Chess Piece SVG Maps
const pieceSvgs = {
  P: `<svg viewBox="0 0 45 45" class="piece-svg"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  R: `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#FFFFFF" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17"/><path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/></g></svg>`,
  N: `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#FFFFFF" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-4.04 3-6 2.1-2.6 4.5-4.1 6-5 1.5-.9 3.5-1.5 4-2z"/><circle cx="17.5" cy="15.5" r="1.5" fill="#000"/></g></svg>`,
  B: `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#FFFFFF" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2zM15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/><path d="M17.5 26h10M22.5 21v10" stroke="#000" stroke-width="1.5"/></g></svg>`,
  Q: `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#FFFFFF" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-6-15-6 15-7-11 2 12z"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/></g></svg>`,
  K: `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#FFFFFF" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-6 2.5-6 2.5s-4-4.5-10-4.5-10 4.5-10 4.5-2-3.5-6-2.5c-3 6 6 10.5 6 10.5v7z"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/></g></svg>`,

  // Black Pieces
  p: `<svg viewBox="0 0 45 45" class="piece-svg"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  r: `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17" stroke="#FFF"/><path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/></g></svg>`,
  n: `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-4.04 3-6 2.1-2.6 4.5-4.1 6-5 1.5-.9 3.5-1.5 4-2z"/><circle cx="17.5" cy="15.5" r="1.5" fill="#FFF"/></g></svg>`,
  b: `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2zM15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/><path d="M17.5 26h10M22.5 21v10" stroke="#FFF" stroke-width="1.5"/></g></svg>`,
  q: `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-6-15-6 15-7-11 2 12z"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/></g></svg>`,
  k: `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke="#FFF"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-6 2.5-6 2.5s-4-4.5-10-4.5-10 4.5-10 4.5-2-3.5-6-2.5c-3 6 6 10.5 6 10.5v7z"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" stroke="#FFF"/></g></svg>`
};

// Country Flag Emoji Map
const countryFlagMap = {
  IN: '🇮🇳', US: '🇺🇸', NO: '🇳🇴', RU: '🇷🇺', FR: '🇫🇷', AM: '🇦🇲',
  NL: '🇳🇱', PL: '🇵🇱', DE: '🇩🇪', ES: '🇪🇸', CA: '🇨🇦', GB: '🇬🇧',
  CN: '🇨🇳', UZ: '🇺🇿', IT: '🇮🇹', BR: '🇧🇷', UA: '🇺🇦', AZ: '🇦🇿'
};

// Tactical Strategy Database for "How to Beat Them" Tabs
const howToBeatData = {
  summary: {
    tip: "Complete guide to victory: they lose 27% of games from won positions",
    weaknessesHeading: "WEAKNESSES — areas they struggle in",
    weaknesses: [
      { title: "Endgame (Queen vs Rook)", pct: "53.3%", desc: "Lost 8 of 15 games in this position" },
      { title: "Time Pressure (< 1 min)", pct: "52.4%", desc: "Lost 11 of 21 games in time trouble" },
      { title: "Defensive Mistakes", pct: "43.8%", desc: "High error rate in defensive positions" },
      { title: "Blunder Prone", pct: "43.3%", desc: "Prone to big blunders in tight games" }
    ],
    strengthsHeading: "STRENGTHS — areas they excel in",
    strengths: [
      { title: "Middle Game", pct: "80%", desc: "Won 20 of 25 games in middlegame" },
      { title: "Attacking Play", pct: "62.5%", desc: "Strong attacking instincts" }
    ],
    tips: [
      "✓ Avoid time scrambles",
      "✓ Attack on the kingside",
      "✓ Don't trade into equal endgames",
      "✓ Keep pressure in the middlegame"
    ]
  },
  white: {
    tip: "Playing White vs their Black Repertoire: Exploit passive French/Caro structures and attack the kingside",
    weaknessesHeading: "TACTICAL EXPLOITS AS WHITE (Against their Black Defense)",
    weaknesses: [
      { title: "Passive Caro-Kann / French Defense", pct: "57.1%", desc: "Struggles when White advances e5 and attacks f7" },
      { title: "Kingside Pawn Storms (h4 / g4)", pct: "62.5%", desc: "Vulnerable to aggressive flank pawn attacks" },
      { title: "Knight Pins on c6 & f6", pct: "50.0%", desc: "Frequently blunders tactics against pinned pieces" },
      { title: "Queenless Rook Endgames", pct: "54.2%", desc: "Loses control of open files in late rook endings" }
    ],
    strengthsHeading: "WHAT TO AVOID AS WHITE",
    strengths: [
      { title: "Symmetrical Pawn Exchanges", pct: "68%", desc: "Very comfortable in equal, quiet positions" },
      { title: "Rushing Center before Castling", pct: "65%", desc: "Punishes White if White King remains in center" }
    ],
    tips: [
      "✓ Open with 1. e4 or 1. d4 with aggressive center control",
      "✓ Castle Queenside and storm their Kingside pawns",
      "✓ Pressure their backward pawns on d5 / e6",
      "✓ Keep rooks active on open c and d files"
    ]
  },
  black: {
    tip: "Playing Black vs their White Openings: Create sharp imbalances, target overextended pawns, and counter-attack",
    weaknessesHeading: "TACTICAL EXPLOITS AS BLACK (Against their White Openings)",
    weaknesses: [
      { title: "Overextended White Pawns (moves 12–18)", pct: "55.6%", desc: "Pushes central pawns too far without sufficient piece backup" },
      { title: "Queenside Minority Attacks (b5 / a5)", pct: "58.3%", desc: "Struggles to defend weak c2 / c3 backward pawns" },
      { title: "Knight Outposts on d4 / e4", pct: "61.1%", desc: "Allows Black commanding central knight outposts" },
      { title: "Counter-Strikes in Time Trouble", pct: "52.0%", desc: "Misses sharp counter-tactics under 60 seconds" }
    ],
    strengthsHeading: "WHAT TO AVOID AS BLACK",
    strengths: [
      { title: "Passive King Defense", pct: "75%", desc: "Will ruthlessly attack a passive, cramped King" },
      { title: "Allowing Free Central Space", pct: "70%", desc: "Excels when allowed uncontested space advantage" }
    ],
    tips: [
      "✓ Play sharp Sicilian (c5) or King's Indian Defense",
      "✓ Counter-strike on the Queenside when they push center",
      "✓ Target their weak c2 and e4 pawn structures",
      "✓ Keep queens on the board to provoke endgame blunders"
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Global Data State
  let currentPlayerData = null;

  // Repertoire Explorer State
  let repertoireHistory = [];
  let isRepFlipped = false;

  // Game Review State
  let currentReviewGames = [];
  let activeGame = null;
  let currentMoveIndex = 0;
  let isAutoplaying = false;
  let autoplayInterval = null;
  let isReviewFlipped = false;

  // Top Search Elements
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const btnText = searchBtn.querySelector('.btn-text');
  const btnSpinner = searchBtn.querySelector('.btn-spinner');
  const loadingOverlay = document.getElementById('loading-overlay');
  const alertBanner = document.getElementById('alert-banner');
  const alertMessage = document.getElementById('alert-message');
  const alertClose = document.getElementById('alert-close');
  const fallbackBadge = document.getElementById('fallback-badge');
  const themeToggle = document.getElementById('theme-toggle');

  // Profile DOM Elements
  const displayUsername = document.getElementById('display-username');
  const playerAvatarContainer = document.getElementById('player-avatar-container');
  const playerInitials = document.getElementById('player-initials');
  const playerAvatarImg = document.getElementById('player-avatar-img');
  const profileExternalLink = document.getElementById('profile-external-link');
  const playerFlag = document.getElementById('player-flag');
  const playerCountry = document.getElementById('player-country');
  const playerJoined = document.getElementById('player-joined');
  const playerLastOnline = document.getElementById('player-last-online');
  const primaryRatingValue = document.getElementById('primary-rating-value');
  const primaryRatingType = document.getElementById('primary-rating-type');
  const compareP1Rating = document.getElementById('compare-p1-rating');

  // Stats DOM Elements
  const statTotalGames = document.getElementById('stat-total-games');
  const statMonthLabel = document.getElementById('stat-month-label');
  const statWins = document.getElementById('stat-wins');
  const statWinPct = document.getElementById('stat-win-pct');
  const statDraws = document.getElementById('stat-draws');
  const statDrawPct = document.getElementById('stat-draw-pct');
  const statLosses = document.getElementById('stat-losses');
  const statLossPct = document.getElementById('stat-loss-pct');

  // Rating Breakdown DOM Elements
  const ratingBullet = document.getElementById('rating-bullet');
  const ratingBlitz = document.getElementById('rating-blitz');
  const ratingRapid = document.getElementById('rating-rapid');
  const ratingPuzzle = document.getElementById('rating-puzzle');
  const twinUsernames = document.querySelectorAll('.twin-username');

  // Repertoire Elements
  const repChessboard = document.getElementById('rep-chessboard');
  const repPosPly = document.getElementById('rep-pos-ply');
  const repPosTitle = document.getElementById('rep-pos-title');
  const repPosGames = document.getElementById('rep-pos-games');
  const repPosWinrate = document.getElementById('rep-pos-winrate');
  const repBreadcrumbs = document.getElementById('rep-breadcrumbs');
  const repCandidateMoves = document.getElementById('rep-candidate-moves');
  const repertoireTableBody = document.getElementById('repertoire-table-body');
  const repBtnStart = document.getElementById('rep-btn-start');
  const repBtnPrev = document.getElementById('rep-btn-prev');
  const repBtnNext = document.getElementById('rep-btn-next');
  const repBtnFlip = document.getElementById('rep-btn-flip');

  // Game Review Elements
  const reviewChessboard = document.getElementById('review-chessboard');
  const gameSelector = document.getElementById('game-selector');
  const gameWhiteName = document.getElementById('game-white-name');
  const gameWhiteRating = document.getElementById('game-white-rating');
  const gameBlackName = document.getElementById('game-black-name');
  const gameBlackRating = document.getElementById('game-black-rating');
  const gameResultBadge = document.getElementById('game-result-badge');
  const gameAccWhite = document.getElementById('game-acc-white');
  const gameAccBlack = document.getElementById('game-acc-black');
  const currMoveLabel = document.getElementById('curr-move-label');
  const currEvalScore = document.getElementById('curr-eval-score');
  const currMoveComment = document.getElementById('curr-move-comment');
  const notationScrollBox = document.getElementById('notation-scroll-box');
  const gameBtnFirst = document.getElementById('game-btn-first');
  const gameBtnPrev = document.getElementById('game-btn-prev');
  const gameBtnPlay = document.getElementById('game-btn-play');
  const gameBtnNext = document.getElementById('game-btn-next');
  const gameBtnLast = document.getElementById('game-btn-last');
  const gameBtnFlip = document.getElementById('game-btn-flip');

  // How To Beat Elements
  const howToBeatTabs = document.getElementById('how-to-beat-tabs');
  const howToBeatTip = document.getElementById('how-to-beat-tip');
  const weaknessColTitle = document.getElementById('weakness-col-title');
  const weaknessItemsList = document.getElementById('weakness-items-list');
  const strengthColTitle = document.getElementById('strength-col-title');
  const strengthItemsList = document.getElementById('strength-items-list');
  const howToBeatBulletTips = document.getElementById('how-to-beat-bullet-tips');

  // Quick Chips & Saved Players
  const chipButtons = document.querySelectorAll('.chip-btn');
  const savedPlayerItems = document.querySelectorAll('.saved-player-item');
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const sections = document.querySelectorAll('.section-anchor');

  /**
   * Render an 8x8 chessboard given board array [8][8]
   */
  function renderBoard(boardContainer, boardMatrix, isFlipped = false) {
    boardContainer.innerHTML = '';
    const defaultBoard = [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];

    const matrix = boardMatrix || defaultBoard;

    for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
      for (let colIdx = 0; colIdx < 8; colIdx++) {
        const r = isFlipped ? 7 - rowIdx : rowIdx;
        const c = isFlipped ? 7 - colIdx : colIdx;
        const isLight = (r + c) % 2 === 0;

        const square = document.createElement('div');
        square.className = `sq ${isLight ? 'l' : 'd'}`;
        square.dataset.row = r;
        square.dataset.col = c;

        const piece = matrix[r][c];
        if (piece && piece !== '.') {
          square.innerHTML = pieceSvgs[piece] || '';
        }

        boardContainer.appendChild(square);
      }
    }
  }

  // ==========================================
  // HOW TO BEAT THEM TABS LOGIC
  // ==========================================

  function renderHowToBeatTab(tabKey) {
    const data = howToBeatData[tabKey] || howToBeatData.summary;

    howToBeatTip.textContent = data.tip;
    weaknessColTitle.textContent = data.weaknessesHeading;
    strengthColTitle.textContent = data.strengthsHeading;

    // Render Weaknesses
    weaknessItemsList.innerHTML = '';
    data.weaknesses.forEach(w => {
      const item = document.createElement('div');
      item.className = 'insight-item';
      item.innerHTML = `
        <div class="insight-title-row">
          <span>${w.title}</span>
          <span class="insight-pct red-text">${w.pct}</span>
        </div>
        <p class="insight-sub">${w.desc}</p>
      `;
      weaknessItemsList.appendChild(item);
    });

    // Render Strengths
    strengthItemsList.innerHTML = '';
    data.strengths.forEach(s => {
      const item = document.createElement('div');
      item.className = 'insight-item';
      item.innerHTML = `
        <div class="insight-title-row">
          <span>${s.title}</span>
          <span class="insight-pct green-text">${s.pct}</span>
        </div>
        <p class="insight-sub">${s.desc}</p>
      `;
      strengthItemsList.appendChild(item);
    });

    // Render Tips
    howToBeatBulletTips.innerHTML = '';
    data.tips.forEach(t => {
      const tipDiv = document.createElement('div');
      tipDiv.className = 'tip-line';
      tipDiv.textContent = t;
      howToBeatBulletTips.appendChild(tipDiv);
    });
  }

  if (howToBeatTabs) {
    const pills = howToBeatTabs.querySelectorAll('.pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const tabKey = pill.getAttribute('data-tab');
        renderHowToBeatTab(tabKey);
      });
    });
  }

  // Initialize with summary tab
  renderHowToBeatTab('summary');

  // ==========================================
  // REPERTOIRE EXPLORER LOGIC
  // ==========================================

  function initRepertoireTree(tree) {
    if (!tree) return;
    repertoireHistory = [tree];
    updateRepertoireView();
  }

  function updateRepertoireView() {
    if (repertoireHistory.length === 0) return;
    const currentNode = repertoireHistory[repertoireHistory.length - 1];

    // Render Board
    renderBoard(repChessboard, currentNode.board, isRepFlipped);

    // Update Header
    repPosPly.textContent = currentNode.ply === 0 ? 'Start' : `Move ${currentNode.ply}`;
    repPosTitle.textContent = currentNode.notation || 'Starting Position';
    repPosGames.textContent = currentNode.games;
    repPosWinrate.textContent = currentNode.winPct || '0%';
    repPosWinrate.className = currentNode.isWinPositive ? 'green-text' : 'red-text';

    // Update Breadcrumbs
    repBreadcrumbs.innerHTML = '';
    repertoireHistory.forEach((node, idx) => {
      const crumb = document.createElement('span');
      crumb.className = `crumb ${idx === repertoireHistory.length - 1 ? 'active' : ''}`;
      crumb.textContent = node.ply === 0 ? 'Start' : (node.san || `Ply ${node.ply}`);
      crumb.addEventListener('click', () => {
        repertoireHistory = repertoireHistory.slice(0, idx + 1);
        updateRepertoireView();
      });
      repBreadcrumbs.appendChild(crumb);
    });

    // Update Candidate Moves
    repCandidateMoves.innerHTML = '';
    if (currentNode.branches && currentNode.branches.length > 0) {
      currentNode.branches.forEach((branch, bIdx) => {
        const card = document.createElement('div');
        card.className = `candidate-card ${bIdx === 0 ? 'top-choice' : ''}`;
        const isGreen = branch.isWinPositive;

        card.innerHTML = `
          <div class="cand-top-row">
            <span class="cand-move">${branch.notation || branch.san}</span>
            <span class="cand-winrate ${isGreen ? 'green' : 'red'}">${branch.winPct} Win</span>
          </div>
          <span class="cand-meta">${branch.games} games played</span>
        `;

        card.addEventListener('click', () => {
          repertoireHistory.push(branch);
          updateRepertoireView();
        });

        repCandidateMoves.appendChild(card);
      });
      repBtnNext.disabled = false;
    } else {
      repCandidateMoves.innerHTML = '<p class="text-muted" style="font-size:0.8rem; padding: 6px;">End of recorded variations in sample dataset.</p>';
      repBtnNext.disabled = true;
    }

    repBtnPrev.disabled = repertoireHistory.length <= 1;
  }

  repBtnStart.addEventListener('click', () => {
    if (repertoireHistory.length > 1) {
      repertoireHistory = [repertoireHistory[0]];
      updateRepertoireView();
    }
  });

  repBtnPrev.addEventListener('click', () => {
    if (repertoireHistory.length > 1) {
      repertoireHistory.pop();
      updateRepertoireView();
    }
  });

  repBtnNext.addEventListener('click', () => {
    const currentNode = repertoireHistory[repertoireHistory.length - 1];
    if (currentNode.branches && currentNode.branches.length > 0) {
      repertoireHistory.push(currentNode.branches[0]);
      updateRepertoireView();
    }
  });

  repBtnFlip.addEventListener('click', () => {
    isRepFlipped = !isRepFlipped;
    updateRepertoireView();
  });

  // ==========================================
  // GAME REVIEW LOGIC (FULL GAME STEPPER)
  // ==========================================

  function loadGameReview(game) {
    if (!game || !game.moves || game.moves.length === 0) return;
    activeGame = game;
    currentMoveIndex = 0;
    stopAutoplay();

    // Populate Versus metadata
    gameWhiteName.textContent = game.white;
    gameWhiteRating.textContent = `(${game.whiteRating})`;
    gameBlackName.textContent = game.black;
    gameBlackRating.textContent = `(${game.blackRating})`;
    gameResultBadge.textContent = game.result;

    // Populate Notation List
    notationScrollBox.innerHTML = '';
    game.moves.forEach((m, idx) => {
      if (idx === 0) return;
      const btn = document.createElement('button');
      btn.className = `notation-step-btn ${idx === currentMoveIndex ? 'active' : ''}`;
      btn.textContent = m.notation || m.san;
      btn.dataset.index = idx;
      btn.addEventListener('click', () => {
        setGameMoveIndex(idx);
      });
      notationScrollBox.appendChild(btn);
    });

    updateGameReviewView();
  }

  function setGameMoveIndex(newIndex) {
    if (!activeGame || !activeGame.moves) return;
    currentMoveIndex = Math.max(0, Math.min(newIndex, activeGame.moves.length - 1));
    updateGameReviewView();
  }

  function updateGameReviewView() {
    if (!activeGame || !activeGame.moves) return;
    const move = activeGame.moves[currentMoveIndex];

    // Render Board
    renderBoard(reviewChessboard, move.board, isReviewFlipped);

    // Update Eval & Comment
    currMoveLabel.textContent = move.ply === 0 ? 'Start' : (move.notation || move.san);
    currEvalScore.textContent = (move.eval > 0 ? `+${move.eval}` : move.eval) || '+0.00';
    currMoveComment.textContent = move.comment || 'Normal move.';

    // Update Highlight in Notation List
    const buttons = notationScrollBox.querySelectorAll('.notation-step-btn');
    buttons.forEach(btn => {
      const bIdx = parseInt(btn.dataset.index, 10);
      if (bIdx === currentMoveIndex) {
        btn.classList.add('active');
        btn.scrollIntoView({ block: 'nearest', inline: 'center' });
      } else {
        btn.classList.remove('active');
      }
    });

    // Button states
    gameBtnFirst.disabled = currentMoveIndex === 0;
    gameBtnPrev.disabled = currentMoveIndex === 0;
    gameBtnNext.disabled = currentMoveIndex === activeGame.moves.length - 1;
    gameBtnLast.disabled = currentMoveIndex === activeGame.moves.length - 1;
  }

  function toggleAutoplay() {
    if (isAutoplaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  function startAutoplay() {
    if (!activeGame) return;
    isAutoplaying = true;
    gameBtnPlay.textContent = '⏸ Pause';
    gameBtnPlay.style.backgroundColor = '#EF4444';

    autoplayInterval = setInterval(() => {
      if (currentMoveIndex < activeGame.moves.length - 1) {
        setGameMoveIndex(currentMoveIndex + 1);
      } else {
        stopAutoplay();
      }
    }, 900);
  }

  function stopAutoplay() {
    isAutoplaying = false;
    if (autoplayInterval) clearInterval(autoplayInterval);
    gameBtnPlay.textContent = '▶ Play';
    gameBtnPlay.style.backgroundColor = '#10B981';
  }

  // Stepper Controls
  gameBtnFirst.addEventListener('click', () => { stopAutoplay(); setGameMoveIndex(0); });
  gameBtnPrev.addEventListener('click', () => { stopAutoplay(); setGameMoveIndex(currentMoveIndex - 1); });
  gameBtnPlay.addEventListener('click', toggleAutoplay);
  gameBtnNext.addEventListener('click', () => { stopAutoplay(); setGameMoveIndex(currentMoveIndex + 1); });
  gameBtnLast.addEventListener('click', () => { stopAutoplay(); setGameMoveIndex(activeGame.moves.length - 1); });
  gameBtnFlip.addEventListener('click', () => {
    isReviewFlipped = !isReviewFlipped;
    updateGameReviewView();
  });

  // Keyboard navigation for Game Review
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowRight') {
      stopAutoplay();
      setGameMoveIndex(currentMoveIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      stopAutoplay();
      setGameMoveIndex(currentMoveIndex - 1);
    }
  });

  // Game Selector Dropdown
  gameSelector.addEventListener('change', (e) => {
    const selectedIdx = parseInt(e.target.value, 10);
    if (currentReviewGames[selectedIdx]) {
      loadGameReview(currentReviewGames[selectedIdx]);
    }
  });

  // ==========================================
  // PROFILE SEARCH & MAIN DATA POPULATION
  // ==========================================

  function showAlert(message, isWarning = false) {
    alertMessage.textContent = message;
    alertBanner.className = isWarning ? 'alert-banner warning' : 'alert-banner';
    alertBanner.classList.remove('hidden');
  }

  function hideAlert() {
    alertBanner.classList.add('hidden');
  }

  alertClose.addEventListener('click', hideAlert);

  function setLoading(isLoading) {
    if (isLoading) {
      loadingOverlay.classList.remove('hidden');
      btnSpinner.classList.remove('hidden');
      btnText.textContent = 'Searching...';
      searchBtn.disabled = true;
      hideAlert();
    } else {
      loadingOverlay.classList.add('hidden');
      btnSpinner.classList.add('hidden');
      btnText.textContent = 'Search';
      searchBtn.disabled = false;
    }
  }

  function populatePlayerData(data) {
    currentPlayerData = data;

    // 1. Username and Twin labels
    displayUsername.textContent = data.username;
    twinUsernames.forEach(el => el.textContent = data.username);

    // External link
    profileExternalLink.onclick = () => {
      window.open(`https://www.chess.com/member/${data.username}`, '_blank');
    };

    // 2. Avatar / Initials
    if (data.avatar && data.avatar.trim() !== '') {
      playerAvatarImg.src = data.avatar;
      playerAvatarImg.classList.remove('hidden');
      playerInitials.classList.add('hidden');
    } else {
      playerAvatarImg.classList.add('hidden');
      playerInitials.classList.remove('hidden');
      const initials = (data.name || data.username || 'P')
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
      playerInitials.textContent = initials;
    }

    // 3. Country & Flag
    const flag = countryFlagMap[data.country] || '🌐';
    playerFlag.textContent = flag;
    playerCountry.textContent = `${data.countryName || 'International'} [${data.country || 'GLOBAL'}]`;

    // 4. Joined & Last Active
    playerJoined.textContent = `Joined ${data.joined || 'Unknown'}`;
    playerLastOnline.textContent = `Last active ${data.lastOnline || 'Recently'}`;

    // 5. Primary Rating Badge
    if (data.primaryRating) {
      primaryRatingValue.textContent = data.primaryRating.rating || '—';
      primaryRatingType.textContent = data.primaryRating.format || 'RAPID';
      if (compareP1Rating) compareP1Rating.textContent = data.primaryRating.rating || '—';
    }

    // 6. Games & Win/Loss/Draw Stats
    if (data.recentMonth) {
      statTotalGames.textContent = data.recentMonth.totalGames ?? '0';
      statMonthLabel.textContent = data.recentMonth.monthYear || 'Recent';
      statWins.textContent = data.recentMonth.wins ?? '0';
      statWinPct.textContent = data.recentMonth.winPct || '0.0%';
      statDraws.textContent = data.recentMonth.draws ?? '0';
      statDrawPct.textContent = data.recentMonth.drawPct || '0.0%';
      statLosses.textContent = data.recentMonth.losses ?? '0';
      statLossPct.textContent = data.recentMonth.lossPct || '0.0%';
    }

    // 7. Ratings Breakdown Row
    if (data.ratings) {
      ratingBullet.textContent = data.ratings.bullet || '—';
      ratingBlitz.textContent = data.ratings.blitz || '—';
      ratingRapid.textContent = data.ratings.rapid || '—';
      ratingPuzzle.textContent = data.ratings.puzzle || '—';
    }

    // 8. Live Repertoire Summary Table
    if (data.repertoire && data.repertoire.length > 0 && repertoireTableBody) {
      repertoireTableBody.innerHTML = '';
      data.repertoire.forEach(item => {
        const tr = document.createElement('tr');
        const isRed = !item.isWinPositive;
        const widthPct = Math.min(100, Math.max(20, parseInt(item.winPct) || 50));

        tr.innerHTML = `
          <td><strong>${item.opening}</strong></td>
          <td>${item.games}</td>
          <td><span class="win-tag ${isRed ? 'red' : ''}">${item.winPct}</span></td>
          <td>
            <span class="perf-bar ${isRed ? 'red' : ''}" style="width: ${widthPct}%;"></span>
            ${item.performance}
          </td>
        `;
        repertoireTableBody.appendChild(tr);
      });
    }

    // 9. Initialize Interactive Move-by-Move Repertoire Tree
    if (data.repertoireTree) {
      initRepertoireTree(data.repertoireTree);
    }

    // 10. Initialize Reviewable Games
    if (data.reviewableGames && data.reviewableGames.length > 0) {
      currentReviewGames = data.reviewableGames;
      gameSelector.innerHTML = '';
      data.reviewableGames.forEach((g, gIdx) => {
        const opt = document.createElement('option');
        opt.value = gIdx;
        opt.textContent = `Game ${gIdx + 1}: ${g.white} vs ${g.black} (${g.result}) - ${g.totalMoves} moves`;
        gameSelector.appendChild(opt);
      });
      loadGameReview(data.reviewableGames[0]);
    }

    // 11. Safety Net Fallback Badge
    if (data.isFallback) {
      fallbackBadge.classList.remove('hidden');
    } else {
      fallbackBadge.classList.add('hidden');
    }
  }

  /**
   * Search Player Endpoint
   */
  async function searchPlayer(username) {
    const cleanUser = username.trim();
    if (!cleanUser) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/player/chess.com/${encodeURIComponent(cleanUser)}`);
      const result = await response.json();

      if (response.status === 404) {
        showAlert("We couldn't find that username on Chess.com — try a different one");
        return;
      }

      if (response.status === 502 || !response.ok) {
        showAlert("Chess.com's API is temporarily unavailable");
        return;
      }

      populatePlayerData(result);
    } catch (err) {
      console.error('Search network error:', err);
      showAlert("Chess.com's API is temporarily unavailable");
    } finally {
      setLoading(false);
    }
  }

  // Handle Search Form Submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchPlayer(searchInput.value);
  });

  // Handle Quick Chips
  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetUser = btn.getAttribute('data-username');
      searchInput.value = targetUser;
      searchPlayer(targetUser);
    });
  });

  // Handle Saved Player items
  savedPlayerItems.forEach(item => {
    const btn = item.querySelector('.load-saved-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const user = item.getAttribute('data-username');
        searchInput.value = user;
        searchPlayer(user);
        const topEl = document.getElementById('overview');
        if (topEl) topEl.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

  // Sidebar Navigation Interactivity
  sidebarNavItems.forEach(navLink => {
    navLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = navLink.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        sidebarNavItems.forEach(item => item.classList.remove('active'));
        navLink.classList.add('active');
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Scroll Spy to highlight active sidebar section
  window.addEventListener('scroll', () => {
    let currentSection = 'overview';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    sidebarNavItems.forEach(item => {
      if (item.getAttribute('data-target') === currentSection) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }, { passive: true });

  // Theme Toggle (Dark / Light)
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.querySelector('.theme-icon').textContent = isLight ? '☀️' : '🌙';
  });

  // Initial load with default player
  searchPlayer('prabhavagarwal1234');
});
