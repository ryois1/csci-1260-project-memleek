import { formatBytes } from "./Format.js";

function drawCards(minersJS, minerInstances){
    minersJS.forEach(function (miner, i) {
        $("#miners").append(`<div class="card text-white bg-dark miner">
            <img class="card-img-top miner-img" src="/assets/images/${miner.image}">
            <div class="card-body text-center" id="${miner.id}">
                <button class="btn btn-outline-primary" id="${miner.id}-btn" onclick="BuyMiner('${miner.id}');" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Bought: ${minerInstances[i].buyCount}">Buy ${miner.name}</button>
                <p class="card-text" id="${miner.id}-qty">Quantity: ${minerInstances[i].quantity}</p>
                <p class="card-text" id="${miner.id}-cost">Cost: ${formatBytes(miner.cost)}</p>
                <span>${miner.description}</span>
            </div>
        </div>`);
    });
}

function updateCards(minerInstances) {
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

function drawCheats(){
    for(let i = 0; i < 8; i++) {
        $("#cheatsAddBtns").append(`<button class="btn btn-outline-primary btn-cheat" onclick="AddBytes(1e+${Math.pow(i, 2)})">1e+${Math.pow(i, 2)} Bytes</button>`); // Add the add bytes buttons
        $("#cheatsRemoveBtns").append(`<button class="btn btn-outline-primary btn-cheat" onclick="RemoveBytes(1e+${Math.pow(i, 2)})">1e+${Math.pow(i, 2)} Bytes</button>`); // Add the remove bytes buttons
    }    
}

export { drawCards, updateCards, drawCheats };