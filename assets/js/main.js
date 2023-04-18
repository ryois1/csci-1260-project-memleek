// Main Page
// Import the classes
import { Miner1, Miner2, Miner3, Miner4, Miner5, Miner6, Miner7, Miner8 } from './classes/m/index.js';
// import { Compressor1, Compressor2, Compressor3, Compressor4, Compressor5, Compressor6, Compressor7, Compressor8 } from './classes/prestiges/compressors/index.js';
import { formatBytes, updateBytes, smoothUpdateMainDisplay } from './utils/Format.js';
import { miners } from './m_def.js';
import { save, load, testLS, saveToServer, loadFromServer } from './utils/SaveState.js';
import { drawCards, updateCards, drawCheats } from './utils/DrawUI.js';
import { Boosts } from "./classes/prestiges/boosts.js";

testLS();


// Create the miners

let miner1 = new Miner1(1, 1, 10, 0, 0);
let miner2 = new Miner2(2, 1, 1e+3, 0, 0);
let miner3 = new Miner3(3, 1, 1e+5, 0, 0);
let miner4 = new Miner4(4, 1, 1e+7, 0, 0);
let miner5 = new Miner5(5, 1, 1e+10, 0, 0);
let miner6 = new Miner6(6, 1, 1e+14, 0, 0);
let miner7 = new Miner7(7, 1, 1e+19, 0, 0);
let miner8 = new Miner8(1, 0, 8, 1, 1e+25, 0, 0,);

//create the compressors
// 1 before the id nummber to show its for layer 1


/*
let compressor1 = new Compressor1(11, 1, 1, 0, 0);
let compressor2 = new Compressor2(12, 1, 1e+2, 0, 0);
let compressor3 = new Compressor3(13, 1, 1e+5, 0, 0);
let compressor4 = new Compressor4(14, 1, 1e+10, 0, 0);
let compressor5 = new Compressor5(15, 1, 1e+20, 0, 0);
let compressor6 = new Compressor6(16, 1, 1e+30, 0, 0);
let compressor7 = new Compressor7(17, 1, 1e+40, 0, 0);
let compressor8 = new Compressor8(18, 1, 1e+80, 0, 0);
*/
//The compressors break the main game, so they are disabled for now


const minerInstances = [
    miner1,
    miner2,
    miner3,
    miner4,
    miner5,
    miner6,
    miner7,
    miner8
];

/*
const compressorInstances = [
    compressor1,
    compressor2,
    compressor3,
    compressor4,
    compressor5,
    compressor6,
    compressor7,
    compressor8
];
*/

const boost = new Boosts(1e+19, 0, 1, 0);

function GameTick() {
    if (!gameInitialized) {
        return;
    }
    const successfulTicks = [];

    successfulTicks.push(miner1.genTick());
    successfulTicks.push(miner2.genTick(miner1));
    successfulTicks.push(miner3.genTick(miner2));
    successfulTicks.push(miner4.genTick(miner3));
    successfulTicks.push(miner5.genTick(miner4));
    successfulTicks.push(miner6.genTick(miner5));
    successfulTicks.push(miner7.genTick(miner6));
    successfulTicks.push(miner8.genTick(miner7));

    if (miner1.quantity > miner8.lastsacrificequantity && miner8.quantity != 0) {
        $("#sacrificeBtn").show();
    }
    else {
        $("#sacrificeBtn").hide();
    }
    const lastSacrifice = miner8.lastsacrificequantity
    console.log(`Running Miners [1-8]: ${JSON.stringify(successfulTicks)}`);
    const data = {
        globalBytes: globalBytes,
        minerInstances: minerInstances,
        lastsacrificequantity: lastSacrifice,
        lastSave: Date.now()
    }
    //show/hide boost button
    if (globalBytes >= 1e+19 || miner8.quantity > 0) {
        $("#boostBtn").show();
    }
    else {
        $("#boostBtn").hide();
    }
    save(data);
}

function BuyMiner(miner) {
    try {
        const target = eval(miner);
        if (globalBytes >= target.cost) {
            target.buy(); // Buy the miner
            updateCards(minerInstances);
            const tooltip = bootstrap.Tooltip.getInstance(`#miner${target.id}-btn`);
            tooltip.setContent({ '.tooltip-inner': `Bought: ${target.buyCount}` })
        } else {
            Toastify({
                text: "Not enough bytes!",
                duration: 1000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)",
                }
            }).showToast();
        }
    } catch (e) {
        console.log(e);
    }
}

function Buy10Miner(miner) {
    try {
        const target = eval(miner);
        if (globalBytes >= target.cost * target.quantity) {
            target.buyTen(); // Buy ten miners
            updateCards(minerInstances);
            const tooltip = bootstrap.Tooltip.getInstance(`#miner${target.id}-btn`);
            tooltip.setContent({ '.tooltip-inner': `Bought: ${target.buyCount}` })
        } else {
            Toastify({
                text: "Not enough bytes!",
                duration: 1000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)",
                }
            }).showToast();
        }
    } catch (e) {
        console.log(e);
    }
}


function ResetState() {
    localStorage.removeItem("savedata");
    localStorage.removeItem("key");
    location.reload();
    globalBytes = 10;
    localStorage.removeItem("savedata");
    localStorage.removeItem("key");
}

// Load the save state
try {
    const saveState = load();
    if (saveState) {
        globalBytes = saveState.globalBytes;
        minerInstances.forEach(function (miner, i) {
            miner.id = saveState.minerInstances[i].id;
            miner.quantity = saveState.minerInstances[i].quantity;
            miner.buyCount = saveState.minerInstances[i].buyCount;
            miner.cost = saveState.minerInstances[i].cost;
            miner.production = saveState.minerInstances[i].production;
            compressorInstances.forEach(function (compressor, i) {
                compressor.id = saveState.compressorInstances[i].id;
                compressor.quantity = saveState.compressorInstances[i].quantity;
                compressor.buyCount = saveState.compressorInstances[i].buyCount;
                compressor.cost = saveState.compressorInstances[i].cost;
                compressor.production = saveState.compressorInstances[i].production;
            });



        });
        miner8.lastsacrificequantity = saveState.lastsacrificequantity;
        Boosts.quantity = saveState.boostsquantity;
        Boosts.cost = saveState.boostscost;
        Boosts.production = saveState.boostsproduction;
        Boosts.buyCount = saveState.boostsbuyCount;
    }
} catch (e) {
    console.log(e);
    loadFromServer(saveKey, minerInstances);
}


function AddBytes(bytes) {
    globalBytes += bytes;
}

function RemoveBytes(bytes) {
    if (globalBytes - bytes < 0) {
        globalBytes = 0;
        return;
    }
    globalBytes -= bytes;
}


// Run the game tick based on the gameTickSpeed (default: 1s)
setInterval(GameTick, settings.gameTickSpeed);


// Update the UI based on the UITick (default: 100ms)
setInterval(() => {
    updateBytes(globalBytes);
    updateCards(minerInstances);
}, settings.UITick);


// Save to the cloud based on the cloudSyncSpeed (default: 5s)
setInterval(() => {
    saveToServer(saveKey);
}, settings.cloudSyncSpeed);


// Make the functions global
window.BuyMiner = BuyMiner; // Make the BuyMiner function global
window.ResetState = ResetState; // Make the ResetState function global
window.AddBytes = AddBytes; // Make the AddBytes function global
window.RemoveBytes = RemoveBytes; // Make the RemoveBytes function global
window.minerInstances = minerInstances; // Make the minerInstances array global
window.boost = boost;

// Draw the UI
drawCards(miners, minerInstances);
drawCheats();


// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))