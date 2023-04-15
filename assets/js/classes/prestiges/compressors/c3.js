import { compressors } from "./compressors";
import { Compressor2 } from "./c1";

class Compressor3 extends compressors {

    constructor(...args) {
    super(...args);
    console.log("New Miner2 created");
  
    }
  
    genTick(Compressor3){  
      if (this.quantity > 0){
        var NewCompressorQuantity2quantity = this.quantity * this.production;
        Compressor2.quantity = Compressor2.quantity + NewCompressor2quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor3 };