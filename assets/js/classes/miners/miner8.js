import { Miner } from '../miner.js';
import { Miner7 } from './miner7.js';
class Miner8 extends Miner {
  constructor(...args) {
    super(...args);
    console.log("New Miner8 created");
  }

  genTick(miner7) {
    if (this.quantity > 0) {
      var NewMiner7quantity = this.quantity * this.production;
      miner7.quantity = miner7.quantity + NewMiner7quantity;
      return true;
    }
    else {
      return false;
    }
  }
}

export { Miner8 };