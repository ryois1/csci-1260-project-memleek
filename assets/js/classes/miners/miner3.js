import { Miner } from '../miner.js';
import { Miner2 } from './miner2.js';
class Miner3 extends Miner {

    constructor(...args) {
    super(...args);

    console.log("New Miner3 created");

  }

  genTick(miner2){
    if (this.quantity > 0){
      console.log("Miner3 tick");
      var newMiner2quantity = this.quantity * this.production;
      miner2.quantity = miner2.quantity + newMiner2quantity;
    }
    else{
      return;
    }
  }
}

export { Miner3 };