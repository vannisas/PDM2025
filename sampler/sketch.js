let samples;
let dist = new Tone.Distortion(0).toDestination();

function preload() {
  samples = new Tone.Players({
    boing: "media/boing.mp3",
    horn: "media/car_horn.mp3",
    sus: "media/sus_meme.mp3",
    boom: "media/vine_boom.mp3",
  }).connect(dist);
}

function setup() {
  createCanvas(400, 400);
  button1 = createButton("Boing");
  button1.position(80, 60);
  button2 = createButton("Horn");
  button2.position(180, 60);
  button3 = createButton("Sus");
  button3.position(40, 60);
  button4 = createButton("Boom");
  button4.position(130, 60);
  button1.mousePressed(() => {samples.player("boing").start()});
  button2.mousePressed(() => {samples.player("horn").start()});
  button3.mousePressed(() => {samples.player("sus").start()});
  button4.mousePressed(() => {samples.player("boom").start()});
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(50, 150);
  distSlider.input(() => {dist.distortion = distSlider.value()});
}

function draw() {
  background(220);
  text("Distortion Amount: " + distSlider.value(), 55, 140);
}