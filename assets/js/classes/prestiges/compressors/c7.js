import { compressors } from "./compressors";
import { Compressor6 } from "./c1";

class Compressor7 extends compressors {

    constructor(...args) {
    super(...args);
    console.log("New Miner2 created");
  
    }
  
    genTick(Compressor7){  
      if (this.quantity > 0){
        var NewCompressorQuantity6quantity = this.quantity * this.production;
        Compressor6.quantity = Compressor6.quantity + NewCompressor6quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor7 };