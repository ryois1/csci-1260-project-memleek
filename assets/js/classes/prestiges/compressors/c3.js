import { Compressor } from "./compressors.js";

class Compressor3 extends Compressor {

    constructor(...args) {
    super(...args);
    console.log("New Miner2 created");
  
    }
  
    genTick(compressor2){  
      if (this.quantity > 0){
        var NewCompressorQuantity2quantity = this.quantity * this.production;
        compressor2.quantity = compressor2.quantity + NewCompressor2quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor3 };