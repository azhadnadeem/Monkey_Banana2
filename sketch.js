
var monkey , monkey_running
var bananaImage,  obstacleImage
var bananaGroup, obstacleGroup
var score
var ground,groundImage;
var survivalTime
var invisibleGround;
var banana;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 groundImage=loadImage("groundM2.png");
}



function setup() {
 createCanvas(550,400);
  ground=createSprite(50,400,900,20);
  ground.addImage("ground",groundImage);
   ground.x=ground.width/2
 // ground.scale=1
   invisibleGround=createSprite(50,350,900,20)
   invisibleGround.visible=false;
 
 
 
  monkey=createSprite(80,300,20,50); 
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1
  survivalTime=0;
  score=0
  
  
   bananaGroup=createGroup();
  
   obstacleGroup=createGroup();
  
}


function draw() {
 background("white");
   spawnbanana();
  spawnobstacle();
  
  //jump when the space key is pressed
 
  if(keyDown("space")&& monkey.y >= 150) {
    monkey.velocityY=-6;
  }
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach()
    monkey.scale=0.2
     
  }
  if(monkey.isTouching(obstacleGroup)){
     monkey.scale=0.1
  }
  //add gravity
   monkey.velocityY = monkey.velocityY+0.8  ;
  
  //stop monkey falling down
  monkey.collide(invisibleGround);
  
  if(ground.x < 170){ 
   ground.x=ground.width/2;
  }
 ground.velocityX=-4;
  
 
  
  
  stroke("white")
  textSize(20);
  fill("black");
  text("score:"+score,200,30);
  stroke("black");
  textSize(20);
  fill("black");
  survivaiTime=Math.ceil(frameCount/frameRate())
  text("survivalTime:"+survivalTime,200,50)
  
   monkey.debug=false
   monkey.setCollider("circle",0,0,100)
   drawSprites(); 
}

function spawnbanana(){
  if(frameCount%120===0){
    var banana=createSprite(500,150,10,10)
  
    banana.y=Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=300;
  bananaGroup.add(banana)
    
    monkey.depth=banana.depth
    monkey.depth=monkey.depth+1
  }
}

function spawnobstacle(){
  if(frameCount%80===0){
    var obstacle=createSprite(500,450,10,10)
  
    obstacle.y=Math.round(random(350,350));
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle)
  }
}




