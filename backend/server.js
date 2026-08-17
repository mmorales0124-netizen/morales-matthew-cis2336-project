// ArtConnect backend — server.js
// Step 2: artwork submission routes are now wired in.

const express = require('express');
const cors = require('cors');
const artworksRouter = require('./routes/artworks');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ArtConnect backend is running.');
});

// All artwork submission endpoints live under /api/artworks
// POST /api/artworks -> submit a new artwork
// GET  /api/artworks -> list all submitted artworks
app.use('/api/artworks', artworksRouter);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});