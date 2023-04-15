import { compressors } from "./compressors";
import { Compressor7 } from "./c1";

class Compressor8 extends compressors {

    constructor(...args) {
    super(...args);
    console.log("New Miner2 created");
  
    }
  
    genTick(Compressor8){  
      if (this.quantity > 0){
        var NewCompressorQuantity7quantity = this.quantity * this.production;
        Compressor7.quantity = Compressor7.quantity + NewCompressor7quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor8 };