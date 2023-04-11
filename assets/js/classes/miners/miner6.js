import { Miner } from '../miner.js';
import { Miner5 } from './miner5.js';
class Miner6 extends Miner {

  constructor(...args) {
    super(...args);
    console.log("New Miner6 created");
  }

  genTick(miner5) {
    if (this.quantity > 0) {
      console.log("Miner6 tick");
      var NewMiner5quantity = this.quantity * this.production;
      miner5.quantity = miner5.quantity + NewMiner5quantity;
    }
    else {
      return;
    }
  }
}

export { Miner6 };