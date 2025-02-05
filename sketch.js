function setup() {
  createCanvas(600, 400);
  background(255);
}

let x = 0;
let selectedColor = 'black';

function draw() {
  fill(255);
  stroke(255);
  strokeWeight(1);
  rect(0, 0, 20, height);

  fill('red');
  square(x, 0, 20);

  fill('orange');
  square(x,20,20);
  
  fill('yellow');
  square(x,40,20);

  fill('#08FF00');
  square(x,60,20);

  fill('cyan');
  square(x,80,20);

  fill('blue');
  square(x,100,20);

  fill('magenta');
  square(x,120,20);

  fill('brown');
  square(x,140,20);

  fill('white');
  square(x,160,20);

  fill('black');
  square(x,180,20);

  if (mouseIsPressed && mouseX > 20) {
    stroke(selectedColor);
    strokeWeight(5);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function mousePressed() {
  if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 0 && mouseY <= 20) {
    selectedColor = 'red';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 20 && mouseY <= 40) {
    selectedColor = 'orange';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 40 && mouseY <= 60) {
    selectedColor = 'yellow';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 60 && mouseY <= 80) {
    selectedColor = '#08ff00';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 80 && mouseY <= 100) {
    selectedColor = 'cyan';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 100 && mouseY <= 120) {
    selectedColor = 'blue';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 120 && mouseY <= 140) {
    selectedColor = 'magenta';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 140 && mouseY <= 160) {
    selectedColor = 'brown';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 160 && mouseY <= 180) {
    selectedColor = 'white';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 180 && mouseY <= 200) {
    selectedColor = 'black';
  }
}
