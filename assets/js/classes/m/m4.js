import { Miner } from '../m.js';
import { Miner3 } from './m3.js';
class Miner4 extends Miner {

    constructor(...args) {
    super(...args);

    console.log("New Miner4 created");

  }

  genTick(miner3){
    if (this.quantity > 0){
      var NewMiner3quantity = this.quantity * this.production;
      miner3.quantity = miner3.quantity + NewMiner3quantity;
      return true;
    }
    else{
      return false;
    }
  }
}

export { Miner4 };