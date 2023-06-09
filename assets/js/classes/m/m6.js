import { Miner } from '../m.js';

class Miner6 extends Miner {

  constructor(...args) {
    super(...args);
    console.log("New Miner6 created");
  }

  genTick(miner5) {
    if (this.quantity > 0) {
      var NewMiner5quantity = this.quantity * this.production;
      miner5.quantity = miner5.quantity + NewMiner5quantity;
      return true;
    }
    else {
      return false;
    }
  }
}

export { Miner6 };