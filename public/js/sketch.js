let data = [];

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(20);
  stroke(0, 200, 255);
  noFill();

  if (!data.length) return;

  beginShape();
  for (let i = 0; i < data.length; i++) {
    let x = map(i, 0, data.length, 50, width - 50);
    let y = map(data[i].mood, 0, 10, height - 50, 50);
    vertex(x, y);
  }
  endShape();

  fill(255);
  text("Mood Over Time", 20, 20);
}

window.onload = () => {
  data = window.data || [];
};