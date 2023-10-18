/////////////// #3 Dance Game! ///////////////

/////////////// initialize varibles ///////////////

const gameState = {
  GAME: 0,
  END: 1,
};

var state = gameState.MENU;
var song;
var notes = [];
var fft;
var lastNoteTime = 0;
var gameStartTime;
var score = 0;
var activeArrows = [false, false, false, false]; 
var noteTravelTime;
var songDuration;
var font;
var song;

/////////////// preload function ///////////////


function preload() {
  font = loadFont("PressStart2P-Regular.ttf");
  song = loadSound("ricflaredrop.mp3");
} 

/////////////// setup function ///////////////

function setup() {
  createCanvas(900, 600);
  song.play();
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textSize(32); // Move textSize() here
  fft = new p5.FFT(0.8, 32);
  noteTravelTime = (height - 100) / 5; // 5 is the speed of the notes
}

/////////////// draw function ///////////////

function draw() {
  background(243, 207, 198);
  switch (state) {
    case gameState.GAME:
      drawGame();
      break;
    case gameState.END:
      drawEndSequence();
      break;
  }
}