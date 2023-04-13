'use strict';
import { Miner8 } from '../m/m8.js';
class Prestige {

    id;
    // id of the compressors (similar to infinity dimensions)
    upgradeID;
    // id of the prestige upgrades that will impact the multiplier
    production = new Decimal(1);
    // production of the compressors
    compressQuantity = new Decimal(0);
    // quantity of the compressors
    cost = new Decimal(1);
    // cost of the compressors
    multiplier = new Decimal(1);
    // default multiplier property of a prestige
    compressionPointsEarned = new Decimal(0);
    // amount of points a player has earned in this prestige layer
    globalCompressionPoints = new Decimal (0);
    // amount of points a player has available to spend
    broken;

    constructor(id, production, _compressQuantity, cost) {
        this.id = id;
        this.production = new Decimal(production);
        this.compressQuantity = new Decimal(_compressQuantity);
        this.cost = new Decimal(cost);
    }
    Compress() {
        if (globalBytes >= 1.0e+49 || this.broken == true) {
            this.globalCompressionPoints += this.compressionPointsEarned;
            this.compressionPointsEarned = 0;
            return this.globalCompressionPoints;
        }
        else {
            return;
            //  user doesnt meet the requirements to compress
        }
    }
    //this function is called when a player clicks the compress button
    CompressReset() {
        this.Compress();
        minerInstances[7].sacrificemult = 1;
        minerInstances[7].lastsacrificequantity = 0;
        minerInstances.forEach(function (m) {
            m.minerQuantity = 0;

        });
    }


    EarnCompressionPoints() {
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