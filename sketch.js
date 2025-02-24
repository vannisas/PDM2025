let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
});
let gameState = GameStates.START;
let score = 0;
let time = 10;
let currentSpeed = 1;
let textPadding = 15;
let highScore = 0;
let bug_sprite;
let bugs = [];

function preload() {
  bug_sprite = loadImage("media/bug_sprite.png");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  switch(gameState) {
    case GameStates.START:
      textAlign(CENTER, CENTER);
      textSize(20);
      text("Press ENTER to Start", width/2, height/2);
      break;

    case GameStates.PLAY:
      textAlign(LEFT, TOP);
      text("Score: " + score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      text("Time: " + Math.ceil(time), width - textPadding, textPadding);

      for (let bug of bugs) {
        bug.update();
        bug.draw();
      }

      time -= deltaTime / 1000;
      if (time <= 0) {
        gameState = GameStates.END;
      }
      break;

    case GameStates.END:
      textAlign(CENTER, CENTER);
      text("GAME OVER", width/2, height/2-20);
      text("Score: " + score, width/2, height/2);
      if (score > highScore) {
        highScore = score;
      }
      text("High Score: " + highScore, width/2, height/2+20);
      break;
  }
}

function keyPressed() {
  switch(gameState) {
    case GameStates.START:
      if (keyCode === ENTER) {
        gameState = GameStates.PLAY;
        time = 30;
        score = 0;
        bugs = [];
        spawnInitialBugs(13);
      }
      break;
    case GameStates.PLAY:
      break;
    case GameStates.END:
      break;
  }
}

function mousePressed() {
  if (gameState === GameStates.PLAY) {
    for (let bug of bugs) {
    if (bug.isClicked(mouseX, mouseY)) {
      bug.stop();
      break;
    }
  }
}
}

function spawnInitialBugs(count) {
  for (let i = 0; i < count; i++) {
    spawnBug(random(80, 320), random(80, 320));
  }
}

function spawnBug(x, y) {
  let newBug = new Bug(random(80, 320), random(80, 320), currentSpeed);
  bugs.push(newBug);
  currentSpeed += 0.25;
}

class Bug {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    //this.currentAnimation = null;
    //this.animations = {};
    this.isMoving = true;
    this.speed = speed;
    this.isStopped = false;

    let directions = [
      {dx: 0, dy: -speed, row: 0},
      {dx: 0, dy: speed, row: 2},
      {dx: -speed, dy: 0, row: 3},
      {dx: speed, dy: 0, row: 1}
    ];
    let chosenDir = random(directions);
    this.speedX = chosenDir.dx;
    this.speedY = chosenDir.dy;
    this.row = chosenDir.row;

    this.animation = new SpriteAnimation(bug_sprite, 0, this.row, 5);
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  update() {
    if (this.isMoving) {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    if (this.isStopped) {
      image(bug_sprite, 0, 0, 80, 80, 5*80, this.row*80, 80, 80);
    } else {
      this.animation.draw();
    }
    pop();
  }

  stop() {
    if (!this.isStopped) {
      this.isMoving = false;
      this.isStopped = true;
      score++;
      spawnBug(this.x, this.y);
    }
  }

  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < 80 && !this.isStopped;
  }
}


class SpriteAnimation {
  constructor(spriteSheet, startu, startv, duration) {
    this.spriteSheet = spriteSheet;
    this.u = startu;
    this.v = startv;
    this.duration = duration;
    this.startu = startu;
    this.frameCount = 0;
  }

  draw() {
    image(this.spriteSheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0) 
      this.u++

    if (this.u === this.startu + this.duration)
      this.u = this.startu;
  }
}