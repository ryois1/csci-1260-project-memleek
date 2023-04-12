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

  constructor(_id, _production, _cost, _quantity, _buyCount) {
    this.id = _id;
    this.production = _production;
    this.cost = _cost;
    this.quantity = _quantity;
    this.buyCount = _buyCount;
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
    // the price is increased by ^1.5 and the production is doubled
    if (this.buyCount % 10 == 0) {
      this.production = this.production * 2;
      this.cost = this.cost * 150;

    }

    console.log(`Current cost: ${this.cost}, New quantity: ${this.quantity}`);
  }


  //buy 10 miners
  buyTen(){
    amount = 10 - this.quantity;
    //increases quantity by one
    this.quantity += amount;
    this.production = this.production * 2;
    this.cost = this.cost * 150;
    globalBytes -= this.cost * amount;
    this.buyCount += amount;
  }

}




export { Miner };