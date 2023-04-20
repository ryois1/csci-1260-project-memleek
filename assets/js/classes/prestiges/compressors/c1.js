import { Compressor }  from "./compressors.js";
import { Miner } from "../../m.js";
//isnt miner instances from Main?


class Compressor1 extends Compressor {

  constructor(...args) {
    super(...args);
    console.log("New Compressor1 created");
  }

  genTick() {
    let compressorPower = compressorPower + (this.quantity * this.production);
    compressorPower = compressorPower;
    //multiplies compressorpower to production of all miners
    minerInstances.forEach((miner, m) => {
      m.production = m.production * Math.LOG2E(Math.log10(compressorPower));
      //Formula for the multiplier, log base 14.4 of compressorpower 
    });
    
    console.log(minerInstances[1].production);
    
  }
}

export { Compressor1 };