function setup() {
  createCanvas(400, 1200);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  fill(74, 255, 80);
  rect(0, 0, 400, 200);
  fill(255, 255, 255);
  stroke(0, 0, 0);
  strokeWeight(1);
  circle(100, 100, 175);
  square(220, 20, 160);

  square(0, 200, 400);
  noStroke();
  let r = color(225, 0, 0);
  let g = color(0, 225, 0);
  let b = color(0, 0, 255);
  r.setAlpha(100);
  g.setAlpha(100);
  b.setAlpha(100);

  fill(r);
  circle(200, 310, 150);

  fill(g);
  circle(250, 400, 150);

  fill(b);
  circle(150, 400, 150);

  fill(0, 0, 0);
  rect(0, 600, 400, 200);

  fill(255, 255, 0);
  arc(100, 700, 150, 150, -140, 140);

  fill(255, 0, 0);
  arc(300, 715, 150, 175, 180, 0);
  rect(225, 715, 150, 55);

  fill(255, 255, 255);
  circle(265, 700, 45);
  circle(330, 700, 45);

  fill(0, 0, 255);
  circle(265, 700, 30);
  circle(330, 700, 30);

  fill(0, 0, 160);
  square(0, 800, 400);

  fill(8, 132, 8);
  stroke(255, 255, 255);
  strokeWeight(6);
  circle(200, 1000, 250);

  fill(255, 0, 0);
  beginShape();
  vertex(200, 870);
  vertex(225, 965);
  vertex(325, 965);
  vertex(245, 1020);
  vertex(280, 1110);
  vertex(200, 1060);
  vertex(120, 1110);
  vertex(155, 1020);
  vertex(80, 965);
  vertex(170, 965);
  endShape(CLOSE);
}
