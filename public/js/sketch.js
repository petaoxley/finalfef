let entries = [];

function setup() {
  createCanvas(600, 400);
  entries = data;
}

function draw() {
  background(20);

  stroke(255);
  noFill();

  beginShape();
  for (let i = 0; i < entries.length; i++) {
    let x = map(i, 0, entries.length, 50, width - 50);
    let y = map(entries[i].mood, 0, 10, height - 50, 50);
    vertex(x, y);
  }
  endShape();

  fill(255);
  text("Mood Over Time", 20, 20);
}