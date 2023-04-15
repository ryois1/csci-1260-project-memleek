import { compressors } from "./compressors";
import { Compressor5 } from "./c1";

class Compressor6 extends compressors {

    constructor(...args) {
    super(...args);
    console.log("New Miner2 created");
  
    }
  
    genTick(Compressor6){  
      if (this.quantity > 0){
        var NewCompressorQuantity5quantity = this.quantity * this.production;
        Compressor5.quantity = Compressor5.quantity + NewCompressor5quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor6 };