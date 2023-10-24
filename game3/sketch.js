////// initialize variables ///////

var indexOfPlayer;
var font;
var song;
var me;
var up;
var down;
var left;
var right;
var speed;
var speaker;

var Arrows = [];
var arrowsIndex = 0;



////// preload function ///////

function preload() {
  font = loadFont("PressStart2P-Regular.ttf");
  song = loadSound("ricflaredrop.mp3");
  me = loadImage("medance.png");
  up = loadImage("up.png");
  down = loadImage("down.png");
  left = loadImage("left.png");
  right = loadImage("right.png");
  speaker = loadImage("speaker.png");
  
} 


////// setup function ///////

function setup() {
  createCanvas(900, 600);
    m = new MusicGame(200,60,500,50);
  fill(255,255,255);
  textFont(font);
  textSize(24);
  Arrows = [up, down, left, right, speaker];
  arrowsIndex = floor(random(Arrows.length));
  speed = random(12,18);
  song.play();
}


////// draw function ///////

function draw() {
  background(243, 207, 198);
  m.drawMusic();
}


////// beat class ///////
class beat{
  constructor(x, y, sizeB, col){
    this.x = x;
    this.y = y; 
    this.sizeB = sizeB;
    this.col = col;
  }
  
  
////// display arrows ///////
  
  display(){
    fill(this.col);
    //circle(this.x, this.y, this.sizeB);
    image(Arrows[arrowsIndex],this.x,this.y-60,this.sizeB+50,this.sizeB+50);
  }
  
  move(speed){
    this.x+= speed;
  }
  
  getX(){
    return this.x;
  }
  
  collision(xS,yS,widS){
    if(xS - widS/2 < this.x + this.sizeB/2
       && xS + widS/2 >this.x - this.sizeB/2 
       && yS === this.y){
      return true;
    }
    return false;
  }
}

////// music game class ///////

class MusicGame {
  constructor(x, y, sizeG, widthOfSquare) {
    rectMode(CENTER);
    this.meX = x + sizeG - widthOfSquare;
    this.meY = y + sizeG / 2;
    this.playerW = widthOfSquare;
    
    this.score = 0;
    
    this.gameX = x;
    this.gameY = y;
    this.gameSize = sizeG;
    
    this.beatSize = widthOfSquare*1.5;
    
    this.beats = [];
    this.onw = this.gameY + this.gameSize / 4;
    this.tw = this.gameY + this.gameSize/ 2;
    this.thre = this.gameY + (3 * this.gameSize) / 4;
    
    
    this.lines = [];
    this.lines.push(this.gameY + this.gameSize / 4);
    this.lines.push(this.gameY + this.gameSize/ 2);
    this.lines.push(this.gameY + (3 * this.gameSize) / 4);
    
    
    this.lives = 3;
    indexOfPlayer = 1;    
    speed = (12,18);
    rectMode(CORNER);
  }
  

////// draw music function ///////

  drawMusic() {
    rectMode(CENTER);
    
////// game over function ///////
    
    if(this.isGameOver){
    background(243, 207, 198);
    textAlign(CENTER);
    image(speaker, 315, 110, 250,250);
    textSize(28);
    fill(255,255,255);
    text("dang i'm tired!",width/2,400);
    textSize(15);
    text("thank you for helping me finish the combo.",width/2,460);
      
      
    }else{
    stroke(255,255,255);
    strokeWeight(3);
    line(this.gameX, this.gameY + this.gameSize / 4, this.gameX+this.gameSize, this.gameY + this.gameSize / 4);
    line(this.gameX, this.gameY + this.gameSize/ 2, this.gameX+ this.gameSize, this.gameY + this.gameSize/ 2);
    line(this.gameX, this.gameY + (3 * this.gameSize) / 4, this.gameX+ this.gameSize,  this.gameY + (3 * this.gameSize) / 4);
    line(this.meX + this.playerW/2, this.gameY, this.meX + this.playerW/2, this.gameY + this.gameSize);
    // draw player
    fill("brown");
    this.meY = this.lines[indexOfPlayer];
    image(me, this.meX, this.meY-80, this.playerW+100, this.playerW+100);
    

////// spawn beats aka arrows + speaker ///////
    
    if (frameCount % 100 == 0) {
      this.beats.push(new beat(this.gameX, random([this.onw, this.tw, this.thre]), this.beatSize, this.beatSize)); 
        arrowsIndex = floor(random(Arrows.length));
        speed = random(12,18);
    }
    
    if(frameCount % 300 == 0 && speed < 8){
      speed += random(12,18);
      console.log(speed)
    }
    fill(255,255,255);
    noStroke();
    textSize(20);
    text("score:" + this.score, 20, 50);
    text("lives left: " + this.lives , 20, 80);

    var toSplice = [];

    for (var i = 0; i < this.beats.length; i++) {
      this.beats[i].move(speed);
      this.beats[i].display();
      if(this.beats[i].collision(this.meX, this.meY, this.playerW)){
        toSplice.push(i);
        this.score ++;
      }
      if(this.beats[i].getX() + this.beatSize > this.gameX + this.gameSize+ this.beatSize*2){
        toSplice.push(i);
        this.lives --;
      }
    }
    
    
    for (var c = toSplice.length -1;c >= 0; c--) {
      this.beats.splice(toSplice, 1);
    }
    
      if(this.lives < 0){
        this.isGameOver = true;
      }
    }
    rectMode(CORNER);
  }
}

////// key pressed function ///////

function keyPressed() {
  if (keyCode === UP_ARROW) {
    indexOfPlayer --;
    if(indexOfPlayer < 0){
      indexOfPlayer = 2;
    }
  } else if (keyCode === DOWN_ARROW) {
    indexOfPlayer ++;
    if(indexOfPlayer > 2){
      indexOfPlayer = 0;
    }
  }
}
