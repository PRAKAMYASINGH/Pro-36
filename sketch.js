//The variables of my App...

var dog,happyDog,database,foodS,foodStock;
var bedroom, garden, washroom;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

//loading the  images of my app here...

function preload(){
  dog=loadImage("Dog.png")
  happydog=loadImage("happydog.png")
  garden=loadImage("Images/Garden.png");
washroom=loadImage("Images/Wash Room.png");
bedroom=loadImage("Images/Bed Room.png");
sadDog=loadImage("Images/Dog.png");
  
}

// Creating the sprites and canvas in the setup...

function setup() {
  database=firebase.database();
  createCanvas(400,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  // function to read the gameState from database...

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

// The draw function for the controls...

function draw() {

//setting the variable current time to the hour function...

  currentTime=hour();

//the functions required for the display of different images according to the situations...

  if(currentTime==(lastFed+1)) {
      update("Playing");
      foodObj.garden();
   }

   else if(currentTime==(lastFed+2)) {
    update("Sleeping");
      foodObj.bedroom();
   }
   
   else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)) {
    update("Bathing");
      foodObj.washroom();
   }
   else {
    update("Hungry")
    foodObj.display();
   }
   
//conditions to hide the feed add food and dog to show the progress of the game...

   if(gameState!="Hungry") {
     feed.hide();
     addFood.hide();
     dog.remove();
   }
   
   else {
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
   }
 
  drawSprites();
}

//Function to read the values from database...

function  readStock() {
  foodS=data.val();
}

//Function to write the values in  database...

function  writeStock(x) {
if(x<=0) {
  x=0
} 
else {
  x=x-1;
}
  database.ref('/').update({
  Food:x
})
}

function feedDog() {
  dog.addImage(happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



