'use strict';
class Prestige{

    id;
    // id of the compressors (similar to infinity dimensions)
    upgradeID;
    // id of the prestige upgrades that will impact the multiplier
    production;
    // production of the compressors
    compressQuantity;
    // quantity of the compressors
    cost;
    // cost of the compressors
    multiplier = 1;
    // default multiplier property of a prestige
    compressionPointsEarned = 0;
    // amount of points a player has earned in this prestige layer
    globalCompressionPoints = 0;
    // amount of points a player has available to spend
    broken;

    constructor(id, production, _compressQuantity, cost){
        this.id = id;
        this.production = production;
        this.compressQuantity = _compressQuantity;
        this.cost = cost;
    }
    Compress(){
        if(globalBytes >= 1.0e+49 || this.broken == true){
            this.globalCompressionPoints += this.compressionPointsEarned;
            this.compressionPointsEarned = 0;
            return this.globalCompressionPoints;
        }
        else{
            return;
            //  user doesnt meet the requirements to compress
        }
    }
    //this function is called when a player clicks the compress button


    EarnCompressionPoints(){
        this.compressionPointsEarned += Math.ceil(Math.log10(Math.log10(globalBytes)));
        //this is a ceiling function of the log base 100 of total bytes produced, being the amount of compression points earned in the compression

        return this.compressionPointsEarned;


    }
    /*  
        this function is called to add to the amount of compression points earned in 
        the current prestige layer
    */
}

export { Prestige };