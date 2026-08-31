async function verifyApp() {
  console.log('Testing frontend root GET http://localhost:5000/');
  let htmlRes = await fetch('http://localhost:5000/');
  console.log('HTML status:', htmlRes.status);
  let html = await htmlRes.text();
  console.log('HTML contains Repertoire Explorer:', html.includes('Move-by-Move Repertoire Explorer'));
  console.log('HTML contains Full Game Review:', html.includes('Full Chess Game Review'));

  const user = 'prabhavagarwal1234';
  console.log(`\n--- TESTING LIVE DATA & GAME PARSING FOR ${user} ---`);
  const res = await fetch(`http://localhost:5000/api/player/chess.com/${user}`);
  const data = await res.json();
  console.log('Player:', data.username);
  console.log('Reviewable Games Count:', data.reviewableGames?.length);
  if (data.reviewableGames && data.reviewableGames.length > 0) {
    const g0 = data.reviewableGames[0];
    console.log(`Game 1: ${g0.white} vs ${g0.black} | Result: ${g0.result} | Total Move Plies: ${g0.moves.length}`);
    console.log('Sample moves:', g0.moves.slice(1, 5).map(m => m.notation));
  }

  console.log('Repertoire Tree Root Games:', data.repertoireTree?.games);
  console.log('Repertoire Tree Branches:', data.repertoireTree?.branches?.map(b => `${b.notation} (${b.games} games, ${b.winPct})`));
}
verifyApp();
