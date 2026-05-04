function calculateScore(entry) {
  return (
    entry.mood * 0.4 +
    entry.sleepHours * 0.3 -
    entry.stress * 0.3
  );
}

module.exports = calculateScore;