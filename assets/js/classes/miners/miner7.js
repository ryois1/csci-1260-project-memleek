import { Miner } from '../miner.js';
import { Miner6 } from './miner6.js';
class Miner7 extends Miner {

  constructor(...args) {
    super(...args);
    console.log("New Miner7 created");
  }

  genTick(miner6) {
    if (this.quantity > 0) {
      console.log("Miner7 tick");
      var NewMiner6quantity = this.quantity * this.production;
      miner6.quantity = miner6.quantity + NewMiner6quantity;
    }
    else {
      return;
    }
  }
}

export { Miner7 };