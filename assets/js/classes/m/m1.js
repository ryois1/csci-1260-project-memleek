import { Miner } from '../m.js';
class Miner1 extends Miner {

  constructor(...args) {
    super(...args);
    console.log("New Miner1 created");
  }

  async genTick() {
    let bytecount = new Decimal();
    bytecount.add(globalBytes);
    bytecount.add(this.production * this.multiplier);
    console.log("bytecount: " + bytecount)
    globalBytes = bytecount;
    return true;
  }
}

export { Miner1 };