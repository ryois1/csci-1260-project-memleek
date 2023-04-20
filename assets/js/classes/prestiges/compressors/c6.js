import { Compressor } from "./compressors.js";

class Compressor6 extends Compressor {

  constructor(...args) {
    super(...args);
    console.log("New Compressor6 created");

  }

  genTick(compressor5) {
    if (this.quantity > 0) {
      var NewCompressor5quantity = this.quantity * this.production;
      compressor5.quantity = compressor5.quantity + NewCompressor5quantity;
      return true;
    }
    else {
      return false;
    }
  }
}
export { Compressor6 };