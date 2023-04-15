import { compressors } from "./compressors";
import { Compressor3 } from "./c1";

class Compressor4 extends compressors {

    constructor(...args) {
    super(...args);
    console.log("New Miner2 created");
  
    }
  
    genTick(Compressor4){  
      if (this.quantity > 0){
        var NewCompressorQuantity3quantity = this.quantity * this.production;
        Compressor3.quantity = Compressor3.quantity + NewCompressor3quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor4 };