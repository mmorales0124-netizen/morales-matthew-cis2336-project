// ArtConnect backend — routes/artworks.js
// Handles artwork submissions from the frontend's submit.js form.
// Storage is a plain in-memory array — it resets whenever the server restarts.
// (Matches the "temporarily in a JS array" requirement — no database yet.)
 
const express = require('express');
const router = express.Router();
 
// In-memory "database"
const artworks = [];
let nextId = 1;
 
// Matches the fields sent by submit.js:
// name, email, title, category, price, notForSale, description
function validateSubmission(body) {
  const errors = [];
 
  if (!body.name || body.name.trim().length < 2) {
    errors.push('Artist name is required.');
  }
 
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    errors.push('A valid email address is required.');
  }
 
  if (!body.title || body.title.trim() === '') {
    errors.push('Artwork title is required.');
  }
 
  if (!body.category || body.category.trim() === '') {
    errors.push('Category is required.');
  }
 
  if (!body.notForSale) {
    const price = Number(body.price);
    if (body.price === undefined || body.price === '' || isNaN(price) || price <= 0) {
      errors.push('Price must be a number greater than 0, or notForSale must be true.');
    }
  }
 
  if (!body.description || body.description.trim().length < 20) {
    errors.push('Description must be at least 20 characters.');
  }
 
  return errors;
}
 
// POST /api/artworks — receive a new submission
router.post('/', (req, res) => {
  const errors = validateSubmission(req.body);
 
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
 
  const artwork = {
    id: nextId++,
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    title: req.body.title.trim(),
    category: req.body.category.trim(),
    notForSale: Boolean(req.body.notForSale),
    price: req.body.notForSale ? null : Number(req.body.price),
    description: req.body.description.trim(),
    submittedAt: new Date().toISOString(),
  };
 
  artworks.push(artwork);
 
  res.status(201).json({
    success: true,
    message: `Thanks, ${artwork.name} — "${artwork.title}" was received.`,
    artwork,
  });
});
 
// GET /api/artworks — list everything submitted so far
router.get('/', (req, res) => {
  res.json({ success: true, count: artworks.length, artworks });
});
 
module.exports = router;