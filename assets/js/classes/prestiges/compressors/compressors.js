'use strict';
import { Miner } from '../../m.js';

class Compressor extends Miner{
//These are the miners of this prestige layer, they boost the production of the previous layer's miners

    
    allProductionMultiplier = new Decimal(1);
    //This is the multiplier for the production of the previous layer's miners
    compressorPower = new Decimal(0);
    //visual representation of the compressor power


    constructor(_allProductionMultiplier, _compressorPower,...args){
        super(...args);
        this.allProductionMultiplier = _allProductionMultiplier;
        this.compressorPower = _compressorPower;
    }
    //because this is basically a copy of the previous layer's miners, this shouldnt be too hard to implement, Right?    

}

export { Compressor };