let data = [];
let cols = 7; // days per row (weekly layout)
let cellSize = 60;

function setup() {
  createCanvas(500, 400);
  noStroke();

  data = window.data || [];
}

function draw() {
  background(15);

  if (!data.length) return;

  let offsetX = 50;
  let offsetY = 50;

  for (let i = 0; i < data.length; i++) {
    let row = floor(i / cols);
    let col = i % cols;

    let x = offsetX + col * cellSize;
    let y = offsetY + row * cellSize;

    let score = data[i].mood * 0.4 +
                data[i].sleepHours * 0.3 -
                data[i].stress * 0.3;

    // normalize score to colour range
    let intensity = map(score, 0, 10, 0, 255);

    // animated pulse effect
    let pulse = sin(frameCount * 0.05 + i) * 20;

    fill(50, intensity, 200, 180);
    rect(x + pulse * 0.1, y + pulse * 0.1, cellSize - 5, cellSize - 5, 8);

    // label
    fill(255);
    textSize(10);
    text(round(score, 1), x + 15, y + 35);
  }

  fill(255);
  textSize(16);
  text("Daily Wellbeing Heatmap", 20, 30);
}