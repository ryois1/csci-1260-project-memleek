import { Miner } from '../miner.js';
import { Miner4 } from './miner4.js';
class Miner5 extends Miner {

  constructor(...args) {
    super(...args);
    console.log("New Miner5 created");
  }

  genTick(miner4) {
    if (this.quantity > 0) {
      var NewMiner4quantity = this.quantity * this.production;
      miner4.quantity = miner4.quantity + NewMiner4quantity;
      return true;
    }
    else {
      return false;
    }
  }
}

export { Miner5 }