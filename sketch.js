var play=1;
var end=0;
var gamestate= play;
var ground;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup, bananaGroup
var survivalTime=0;
var groundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage ("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400,400);
  ground= createSprite(400,350,900,10);
  ground.x=ground.width/2
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;

  console.log(ground.x);

  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
 
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible = false;
}


function draw() {
background(255);
  
 
  if (gamestate===play){
     if (ground.x<0){
  ground.x=ground.width/2
  }
   if (keyDown("space")){
     monkey.velocityY=-12;
   }
  monkey.velocityY= monkey.velocityY+0.8;
  monkey.collide(ground);
  ground.velocityX=-4;
  
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
    }
    
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/frameRate());
  text("Survival Time :"+ survivalTime, 100,50);
  
  if (monkey.isTouching(obstaclesGroup)){
    gamestate=end;
  }
  spawnObstacles();
  spawnBanana();
  drawSprites();
  }
  if (gamestate===end){
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
    background("lightBlue");
    stroke("black");
    textSize(20);
    fill("black");
    text("GAME OVER",150,180);
      }
   
    monkey.collide(invisibleGround);
 
}

function spawnObstacles() {
   if (frameCount % 300 === 0){
   var obstacle = createSprite(600,310,10,40);
   obstacle.velocityX = -(6+survivalTime/100);
   obstacle.addImage(obstacleImage);
    
      
      obstacle.scale = 0.2 ;
    obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
     
 

}
}
function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}









