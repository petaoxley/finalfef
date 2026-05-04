const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const hbs = require('hbs');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/habitapp')
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));


// MODEL
const Entry = require('./models/Entry');

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// VIEW ENGINE
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ROUTES

// DASHBOARD
app.get('/', async (req, res) => {
  const entries = await Entry.find();

  const avgMood =
    entries.reduce((sum, e) => sum + e.mood, 0) / (entries.length || 1);

  res.render('dashboard', { entries, avgMood });
});

// FORM PAGE
app.get('/add', (req, res) => {
  res.render('form');
});

// SAVE ENTRY
app.post('/entry', async (req, res) => {
  const entry = new Entry(req.body);
  await entry.save();
  res.redirect('/');
});

// INSIGHTS PAGE
app.get('/insights', async (req, res) => {
  const entries = await Entry.find();
  res.render('insights', { entries: JSON.stringify(entries) });
});

// START SERVER
app.listen(3000, () => console.log('Running on http://localhost:3000'));