import { Miner } from '../m.js';
import { Miner1 } from './m1.js';
class Miner2 extends Miner {

  constructor(...args) {
  super(...args);
  console.log("New Miner2 created");

  }

  genTick(miner1){  
    if (this.quantity > 0){
      var NewMiner1quantity = this.quantity * this.production;
      miner1.quantity = new Decimal(miner1.quantity + NewMiner1quantity);
      console.log(miner1.quantity.egg())
      return true;
    }
    else{
      return false;
    }
  }
}


export { Miner2 };