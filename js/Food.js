class Food {

//preloading the image of milk...

milk_img = loadImage("Milk.png");

//the constructor of my class...

constructor() {

    //the variables for this class...

    var foodStock,lastFed;
    var foodObj;

    
    
}

//the function to update the foodStock...

updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }


   //function to get the feeding time from the game...

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

//function for the deuction of the food...

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

//function to get the food stock...

    getFoodStock(){
      return this.foodStock;
    }



display() {
    var x=80,y=100

    imageMode(CENTER);
    image(this.image,720,220,70,70);

    if(this.foodStock!=0) {
        for(var i=0;i<this.foodStock;i++) {
            if(i%10==0) {
                x=80;
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
}

//the separately created functions for bedroom, garden & playground...

bedroom(){
    background(bedroom,550,500);  
}
  
garden(){
    background(garden,550,500);  
} 

washroom(){
    background(washroom,550,500); 
}

}

