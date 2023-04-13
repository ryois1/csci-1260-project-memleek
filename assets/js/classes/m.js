'use strict';
class Miner {

  id;
  //ID 1-8 of miners
  production = new Decimal();
  //base production of miner
  cost = new Decimal();
  //base cost of miner
  quantity = new Decimal();
  //number of miners
  buyCount = new Decimal();
  //number of miners bought

  constructor(_id, _production, _cost, _quantity, _buyCount) {
    this.id = _id;
    this.production = new Decimal(_production);
    this.cost = new Decimal(_cost);
    this.quantity = new Decimal(_quantity);
    this.buyCount = new Decimal(_buyCount);
  }
  next() {
    return this._id++;
  }
  buy() {
    globalBytes -= this.cost;
    //increases quantity by one
    this.quantity++;
    this.buyCount++;
    // if the generator has been bought by a number divisible by 10 times,
    // the price is increased by ^1.5 and the production is doubled
    if (this.buyCount % 10 == 0) {
      this.production *= 2;
      if (this.buyCount < 100) {
        this.cost = this.cost * 150;
      }
      else {
        this.cost = Math.pow(this.cost, 1.25);
      }

      console.log(this.cost);
    }

    console.log(`Current cost: ${this.cost}, New quantity: ${this.quantity}`);
  }

  //buy 10 miners
  buyTen() {
    let count = 0;

    let mod = this.buyCount % 10;

    if (mod != 0) {
      count += mod;
    }

    while (globalBytes >= this.cost && count < 10) {
      try {
        this.buy();
        count++;
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  buyMax() {
    let count = 0;
    while (globalBytes >= this.cost) {
      try {
        this.buyTen();
        count++;
      }
      catch (error) {
        console.log(error);
      }
    }
  }
  Boost(minerInstances) {
    //boosts the production of all miners by the amount of boosters owned with a x2 multiplier
    for (let i = 0; i <= 7; i++) {
      minerInstances[i].production *= 2;
    }
  }
}


export { Miner };