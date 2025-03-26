let synth, backgroundPart;
let brushNoise, brushEnv, brushFilter;
let drawing = false;
let previousMouseX, previousMouseY;
let selectedColor = 'black';
let colorSelectSynth;

function setup() {
  createCanvas(600, 400);
  background(255);

  let audioButton = createButton("Start Audio");
  audioButton.position(10, 200);
  audioButton.mousePressed(startAudio);

  Tone.Transport.bpm.value = 120;
  Tone.Transport.timeSignature = [4, 4];

  synth = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 1
    }
  }).toDestination();

  backgroundPart = new Tone.Part((time, noteEvent) => {
    synth.triggerAttackRelease(noteEvent.note, noteEvent.duration, time, noteEvent.velocity);
  }, [
    { time: 0,      note: "C4", duration: "8n", velocity: 0.9 },
    { time: "0:1",  note: "E4", duration: "8n", velocity: 0.9 },
    { time: "0:2",  note: "G4", duration: "8n", velocity: 0.9 },
    { time: "0:3",  note: "B4", duration: "8n", velocity: 0.9 },
    { time: "1:0",  note: "A4", duration: "4n", velocity: 0.9 },
    { time: "1:2",  note: "G4", duration: "8n", velocity: 0.9 },
    { time: "1:3",  note: "E4", duration: "8n", velocity: 0.9 },
    { time: "2:0",  note: "F4", duration: "4n", velocity: 0.9 },
    { time: "2:2",  note: "D4", duration: "8n", velocity: 0.9 },
    { time: "2:3",  note: "C4", duration: "8n", velocity: 0.9 },
    { time: "3:0",  note: "G3", duration: "2n", velocity: 0.9 }
  ]).start(0);

  backgroundPart.loop = true;
  backgroundPart.loopEnd = "2m";

  brushNoise = new Tone.Noise("pink").start();
  brushFilter = new Tone.Filter(800, "lowpass");
  brushEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.1,
    sustain: 0.5,
    release: 0.2
  });
  brushNoise.connect(brushEnv);
  brushEnv.connect(brushFilter);
  brushFilter.toDestination();

  colorSelectSynth = new Tone.MembraneSynth({
    pitchDecay: 0.05,      // A quick pitch drop gives the "bloop" character
    octaves: 2,            // Limits the pitch drop range
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.001,       // Instant attack for a percussive hit
      decay: 0.3,          // A short decay to let the note quickly fade
      sustain: 0,          // No sustain so the note remains short
      release: 0.3         // Short release time
    }
  }).toDestination();
}

function startAudio() {
  if (Tone.context.state !== "running") {
    Tone.start().then(() => {
      console.log("Audio Context started");
      Tone.Transport.start();
    });
  } else {
    Tone.Transport.start();
  }
}

function onColorSelected(newColor) {
  selectedColor = newColor;
  colorSelectSynth.triggerAttackRelease("C4", "16n");
}

let x = 0;

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
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    drawing = true;
    brushEnv.triggerAttack();
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }

  if (mouseX >=0 && mouseX <= 20) {
    let newColor;

  if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 0 && mouseY <= 20) {
    newColor = 'red';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 20 && mouseY <= 40) {
    newColor = 'orange';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 40 && mouseY <= 60) {
    newColor = 'yellow';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 60 && mouseY <= 80) {
    newColor = '#08ff00';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 80 && mouseY <= 100) {
    newColor = 'cyan';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 100 && mouseY <= 120) {
    newColor = 'blue';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 120 && mouseY <= 140) {
    newColor = 'magenta';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 140 && mouseY <= 160) {
    newColor = 'brown';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 160 && mouseY <= 180) {
    newColor = 'white';
  }
  else if(mouseX >= 0 && mouseX <= 20 &&
    mouseY >= 180 && mouseY <= 200) {
    newColor = 'black';
  }
  if (newColor && newColor !== selectedColor) {
    selectedColor = newColor;
    colorSelectSynth.triggerAttackRelease("C4", "16n");
  }
  return;
}
}

function mouseDragged() {
  if (drawing) {
    stroke(selectedColor);
    strokeWeight(5);
    line(previousMouseX, previousMouseY, mouseX, mouseY);
    previousMouseX = mouseX;
    previousMouseY = mouseY;

    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    let newFreq = map(speed, 0, 50, 800, 3000, true);
    brushFilter.frequency.setValueAtTime(newFreq, Tone.now());
  }
}

function mouseReleased() {
  if (drawing) {
    drawing = false;
    brushEnv.triggerRelease();
  }
}