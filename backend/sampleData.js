// Sample fallback dataset used when the live Chess.com API is unreachable or rate limited during a demo
module.exports = {
  prabhavagarwal1234: {
    platform: 'chess.com',
    username: 'prabhavagarwal1234',
    name: 'Prabhav Agarwal',
    avatar: 'https://images.chesscomfiles.com/uploads/v1/user/176116971.76f40f36.200x200o.62c8ac02f1e7.png',
    country: 'IN',
    countryName: 'India',
    joined: 'Jan 16, 2013',
    lastOnline: '2 hours ago',
    primaryRating: {
      format: 'RAPID',
      rating: 1987,
      best: 2033
    },
    ratings: {
      bullet: 1391,
      blitz: 1620,
      rapid: 1987,
      puzzle: 2265
    },
    overallRecord: {
      win: 1020,
      loss: 879,
      draw: 84
    },
    recentMonth: {
      monthYear: 'Aug 2026',
      totalGames: 59,
      wins: 27,
      winPct: '45.8%',
      draws: 1,
      drawPct: '1.7%',
      losses: 31,
      lossPct: '52.5%'
    },
    repertoire: [
      { opening: '1. e4 (King\'s Pawn)', firstMove: '1. e4', games: 28, winPct: '54%', isWinPositive: true, performance: '+12' },
      { opening: '1. d4 (Queen\'s Pawn)', firstMove: '1. d4', games: 19, winPct: '50%', isWinPositive: true, performance: '+4' },
      { opening: 'Caro-Kann Defense', firstMove: '1. e4', games: 11, winPct: '64%', isWinPositive: true, performance: '+16' },
      { opening: '1. Nf3 (Réti Opening)', firstMove: '1. Nf3', games: 7, winPct: '57%', isWinPositive: true, performance: '+8' },
      { opening: 'English Defense', firstMove: '1. d4', games: 5, winPct: '40%', isWinPositive: false, performance: '-6' }
    ],
    isFallback: true
  },
  hikaru: {
    platform: 'chess.com',
    username: 'hikaru',
    name: 'Hikaru Nakamura',
    avatar: 'https://images.chesscomfiles.com/uploads/v1/user/15448422.01e8c9c0.200x200o.b9cfa5ee73c4.png',
    country: 'US',
    countryName: 'United States',
    joined: 'Dec 9, 2013',
    lastOnline: '1 hour ago',
    primaryRating: {
      format: 'BLITZ',
      rating: 3280,
      best: 3332
    },
    ratings: {
      bullet: 3340,
      blitz: 3280,
      rapid: 2838,
      puzzle: 3050
    },
    overallRecord: {
      win: 34200,
      loss: 6150,
      draw: 5800
    },
    recentMonth: {
      monthYear: 'Aug 2026',
      totalGames: 120,
      wins: 98,
      winPct: '81.7%',
      draws: 14,
      drawPct: '11.7%',
      losses: 8,
      lossPct: '6.6%'
    },
    repertoire: [
      { opening: '1. e4 (Open Game)', firstMove: '1. e4', games: 45, winPct: '82%', isWinPositive: true, performance: '+68' },
      { opening: '1. d4 (Queen\'s Pawn)', firstMove: '1. d4', games: 38, winPct: '79%', isWinPositive: true, performance: '+54' },
      { opening: 'Sicilian Defense (Najdorf)', firstMove: '1. e4', games: 22, winPct: '86%', isWinPositive: true, performance: '+40' },
      { opening: 'King\'s Indian Defense', firstMove: '1. d4', games: 15, winPct: '80%', isWinPositive: true, performance: '+28' }
    ],
    isFallback: true
  },
  default: {
    platform: 'chess.com',
    username: 'prabhavagarwal1234',
    name: 'Prabhav Agarwal',
    avatar: '',
    country: 'IN',
    countryName: 'India',
    joined: 'Jan 16, 2013',
    lastOnline: '2 hours ago',
    primaryRating: {
      format: 'RAPID',
      rating: 2105,
      best: 2105
    },
    ratings: {
      bullet: 1381,
      blitz: 1620,
      rapid: 1897,
      puzzle: 782
    },
    overallRecord: {
      win: 75,
      loss: 68,
      draw: 0
    },
    recentMonth: {
      monthYear: 'Current Month',
      totalGames: 77,
      wins: 75,
      winPct: '48.1%',
      draws: 0,
      drawPct: '0.0%',
      losses: 68,
      lossPct: '43.6%'
    },
    repertoire: [
      { opening: '1. e4', firstMove: '1. e4', games: 323, winPct: '56%', isWinPositive: true, performance: '+18' },
      { opening: '1. d4', firstMove: '1. d4', games: 198, winPct: '54%', isWinPositive: true, performance: '+12' },
      { opening: '1. Nf3', firstMove: '1. Nf3', games: 87, winPct: '60%', isWinPositive: true, performance: '+22' },
      { opening: '1. c4', firstMove: '1. c4', games: 62, winPct: '45%', isWinPositive: false, performance: '-8' },
      { opening: '1. g3', firstMove: '1. g3', games: 41, winPct: '50%', isWinPositive: true, performance: '+0' }
    ],
    isFallback: true
  }
};
