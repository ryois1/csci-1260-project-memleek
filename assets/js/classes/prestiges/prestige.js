'use strict';
import { Miner } from '../../m.js';
import { Compressor } from './classes/prestiges/compressors/compressors.js';
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
            this.CompressionReset();
            return this.globalCompressionPoints;
        }
        else{
            return;
            //  user doesnt meet the requirements to compress
        }
    }
    //this function is called when a player clicks the compress button
    CompressionReset(){
        globalBytes = 100;
        let miner1 = new Miner1(1, 1, 10, 0, 0);
        let miner2 = new Miner2(2, 1, 1e+3, 0, 0);
        let miner3 = new Miner3(3, 1, 1e+5, 0, 0);
        let miner4 = new Miner4(4, 1, 1e+7, 0, 0);
        let miner5 = new Miner5(5, 1, 1e+10, 0, 0);
        let miner6 = new Miner6(6, 1, 1e+14, 0, 0);
        let miner7 = new Miner7(7, 1, 1e+19, 0, 0);
        let miner8 = new Miner8(1, 0, 8, 1, 1e+25, 0, 0,);
        //creates a new instance of each miner
        Boosts.multiplier = 1;
        Boosts.buyCount = 0;
        Boosts.cost = 1e+19;
        Boosts.quantity = 0;

    }



/*
    CompressionReset(){
        this.globalBytes = 0;
        //foreach to reset all miners to 0
        minerInstances.forEach(function(miner,i){
            miner.quantity = 0;
            miner.buyCount = 0;
            miner.production = 1;

        });
        Miner1.cost = 1;
        Miner2.cost = 1e+3;
        Miner3.cost = 1e+5;
        Miner4.cost = 1e+7;
        Miner5.cost = 1e+10;
        Miner6.cost = 1e+14;
        Miner7.cost = 1e+19;
        Miner8.cost = 1e+25;
        //resets the cost of the miners to their original values
        Miner8.sacrif
    }
*/
        
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