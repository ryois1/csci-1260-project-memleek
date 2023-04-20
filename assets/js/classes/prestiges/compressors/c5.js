import { Compressor } from "./compressors.js";

class Compressor5 extends Compressor {

    constructor(...args) {
    super(...args);
    console.log("New Compressor5 created");
  
    }
  
    genTick(compressor4){  
      if (this.quantity > 0){
        var NewCompressor4quantity = this.quantity * this.production;
        compressor4.quantity = compressor4.quantity + NewCompressor4quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor5 };