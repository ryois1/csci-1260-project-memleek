import { Compressor }  from "./compressors.js";
class Compressor1 extends Compressor {

  constructor(...args) {
    super(...args);
    console.log("New Miner1 created");
  }

  genTick() {
    let compressorPower = compressorPower + (this.quantity * this.production);
    compressorPower = compressorPower;
    return true;
  }
}

export { Compressor1 };