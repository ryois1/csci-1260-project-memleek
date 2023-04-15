import { compressors } from "./compressors";
import { Compressor4 } from "./c1";

class Compressor5 extends compressors {

    constructor(...args) {
    super(...args);
    console.log("New Miner2 created");
  
    }
  
    genTick(Compressor5){  
      if (this.quantity > 0){
        var NewCompressorQuantity4quantity = this.quantity * this.production;
        Compressor4.quantity = Compressor4.quantity + NewCompressor4quantity;
        return true;
      }
      else{
        return false;
      }
    }
  }
  export { Compressor5 };