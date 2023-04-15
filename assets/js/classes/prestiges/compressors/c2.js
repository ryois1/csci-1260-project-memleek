import { Compressor } from "./compressors.js";

class Compressor2 extends Compressor {

    constructor(...args) {
    super(...args);
    console.log("New Miner2 created");
  
    }
  
    genTick(compressor1){  
      if (this.quantity > 0){
        var NewCompressorQuantity1quantity = this.quantity * this.production;
        compressor1.quantity = compressor1.quantity + NewCompressor1quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor2 };