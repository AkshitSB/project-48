var PLAY = 1;
var END = 0;
var gameState = 1;

var bg, bgImg;
var player, playerImg;
var SMImg, SM, SMGroup;
var plasticGroup, plasticImg, plastic;
var turtle, turtleImg, turtleGroup;
var GO, GOImg

var score = 0;

function preload(){

  bgImg = loadImage("sprites/bg.gif");
  playerImg = loadImage("sprites/submarine.gif");
  SMImg = loadImage("sprites/SM.png");
  plasticImg = loadImage("sprites/bottle.png");
  turtleImg = loadImage("sprites/turtle.png");
  GOImg = loadImage("sprites/GO.gif");

}



function setup() {
  createCanvas(800,400);
  player = createSprite(100, 200, 50, 50);
  player.addImage(playerImg);
  player.scale = 0.07;


  plasticGroup = new Group();
  turtleGroup = new Group();
  SMGroup = new Group();
  
}

function draw() {
  background(bgImg);  

  if (keyIsDown(UP_ARROW)) {
    player.y -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.y += 10;
  }

  createplastics();
  createturtles();
  createSMs();

  if (player.isTouching(plasticGroup)){
    plasticGroup.destroyEach();
    score=score+2;
  }

  if (player.isTouching(turtleGroup)){
    turtleGroup.destroyEach();
    score=score-2;
  }

  if (player.isTouching(SMGroup)){
    
    score= 0;
    gameState = END;
  }
  if(gameState === END){
    player.addImage(GOImg);
    player.scale = 1;
    player.x=400;
    player.y=200;
    plasticGroup.x=2000;
    plasticGroup.y=2000;
    turtleGroup.x=2000;
    turtleGroup.y=2000;
    SMGroup.x=2000;
    SMGroup.y=2000;
    plasticGroup.setVelocityXEach(0);
    turtleGroup.setVelocityXEach(0);
    SMGroup.setVelocityXEach(0);
    plasticGroup.setLifetimeEach(0);
    turtleGroup.setLifetimeEach(0);
    SMGroup.setLifetimeEach(0);
    plasticGroup.visible = false;
    turtleGroup.visible = false;
    SMGroup.visible = false;
    
    plasticGroup.destroyEach();
    turtleGroup.destroyEach();
    SMGroup.destroyEach();
  }  
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400, 50);

  if (gameState === END){
    stroke("white");
    fill("cyan");
    textSize(20);
    text("Refresh page to re-try again.", 200,300)
   }
  
}

function createplastics(){
  if(frameCount % 70 == 0){
    var plastic = createSprite(800, Math.round(random(100 , 700), 1000, 5));
    plastic.scale = 0.1;
    plastic.addImage(plasticImg)
    plastic.velocityX = -4;     
    plasticGroup.add(plastic);
    plastic.lifeTime = 100;
  }
}

function createturtles(){
  if(frameCount % 60 == 0){
    var turtle = createSprite(800, Math.round(random(100 , 700), 1000, 5));
    turtle.scale = 0.1;
    turtle.addImage(turtleImg)
    turtle.velocityX = -4;     
    turtleGroup.add(turtle);
    turtle.lifeTime = 100;
  }
}
function createSMs(){
  if(frameCount % 90 == 30){
    var SM = createSprite(800, Math.round(random(100 , 700), 1000, 5));
    SM.scale = 0.7;
    SM.addImage(SMImg)
    SM.velocityX = -4;     
    SMGroup.add(SM);
    SM.LifeTime = 100;
  }
}

