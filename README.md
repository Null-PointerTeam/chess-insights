# Chess Insights (MERN)

Opponent scouting tool that pulls real game data from the Chess.com public API.

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:5000` (or `$PORT`).

## Notes

- `node_modules/` is intentionally excluded from this repo (see `.gitignore`).
  Always run `npm install` after cloning — do not manually recreate or copy in
  a `node_modules` folder.
- MongoDB is optional. If `MONGO_URI` isn't set or MongoDB isn't reachable,
  the app runs fine on the in-memory cache (this is the default demo mode).
- Only the `chess.com` platform is implemented. Lichess returns `501 Not
  Implemented` for now (`backend/controllers/playerController.js`).
- If the live Chess.com API is unreachable or blocks a request, the app falls
  back to sample data and marks the response with `isFallback: true` / an
  `X-Demo-Fallback` header — the frontend shows a visible "sample data" badge
  in that case rather than pretending it's live.

## Environment variables (optional)

Create a `.env` file (already git-ignored) if you want to connect a real
MongoDB instance:

```
MONGO_URI=mongodb+srv://...
PORT=5000
```
