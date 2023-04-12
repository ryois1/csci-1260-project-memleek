// Main Page
// Import the classes
import { Miner1, Miner2, Miner3, Miner4, Miner5, Miner6, Miner7, Miner8 } from './classes/miners/index.js';
import { formatBytes, updateBytes } from './utils/Format.js';
import { miners } from './miners.js';
import { save, load, testLS, saveToServer } from './utils/SaveState.js';

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
    if(!gameInitialized) {
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
    console.log(`Trying to buy ${miner}...`);
    try {
        const target = eval(miner);
        if (globalBytes >= target.cost) {
            target.buy(); // Buy the miner
            drawCards();
            const tooltip = bootstrap.Tooltip.getInstance(`#miner${target.id}-btn`);
            tooltip.setContent({ '.tooltip-inner': `Bought: ${target.buyCount}` })
        } else {
            console.log("Not enough bytes!");
            Toastify({
                text: "Not enough bytes!",
                duration: 3000,
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
    localStorage.removeItem("saveState");
    location.reload();
}

// Load the save state
const saveState = load();
if (saveState) {
    globalBytes = saveState.globalBytes;
    minerInstances.forEach(function (miner, i) {
        miner.id = saveState.minerInstances[i].id;
        miner.quantity = saveState.minerInstances[i].quantity;
        miner.buyCount = saveState.minerInstances[i].buyCount;
        miner.cost = saveState.minerInstances[i].cost;
    });
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

// Run the game tick every second
setInterval(GameTick, gameTickSpeed);

// Update the UI every 100ms
setInterval(() => {
    updateBytes(globalBytes);
    drawCards();
}, UITick);

setInterval(() => {
    saveToServer(saveKey);
}, cloudSyncSpeed);

miners.forEach(function (miner, i) {
    $("#miners").append(`<div class="card text-white bg-dark miner" style="width: 256px;">
        <img class="card-img-top miner-img" src="/assets/images/${miner.image}">
        <div class="card-body text-center" id="${miner.id}">
            <button class="btn btn-outline-primary" id="${miner.id}-btn" onclick="BuyMiner('${miner.id}');" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Bought: ${minerInstances[i].buyCount}">Buy ${miner.name}</button>
            <p class="card-text" id="${miner.id}-qty">Quantity: ${minerInstances[i].quantity}</p>
            <p class="card-text" id="${miner.id}-cost">Cost: ${formatBytes(miner.cost)}</p>
            <span>${miner.description}</span>
        </div>
    </div>`);
});

window.BuyMiner = BuyMiner; // Make the BuyMiner function global
window.ResetState = ResetState; // Make the ResetState function global
window.AddBytes = AddBytes; // Make the AddBytes function global
window.RemoveBytes = RemoveBytes; // Make the RemoveBytes function global

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function drawCards() {
    minerInstances.forEach(function (miner, i) {
        $(`#miner${miner.id}-btn`).data('bs-title', `Bought: ${miner.buyCount}`);
        $(`#miner${miner.id}-qty`).html(`Quantity: ${miner.quantity}`);
        $(`#miner${miner.id}-cost`).html(`Cost: ${formatBytes(miner.cost)}`);
        if (globalBytes >= miner.cost) {
            $(`#miner${miner.id}-btn`).removeClass("cannotBuy") // Enough bytes to buy
        } else {
            $(`#miner${miner.id}-btn`).addClass("cannotBuy"); // Not enough bytes to buy
        }
    });
}


// on keypress event handler
// Hotkeys

function keypress(e) {
    switch(e.key) {
        case "1":
            BuyMiner("miner1");
            break;
        case "2":
            BuyMiner("miner2");
            break;
        case "3":
            BuyMiner("miner3");
            break;
        case "4":
            BuyMiner("miner4");
            break;
        case "5":
            BuyMiner("miner5");
            break;
        case "6":
            BuyMiner("miner6");
            break;
        case "7":
            BuyMiner("miner7");
            break;
        case "8":
            BuyMiner("miner8");
            break;
        default:
            break;
    }
};

// add event listener
$(document).on("keypress", keypress);

// Connect to WebSocket with the server via regular WS
const socket = new WebSocket(`wss://memleek-sync.ryois.net`);

// When the socket is opened, send the save key and client ID
socket.onopen = function (e) {
    socket.send(JSON.stringify({
        type: "auth",
        payload: {
            saveKey: saveKey,
            clientID: localStorage.getItem("clientID")
        }
    }));

};

// When the socket receives a message, parse it and handle it
socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    switch (data.type) {
        case "auth":
            console.log(`Authenticated with server!`);
            break;
        case "heartbeat":
            if(data.message.status === "SYN") {
            socket.send(JSON.stringify({ type: "heartbeat", payload: { status: "SYN-ACK", clientID: localStorage.getItem("clientID"), key: saveKey } }));
            }
            else if (data.message.status === "SYN-ACK") {
                console.log("Heartbeat ACK'd");
            }
        default:
            break;
    }
};