const express = require('express');
const path = require('path');
const db = require('./database/db');
const calculateScore = require('./utils/score');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  db.all(`SELECT * FROM entries ORDER BY date DESC`, [], (err, rows) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    const enriched = rows.map(entry => ({
      ...entry,
      wellbeingScore: calculateScore(entry)
    }));

    const avgMood =
      rows.reduce((sum, e) => sum + Number(e.mood || 0), 0) / (rows.length || 1);

    res.render('dashboard', {
      entries: enriched,
      avgMood
    });
  });
});

app.get('/add', (req, res) => {
  res.render('form');
});


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
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Insert error");
      }
      res.redirect('/');
    }
  );
});


app.get('/insights', (req, res) => {
  db.all(`SELECT * FROM entries`, [], (err, rows) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    res.render('insights', {
      entries: JSON.stringify(rows)
    });
  });
});


app.listen(3000, () => {
  console.log('Running on http://localhost:3000');
});