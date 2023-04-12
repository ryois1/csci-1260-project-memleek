// Main Page
// Import the classes
import { Miner1, Miner2, Miner3, Miner4, Miner5, Miner6, Miner7, Miner8 } from './classes/miners/index.js';
import { formatBytes, updateBytes } from './utils/Format.js';
import { miners } from './miners.js';
import { save, load, testLS, saveToServer, loadFromServer } from './utils/SaveState.js';
import { drawCards, updateCards, drawCheats } from './utils/DrawUI.js';

testLS();

// Create the miners

const miner1 = new Miner1(1, 1, 10, 0, 0);
const miner2 = new Miner2(2, 1, 1e+3, 0, 0);
const miner3 = new Miner3(3, 1, 1e+5, 0, 0);
const miner4 = new Miner4(4, 1, 1e+7, 0, 0);
const miner5 = new Miner5(5, 1, 1e+10, 0, 0);
const miner6 = new Miner6(6, 1, 1e+14, 0, 0);
const miner7 = new Miner7(7, 1, 1e+19, 0, 0);
const miner8 = new Miner8(8, 1, 1e+25, 0, 0);

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

globalBytes = 10;

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

    console.log(`Running Miners [1-8]: ${JSON.stringify(successfulTicks)}`);
    const data = {
        globalBytes: globalBytes,
        minerInstances: minerInstances
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

function ResetState() {
    localStorage.removeItem("savedata");
    localStorage.removeItem("key");
    location.reload();
    globalBytes = 10;
}

// Load the save state
try {
    const saveState = load();
    if (saveState) {
        console.log(saveState);
        globalBytes = saveState.globalBytes;
        minerInstances.forEach(function (miner, i) {
            miner.id = saveState.minerInstances[i].id;
            miner.quantity = saveState.minerInstances[i].quantity;
            miner.buyCount = saveState.minerInstances[i].buyCount;
            miner.cost = saveState.minerInstances[i].cost;
        });
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
setInterval(GameTick, gameTickSpeed);


// Update the UI based on the UITick (default: 100ms)
setInterval(() => {
    updateBytes(globalBytes);
    updateCards(minerInstances);
}, UITick);


// Save to the cloud based on the cloudSyncSpeed (default: 5s)
setInterval(() => {
    saveToServer(saveKey);
}, cloudSyncSpeed);


// Draw the UI
drawCards(miners, minerInstances);
drawCheats();


// Make the functions global
window.BuyMiner = BuyMiner; // Make the BuyMiner function global
window.ResetState = ResetState; // Make the ResetState function global
window.AddBytes = AddBytes; // Make the AddBytes function global
window.RemoveBytes = RemoveBytes; // Make the RemoveBytes function global
window.minerInstances = minerInstances; // Make the minerInstances array global


// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))