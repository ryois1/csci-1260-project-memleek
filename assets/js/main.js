// Main Page
// Import the classes
import { Miner1, Miner2, Miner3, Miner4, Miner5, Miner6, Miner7, Miner8 } from './classes/miners/index.js';
import { formatBytes } from './utils/Format.js';

// Create the miners
const miner1 = new Miner1(1, 1, 10, 1, 0 );
const miner2 = new Miner2(1, 1, 1e+3, 0, 0 );
const miner3 = new Miner3(1, 1, 1e+5, 0, 0 );
const miner4 = new Miner4(1, 1, 1e+7, 0, 0 );
const miner5 = new Miner5(1, 1, 1e+10, 0, 0 );
const miner6 = new Miner6(1, 1, 1e+14, 0, 0 );
const miner7 = new Miner7(1, 1, 1e+19, 0, 0 );
const miner8 = new Miner8(1, 1, 1e+25, 0, 0 );


function GameTick(){
    miner1.genTick();
    miner2.genTick(miner1);
    miner3.genTick(miner2);
    miner4.genTick(miner3);
    miner5.genTick(miner4);
    miner6.genTick(miner5);
    miner7.genTick(miner6);
    miner8.genTick(miner7);
}

// Run the game tick every second
setInterval(GameTick, gameTickSpeed);

// Update the UI every 100ms
setInterval(() => {
    $("#bytes").html(`${formatBytes(globalBytes)}`);
}, UITick);