'use strict';
class Miner {

  id;
  //ID 1-8 of miners
  production;
  //base production of miner
  cost;
  //base cost of miner
  quantity;
  //number of miners
  buyCount;
  //number of miners bought
  multiplier;

  constructor(_id, _production, _cost, _quantity, _buyCount) {
    this.id = _id;
    this.production = _production;
    this.cost = _cost;
    this.quantity = _quantity;
    this.buyCount = _buyCount;
    this.multiplier = 1
  }
  next() {
    return this._id++;
  }

  tick() {

  }
  buy() {
    globalBytes -= this.cost;
    //increases quantity by one
    this.quantity++;
    this.buyCount++;
    // if the generator has been bought by a number divisible by 10 times,
    // the price is increased by 150x
    if (this.buyCount % 10 == 0) {
      this.cost = this.cost * 150;
      this.production = this.production *2
    }

    console.log(`Current cost: ${this.cost}, New quantity: ${this.quantity}`);
  }
}




export { Miner };