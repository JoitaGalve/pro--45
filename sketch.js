var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg, bgI;
var player, playerI
var surf;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var g, gI;
var gm, gmI;
var r, rI;
var score = 0
function preload(){
  bgI = loadImage("bg1.jpg")
  playerI = loadAnimation("bunny.gif")
  obstacle1 = loadImage("lion1.gif");
  obstacle2 = loadImage("lion1.gif");
  obstacle3 = loadImage("lion1.gif");
  obstacle4 = loadImage("lion1.gif");
  obstacle5 = loadImage("lion1.gif");
  obstacle6 = loadImage("lion1.gif");
  
  gI = loadAnimation("ghost.png")
  gmI = loadImage("gm.jpg")
  rI = loadImage("restart.png")
}

function setup() {
    createCanvas(600, 400)

   bg = createSprite(300, 200, 10, 10)
   bg.addImage(bgI)
   bg.scale = 0.4
   bg.velocityX = -1

   player = createSprite(70, 300, 10, 10)
   player.addAnimation("running", playerI)
   player.scale = 0.5
        player.setCollider("rectangle",0,0,100, 250);
  player.debug = false
   
  surf = createSprite(300, 360, 600, 1)
  surf.visible = false
  
  gm = createSprite(300, 200, 10, 10)
  gm.addImage(gmI)
  gm.visible = false

  r = createSprite(300, 350, 10, 10)
  r.addImage(rI)
  r.scale = 0.6
  r.visible = false
  
   obstaclesGroup = createGroup();
   
}

function draw() {
  background(0);
  if(gameState===PLAY) {
  edges = createEdgeSprites()
  player.collide(edges)
  player.collide(surf)
  
  if(bg.x<250) {
    bg.x = width/2
    
  }
  
  if(keyDown("space")&& player.y >= 100) {
        player.velocityY = -12;
    }
    
    //add gravity
    player.velocityY = player.velocityY + 0.8

    bg.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(obstaclesGroup.isTouching(player)){
      bg.velocityX = 0
      player.velocityY = 0
      obstaclesGroup.destroyEach()
     
      gameState = END
    }
    
  }
  
  if(gameState===END) {
     bg.velocityX = 0
      player.velocityY = 0
      obstaclesGroup.destroyEach()
    gm.visible = true
    r.visible = true
  }
  
  if(mousePressedOver(r)) {
    restart()
  }
  spawnObstacles()
  
  
  
     drawSprites()
     fill("red")
     textSize(20)
    text("SCORE: " +score, 20, 30)
}

function restart() {
  gameState = PLAY
  bg.velocityX = -2
  gm.visible = false
  r.visible = false
  score = 0
  obstaclesGroup.destroyEach()

  
}
function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,290,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
  
