var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running, monkey_collided;
var ground;
var banana ,bananaImg;
var obstacle, obstacleImg;
var bananasGroup, obstaclesGroup;
   survival_time = 0;
   score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadImage("sprite_0.png")
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
 
}



function setup() {

  monkey = createSprite(50, 340, 0, 0);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;

  ground = createSprite(0, 400, 1200, 20);
  ground.velocityX = -10
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() {
  background("white");
  
  if (gameState === PLAY) {
    
  if(keyDown("space") && monkey.y > 355) {
    monkey.velocityY = -18;
  }
  monkey.velocityY = monkey.velocityY + 0.85;
    
  spawnBananas();
  spawnObstacles();
    
  if (bananasGroup.isTouching(monkey)) {
    score = score + 1;
    bananasGroup.destroyEach();
  }
    
  survival_time = Math.ceil(frameCount/frameRate());
    
  if (obstaclesGroup.isTouching(monkey)){
    
  gameState = END;
    
  }
    
  }
  
  if (gameState === END) {
    
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    bananasGroup.destroyEach();
    
    monkey.changeAnimation("collided",         monkey_collided);
    
    textSize(30);
    fill("black");
    text("Game Over", 160, 200);
    
  }

  if(ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  
  monkey.collide(ground);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("score: " + score, 200, 15);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survival_time, 200, 35);
  
  drawSprites();
  
}

function spawnBananas() {
  
  if(frameCount%90 === 0) {
    
    banana = createSprite(350, 200, 0, 0);
    banana.velocityX = -3;
    banana.y = Math.round(random(130, 300))
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.lifetime = 150;
    
    bananasGroup.add(banana);

}
  
}

function spawnObstacles(){
 if (frameCount % 290 === 0){
   
    obstacle = createSprite(350, 375, 0, 0);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
   
    obstaclesGroup.add(obstacle);
 }
}