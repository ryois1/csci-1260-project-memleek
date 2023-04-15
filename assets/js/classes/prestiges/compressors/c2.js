import { compressors } from "./compressors";
import { Compressor1 } from "./c1";

class Compressor2 extends compressors {

    constructor(...args) {
    super(...args);
    console.log("New Miner2 created");
  
    }
  
    genTick(Compressor2){  
      if (this.quantity > 0){
        var NewCompressorQuantity1quantity = this.quantity * this.production;
        Compressor1.quantity = Compressor1.quantity + NewCompressor1quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor2 };