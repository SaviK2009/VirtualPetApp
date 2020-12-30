//Create variables here
var dog, happyDog;
var database;
var foodS,foodStock;
function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,250,20,20);
  dog.scale=0.2;
  dog.addImage(dogimg);
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value" , readStock)
}


function draw() {  
  background(46, 139, 87)
  drawSprites();
  //add styles here
  textSize(20)
  fill("white")
  text("Food Remaining:" + foodS, 170,150)
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(foodS<=0)
  {
    foodS=0;
    
  }else{
    foodS=foodS-1
  }
  database.ref('/').update({
    Food:x
  })
}

