import { Compressor } from "./compressors.js";

class Compressor8 extends Compressor {

    constructor(...args) {
    super(...args);
    console.log("New Compressor8 created");
  
    }
  
    genTick(compressor7){  
      if (this.quantity > 0){
        var NewCompressorQuantity7quantity = this.quantity * this.production;
        compressor7.quantity = compressor7.quantity + NewCompressorQuantity7quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor8 };