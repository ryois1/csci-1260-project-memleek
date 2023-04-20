import { Compressor } from "./compressors.js";

class Compressor7 extends Compressor {

  constructor(...args) {
    super(...args);
    console.log("New Compressor7 created");

  }

  genTick(compressor6) {
    if (this.quantity > 0) {
      var NewCompressor6quantity = this.quantity * this.production;
      compressor6.quantity = compressor6.quantity + NewCompressor6quantity;
      return true;
    }
    else {
      return false;
    }
  }
}
export { Compressor7 };