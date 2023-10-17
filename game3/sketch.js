/////////////// #3 Dance Game! ///////////////

/////////////// initialize varibles ///////////////

const gameState = {
  MENU: 0,
  GAME: 1,
  END: 2,
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

/////////////// preload function ///////////////


function preload() {
  font = loadFont("PressStart2P-Regular.ttf");
} 

/////////////// setup function ///////////////

function setup() {
  createCanvas(900, 600);
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
    case gameState.MENU:
      drawMenu();
      break;
    case gameState.GAME:
      drawGame();
      break;
    case gameState.END:
      drawEndSequence();
      break;
  }
}

/////////////// drawmenu function ///////////////

function drawMenu() {
  background(243, 207, 198);
  textFont(font);
  textSize(20);
  fill(255);
  text("Press ENTER to start dance practice!", width / 2, height / 2);
}
