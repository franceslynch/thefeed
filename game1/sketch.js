/////////////// #1 Collect the Laundry Game! ///////////////

/////////////// initialize varibles ///////////////
var basketX; 
var basketWidth = 150;
var basketHeight = 150;
var clothingSize = 90;
var clothingY;
var score = 0;
var clothingX;
var clothingSpeed;
var font;

/////////////// initialize array variable and index ///////////////
var Clothing = [];
var clothingIndex = 0;

/////////////// initialize clothes images ///////////////
var basket;
var froghat;
var sweatshirt;
var tank;
var jeans;
var shoe;

/////////////// preload files ///////////////
function preload(){
  basket = loadImage("basket.png");
  froghat = loadImage("froghat.png");
  sweatshirt = loadImage("sweatshirt.png");
  tank = loadImage("tank.png");
  jeans = loadImage("jeans.png");
  shoe = loadImage("shoe.png");
  font = loadFont("PressStart2P-Regular.ttf");
  
}

/////////////// setup function ///////////////
function setup() {
  createCanvas(900, 600);
  basketX = width / 2;
  clothingY = -clothingSize;
  
  
  clothingX = random(basketWidth / 2, width - basketWidth / 2 - clothingSize / 2);
  clothingSpeed = random(3,6);
  fill(255,255,255);
  textFont(font);
  textSize(24);
  rectMode(CENTER);
  imageMode(CENTER);
  
  Clothing = [froghat, sweatshirt, tank, jeans, shoe];
  clothingIndex = floor(random(Clothing.length));
  
}

/////////////// draw function ///////////////
function draw() {
  background(243, 207, 198);
  text(score,10,30);


/////////////// check for collision between basket and clothing ///////////////
  if (
    clothingY + clothingSize/2 >  height - basketHeight &&
    (clothingY-clothingSpeed) + clothingSize/2 < height - basketHeight &&
    clothingX - clothingSize/2 > basketX - basketWidth/2 &&
    clothingX - clothingSize/2 + clothingSize < basketX + basketWidth/2
  ) {
    score+=1;
  }
  
  
/////////////// move the clothes vertically ///////////////
  clothingY += clothingSpeed;
  
//////////////// dispay falling clothes ///////////////
    image(Clothing[clothingIndex],clothingX,clothingY,clothingSize,clothingSize);
  
/////////////// display basket ///////////////
    image(basket, basketX, height - basketHeight/3.25, basketWidth, basketHeight);
  
/////////////// basket to mouse ///////////////
  basketX = mouseX;
  basketX = constrain(basketX, basketWidth / 2, width - basketWidth / 2);
  
/////////////// reset clothing when it goes off the bottom screen ///////////////
  if (clothingY > height) {
    clothingX = constrain(random(basketWidth / 2, width - basketWidth / 2 - clothingSize / 2), clothingSize / 2, width - basketWidth / 2 - clothingSize / 2);
    clothingIndex = floor(random(Clothing.length))
    //move it to the top
    clothingY = -clothingSize;
    //randomize its speed
    clothingSpeed = random(4,8);
  }
  

/////////////// scorebord ///////////////
  if (score >=10){
    clothingSpeed = 0;
    clear();
    background(123, 110, 106);
    textAlign(CENTER);
    text("wow you collected all my laundry!",width/2,height/2);
  }
}