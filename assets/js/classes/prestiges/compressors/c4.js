import { Compressor } from "./compressors.js";

class Compressor4 extends Compressor {

    constructor(...args) {
    super(...args);
    console.log("New Miner2 created");
  
    }
  
    genTick(compressor3){  
      if (this.quantity > 0){
        var NewCompressor3quantity = this.quantity * this.production;
        compressor3.quantity = compressor3.quantity + NewCompressor3quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor4 };