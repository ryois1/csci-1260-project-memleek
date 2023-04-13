import { Miner } from '../m.js';
import { Miner7 } from './m7.js';

class Miner8 extends Miner {

  sacrificemult;

  lastsacrificequantity;

  constructor(_sacrificemult, _lastsacrificequantity, ...args) {
    super(...args);
    this.sacrificemult = _sacrificemult;
    this.lastsacrificequantity = _lastsacrificequantity;
    console.log("New Miner8 created");
  }

  genTick(miner7) {
    if (this.quantity > 0) {
      var NewMiner7quantity = this.quantity * this.production;
      miner7.quantity = miner7.quantity + NewMiner7quantity;
      return true;
    }
    else {
      return false;
    }
  }

  Sacrifice(minerInstances) {
    let sacrificequantity = minerInstances[0].quantity;
    //if sacrifice quantity is greater than previous sacrifice quantity, then they can sacrifice 
    //resets quantity of all lower miner tiers to 0, then increases the sacrifice multiplier according to a formula based on the number of 1st tier miners sacrificed

    console.log(minerInstances);


    let sacrificemult = this.sacrificemult + (Math.log(minerInstances[0].quantity - this.lastsacrificequantity)); //formula for increasing sacrifice multiplier based on log base 1000

    minerInstances.forEach(function (miner, i) {
      if (i < 7) {
        miner.quantity = 0;
      }
    });

    console.log(this);

    console.log(`This is the sac mult${this.sacrificemult}`);
    this.production = this.production * sacrificemult;
    //increase the requirement for the next sacrifice multiplier
    this.lastsacrificequantity = sacrificequantity;


  }



}

export { Miner8 };