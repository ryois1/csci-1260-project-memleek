'use strict';
class Boosts {
    cost = 1e+19;
    quantity = 0;
    multiplier = 1;
    buyCount = 0;

    constructor(_cost,_quantity,_multiplier, _buyCount) {
        this.cost = _cost;
        this.quantity = _quantity;
        this.multiplier = _multiplier;
        this.buyCount = _buyCount;
        $('#boostBtn').html(`Boost Cost: ${this.cost.toExponential(2).replace('+','')}`);

    }

    buyBoost() {
    if(globalBytes >= this.cost) {
        globalBytes = globalBytes - this.cost;
        this.quantity = this.quantity + 1;
        this.cost = Math.pow(this.cost,1.5);
        this.multiplier = this.multiplier * 2;
        //foreach to increase the production of each miner by multiplier
        for (let i = 0; i < minerInstances.length; i++) {
            minerInstances[i].production = minerInstances[i].production * this.multiplier;
        }
        $('#boostBtn').html(`Boost Cost: ${this.cost.toExponential(2).replace('+','')}`);
        console.log(`Boosts: ${this.quantity} Cost: ${this.cost} Multiplier: ${this.multiplier} Buy Count: ${this.buyCount}`);
    }

}
}
export {Boosts};


