'use strict';
class Prestige{

    id;
    // id of the compressors (similar to infinity dimensions)
    upgradeID;
    // id of the prestige upgrades that will impact the multiplier
    production;
    // production of the compressors
    quantity;
    // quantity of the compressors
    cost;
    // cost of the compressors
    multiplier = 1;
    // default multiplier property of a prestige
    compressionPointsEarned = 0;
    // amount of points a player has earned in this prestige layer
    globalCompressionPoints = 0;
    // amount of points a player has available to spend

    constructor(id, production, quantity, cost){
        this.id = id;
        this.production = production;
        this.quantity = quantity;
        this.cost = cost;
    }
    Compress(){
        if(/*some stuff to check if the player can compress for now set to just always be allowed*/ true){
            this.globalCompressionPoints += this.compressionPointsEarned;
            this.compressionPointsEarned = 0;
            return this.globalCompressionPoints;
        }
        else{
            //  user doesnt meet the requirements to compress
        }
    }
    //this function is called when a player clicks the compress button


    EarnCompressionPoints(){


    }
    /*  
        this function is called to add to the amount of compression points earned in 
        the current prestige layer
    */
}