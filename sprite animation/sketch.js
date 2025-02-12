let sprites = {};
let characters = [];

function preload() {
  sprites.spelunky = loadImage("sprites/spelunky.png");
  sprites.guy = loadImage("sprites/SpelunkyGuy.png");
  sprites.eskimo = loadImage("sprites/eskimo.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  let characterData = [
    {x: random(0, 320), y: random(0, 320), sprite: sprites.spelunky},
    {x: random(0, 320), y: random(0, 320), sprite: sprites.guy},
    {x: random(0, 320), y: random(0, 320), sprite: sprites.eskimo}
  ];

  for (let data of characterData) {
    let newCharacter = new Character(data.x, data.y, data.sprite);
    addCharacterAnimations(newCharacter, data.sprite);
    characters.push(newCharacter);
  }
}

function draw() {
  background(255);
  for (let char of characters) {
    char.draw();
  }
}

function keyPressed() {
  for (let char of characters) {
    char.keyPressed();
  }
}

function keyReleased() {
  for (let char of characters) {
    char.keyReleased();
  }
}

function addCharacterAnimations(character, spriteSheet) {
  let leftStand = new SpriteAnimation(spriteSheet, 0, 0, 1);
  leftStand.flipped = true;

  character.addAnimation("right", new SpriteAnimation(spriteSheet, 1, 0, 8));
  character.addAnimation("left", new SpriteAnimation(spriteSheet, 1, 0, 8));
  character.addAnimation("right stand", new SpriteAnimation(spriteSheet, 0, 0, 1));
  character.addAnimation("left stand", leftStand);
  character.currentAnimation = "right stand";
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "right":
          this.x += 2;
          break;
        case "left":
          this.x -= 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        this.animations[this.currentAnimation].flipped = false;
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations[this.currentAnimation].flipped = true;
        break;
    }
  }
  keyReleased() {
    if (this.animations[this.currentAnimation].flipped) {
      this.currentAnimation = "left stand";
    } else {
      this.currentAnimation = "right stand";
    }
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw () {
    let s = (this.flipped) ? -1 : 1;
    scale(s, 1);
    image(this.spritesheet, 0 ,0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 4 === 0)
      this.u++;

    if (this.u === this.startU + this.duration) {
      this.u = this.startU;
    }
  }
}
