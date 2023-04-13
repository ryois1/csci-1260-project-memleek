import { Miner } from '../m.js';
import { Miner6 } from './m6.js';
class Miner7 extends Miner {

  constructor(...args) {
    super(...args);
    console.log("New Miner7 created");
  }

  genTick(miner6) {
    if (this.quantity > 0) {
      var NewMiner6quantity = this.quantity * this.production;
      miner6.quantity = miner6.quantity + NewMiner6quantity;
      return true;
    }
    else {
      return false;
    }
  }
}

export { Miner7 };