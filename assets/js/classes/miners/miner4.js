import { Miner } from '../miner.js';
import { Miner3 } from './miner3.js';
class Miner4 extends Miner {

    constructor(...args) {
    super(...args);

    console.log("New Miner4 created");

  }

  genTick(miner3){
    if (this.quantity > 0){
      console.log("Miner4 tick");
      var NewMiner3quantity = this.quantity * this.production;
      miner3.quantity = miner3.quantity + NewMiner3quantity;
    }
    else{
      return;
    }
  }
}

export { Miner4 };