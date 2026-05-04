const express = require('express');
const path = require('path');
const db = require('./database/db');
const calculateScore = require('./utils/score');

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/* ---------------- ROUTES ---------------- */

// DASHBOARD
app.get('/', (req, res) => {
  db.all(`SELECT * FROM entries ORDER BY date DESC`, [], (err, rows) => {

    const enriched = rows.map(entry => ({
      ...entry,
      wellbeingScore: calculateScore(entry)
    }));

    const avgMood =
      rows.reduce((sum, e) => sum + e.mood, 0) / (rows.length || 1);

    res.render('dashboard', {
      entries: enriched,
      avgMood
    });
  });
});

// FORM PAGE
app.get('/add', (req, res) => {
  res.render('form');
});

// SAVE ENTRY
app.post('/entry', (req, res) => {
  const {
    mood,
    sleepHours,
    productivity,
    stress,
    screenTime,
    exercise,
    notes
  } = req.body;

  db.run(
    `INSERT INTO entries 
    (mood, sleepHours, productivity, stress, screenTime, exercise, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [mood, sleepHours, productivity, stress, screenTime, exercise, notes],
    () => res.redirect('/')
  );
});

// INSIGHTS PAGE (for p5)
app.get('/insights', (req, res) => {
  db.all(`SELECT * FROM entries`, [], (err, rows) => {
    res.render('insights', {
      entries: JSON.stringify(rows)
    });
  });
});

/* ---------------- START SERVER ---------------- */
app.listen(3000, () => {
  console.log('Running on http://localhost:3000');
});