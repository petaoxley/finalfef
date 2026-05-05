let data = [];

function setup() {
  createCanvas(600, 400);
  noStroke();

  data = window.entries;

  if (!Array.isArray(data)) {
    console.error("Data not loaded properly:", data);
    data = [];
  }
}

function draw() {
  background(15);

  if (!data.length) {
    fill(255);
    text("No data loaded", 20, 30);
    return;
  }

  let cols = 7;
  let size = 60;

  for (let i = 0; i < data.length; i++) {

    let row = floor(i / cols);
    let col = i % cols;

    let x = 50 + col * size;
    let y = 50 + row * size;

    let entry = data[i];

    let score =
      (entry.mood || 0) * 0.4 +
      (entry.sleepHours || 0) * 0.3 -
      (entry.stress || 0) * 0.3;

    let intensity = map(score, 0, 10, 0, 255);

    fill(50, intensity, 200);
    rect(x, y, size - 5, size - 5, 8);

    fill(255);
    text(round(score, 1), x + 15, y + 35);
  }

  fill(255);
  textSize(16);
  text("Wellbeing Heatmap", 20, 30);
}