import { Miner } from '../miner.js';
import { Miner1 } from './miner1.js';
class Miner2 extends Miner {

  constructor(...args) {
  super(...args);
  console.log("New Miner2 created");

  }

  genTick(miner1){  
    if (this.quantity > 0){
      console.log("Miner2 tick");
      var NewMiner1quantity = this.quantity * this.production;
      miner1.quantity = miner1.quantity + NewMiner1quantity;
    }
    else{
      return;
    }
  }
}


export { Miner2 };