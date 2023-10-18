/////////////// #2 Shoot Coffee at the Customer Game! ///////////////

/////////////// initialize variables ///////////////
var player;
var score = 0;
var font;
var meSize = 150;
var drinkSize = 75;
var customerSize = 100;
var gameover = false;
var song;

/////////////// initialize arrays ///////////////
var drinks = [];
var customers = [];

/////////////// initialize  images ///////////////
var coffee;
var me;
var mehappy;
var madCustomer;

/////////////// preload files ///////////////
function preload(){
  coffee = loadImage("coffee.png");
  me = loadImage("me.png");
  mehappy = loadImage("mehappy.png");
  madCustomer = loadImage("madCustomer.png");
  font = loadFont("PressStart2P-Regular.ttf");
  song = loadSound("killbill.mp3");
  
}
/////////////// setup function ///////////////

function setup() {
  createCanvas(900, 600);
  song.play();
  player = new Player();
  player.y = height - 150;
}

/////////////// draw function ///////////////

function draw() {
    background(243, 207, 198);

    player.show();
    player.update();

    for (let i = drinks.length - 1; i >= 0; i--) {
        drinks[i].show();
        drinks[i].update();

        // check for drink-customer collisions
        let customerIndex = drinks[i].hits(customers);
        if (customerIndex !== -1) {
            drinks.splice(i, 1);
            customers.splice(customerIndex, 1);
            score++;
        } else if (drinks[i].offScreen()) {
            drinks.splice(i, 1);
        }
    }

    // Display and update targets
    for (let i = customers.length - 1; i >= 0; i--) {
        customers[i].show();
        customers[i].update();

        // Check for player-target collisions
        if (player.playerHits(customers[i])) {
            gameOver();
        }
    }

/////////////// display score ///////////////
  if (!gameOver) {
  fill(255,255,255);
    textFont(font);
    textSize(20);
    text(`Score: ${score}`, 10, 30);
  }
  

/////////////// spawn customers ///////////////
  
  if (frameCount % 60 === 0) {
    customers.push(new Customer());
  }
}


/////////////// keyPressed function ///////////////

function keyPressed() {
  if (keyCode === 32) {
    drinks.push(new Drink(player.x + player.width / 2, player.y));
  }
}


/////////////// gameOver function ///////////////

function gameOver() {
  gameOver = true;
  noLoop();
  background(243, 207, 198);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont(font);
  image(mehappy, 325, 110, 220, 220);
  textSize(28);
  text("oh no the customers got me!", width / 2, 380);
  textSize(13);
  text("at least the nice customers felt bad & tipped me.", width / 2, 420);
  textSize(20);
  text(`score: ${score}`, width / 2, 480);
}


/////////////// player class ///////////////

class Player {
  constructor() {
    this.width = 100;
    this.height = 100;
    this.x = width / 2 - this.width / 2;
    this.y = height - 30;
  }

  show() {
    image(me, this.x, this.y, meSize, meSize);
  }

  update() {
    this.x = mouseX - this.width / 2;
    this.x = constrain(this.x, 0, width - this.width);
    
    this.y = constrain(this.y, 0, height - this.height);
  }

  playerHits(customer) {
    return (
      this.x < customer.x + customer.width &&
      this.x + this.width > customer.x &&
      this.y < customer.y + customer.height &&
      this.y + this.height > customer.y
    );

  }
}



/////////////// customer class ///////////////

class Customer {
  constructor() {
    this.width = random(20, 50);
    this.height = 20;
    this.x = random(width - this.width);
    this.y = -this.height;
    this.speed = random(2, 4);
  }

  show() {
    image(madCustomer,this.x, this.y, customerSize, customerSize);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      customers.splice(customers.indexOf(this), 1);
    }
  }
}

/////////////// drink class ///////////////

class Drink {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.speed = 5;
  }

  show() {
    image(coffee,this.x, this.y, drinkSize, drinkSize);
  }

  update() {
    this.y -= this.speed;
    if (this.y < 0) {
      drinks.splice(drinks.indexOf(this), 1);
    }
  }
  
  hits(customers) {
    for (let i = 0; i < customers.length; i++) {
      let d = dist(this.x, this.y, customers[i].x + customers[i].width / 2, customers[i].y + customers[i].height / 2);
      if (d < this.radius + customers[i].width / 2) {
        return i; // Return the index of the collided customer
      }
  }
  return -1; // No collision with any customer
}
  offScreen() {
    return this.y < 0;
}

}
