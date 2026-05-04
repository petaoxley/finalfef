const sqlite3 = require('sqlite3').verbose();

// create database file
const db = new sqlite3.Database('./database.db');

// create table
db.run(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood INTEGER,
    sleepHours INTEGER,
    productivity INTEGER,
    stress INTEGER,
    screenTime INTEGER,
    exercise INTEGER,
    notes TEXT,
    date TEXT DEFAULT (datetime('now'))
  )
`);

module.exports = db;