import { Miner } from '../miner.js';
import { ECurrency } from '../../enums/Currency.js';
class Miner1 extends Miner {

  constructor(...args) {
    super(...args);
    console.log("New Miner1 created");
  }

  genTick() {
    let bytecount = globalBytes + (this.quantity * this.production);
    globalBytes = bytecount;
    return true;
  }
}

export { Miner1 };