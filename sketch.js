var PLAY=1;
var END=0;
gameState=PLAY
var monkey,monkey_running;
var jungle,jungleImage;
var fruit,fruitImage;
var score;

function preload(){
  
  jungleImage=loadImage("sprite_0.png");
  
  monkey_running =
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png ")
  
  fruitImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  
  score=0;
 }
function setup() {
  
 createCanvas(windowWidth, windowHeight);
  jungle= createSprite(200,200,300,10);
  jungle.velocityX=-2;
  jungle.addImage("background",jungleImage);
 jungle.scale=2;
  
  ground = createSprite(width/2,height,width,2);
  ground.velocityX=-2;
  ground.visible=false;
  
  monkey =createSprite(50,height-70,20,50);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  
  FoodGroup=new Group();
  obstacleGroup= new Group(); 
  
}

function draw() {
  background(jungleImage);
   if(jungle.x<50){
    jungle.x=200;
  }
  if(gameState===PLAY){
   
   if(ground.x<0){
    ground.x=200;
  }
  if(keyDown("space")&&monkey.y>=150){
    monkey.velocityY=-12;
  }
    if(touches.length > 0 && monkey.y  >= height-120) {
      
      monkey.velocityY = -12;
       touches = [];
    }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  food();
  obstacles();
        if(score===10||score===20||score===30||score===40){
          if(score===10){
            monkey.scale=0.12
          }
           if(score===20){
            monkey.scale=0.14
          }
           if(score===30){
            monkey.scale=0.16
          }
           if(score===40){    
            monkey.scale=0.18
          }
        }
  
  if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
     score=score+2;
    }
  if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  
  }
  if(gameState===END){
    jungle.velocityX=0;
    obstacle.velocityX=0; 
   monkey.pause();
    monkey.scale=0.1;
    monkey.collide(ground);
    FoodGroup.destroyEach();
    if(keyDown("R")){
    reset();
  }
    if(touches.length>0) {      
      reset();
      touches = []
    }
  }
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+score,180,50);
  if(gameState===END){
    textSize(20);
    text("GAME OVER",140,180);
    text("Press r to restart",125,200);
    text("OR",180,220);
    text("Tap on screen to restart",100,240);
  }
  
}

function food () {
  if(frameCount%80===0){
    fruit=createSprite(width+20,height-300,40,10);
    fruit.velocityX=-5;
    fruit.addImage("moving",fruitImage);
    fruit.scale=0.05;
    fruit.y=Math.round(random(120,200));
    FoodGroup.add(fruit);
}
} 
  function obstacles(){
  if(frameCount%300===0){
    obstacle= createSprite(600,height-95,20,30);
    obstacle.collide(ground); 
    obstacle.velocityX=-2;
    obstacle.addImage("moving",obstacleImage);
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
    
  }
}
function reset(){
  gameState=PLAY;
  score=0;
  survivaltime=0;
  monkey.play();
  jungle.velocityX=-2;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
}
