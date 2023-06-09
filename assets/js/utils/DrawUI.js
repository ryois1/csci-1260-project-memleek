import { formatBytes } from "./Format.js";

function drawCards(minersJS, minerInstances) {


    minersJS.forEach(function (miner, i) {
        $("#miners").append(`<div class="card text-white bg-dark miner text-center">
        <h4 class="miner-name">${miner.name}</h4>
            ${miner.url ? `<a href="${miner.url}" target="_blank">` : ''}<img class="card-img-top miner-img" src="/assets/images/${miner.image}">${miner.url ? '</a>' : ''}
            <div class="card-body text-center" id="${miner.id}">
                <button class="btn btn-outline-primary" id="${miner.id}-btn" onclick="BuyMiner('${miner.id}');" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Bought: ${minerInstances[i].buyCount}">${((miner.cost > 1.00E+24) && settings.notation == 'scientific') ? miner.cost.toExponential(2) : formatBytes(miner.cost)}</button>
                <p class="card-text" id="${miner.id}-qty">Quantity: ${minerInstances[i].quantity.toExponential(2)}x</p>
                <p class="card-text" id="${miner.id}-text">Production: ${(settings.notation == 'scientific') ? minerInstances[i].production : minerInstances[i].production }</p>
                <span>${miner.description}</span>
            </div>
            <div class="card-footer text-muted d-flex d-flex justify-content-between">
                <button type="button" class="btn btn-outline-success" onclick="minerInstances[${i}].buyTen()">+10</button><button type="button" class="btn btn-outline-success" onclick="minerInstances[${i}].buyMax()">+Max</button>
            </div>
        </div>`);
    });
}

function updateCards(minerInstances) {
    minerInstances.forEach(function (miner, i) {
        var title = `Bought: ${miner.buyCount}`;
        var quantity = miner.quantity;
        var cost = formatBytes(miner.cost);
        var production = miner.production;
        switch(settings.notation) {
            case "scientific":
                if (miner.quantity > 1.00E+4) {
                    quantity = quantity.toExponential(2);
                    cost = miner.cost.toExponential(2) + ' bytes';
                }
                break;
            default:
                if (miner.cost > 1.00E+27 && miner.quantity > 1.00E+4) {
                    quantity = quantity.toExponential(2);
                    cost = miner.cost.toExponential(2) + ' bytes';
                }
        }
        $(`#miner${miner.id}-btn`).data('bs-title', title);
        $(`#miner${miner.id}-btn`).html(cost);
        $(`#miner${miner.id}-qty`).html(`Quantity: ${quantity}`);
        $(`#miner${miner.id}-text`).html(`Production: ${production}x`);
        if (globalBytes >= miner.cost) {
            $(`#miner${miner.id}-btn`).removeClass("cannotBuy");
        } else {
            $(`#miner${miner.id}-btn`).addClass("cannotBuy");
        }
    });

}


function drawCheats() {
    // get if url has ?cheats=true
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('cheats') == 'true') {
        $("#dev-opts").show();
        for (let i = 0; i < 9; i++) {
            $("#cheatsAddBtns").append(`<button class="btn btn-outline-primary btn-cheat" onclick="AddBytes(1e+${Math.floor(Math.pow(i, 2.75))})">1e${Math.floor(Math.pow(i, 2.75))} Bytes</button>`); // Add the add bytes buttons
            $("#cheatsRemoveBtns").append(`<button class="btn btn-outline-danger btn-cheat" onclick="RemoveBytes(1e+${Math.floor(Math.pow(i, 2.75))})">-1e${Math.floor(Math.pow(i, 2.75))} Bytes</button>`); // Add the remove bytes buttons
        }
    } else {
        $("#dev-opts").remove();
    }
}

function updateBtns(){
    $('#boostBtn').html(`Boost Cost: ${window.boost.cost.toExponential(2).replace('+','')}`);
    window.minerInstances.forEach((miner, i) => {
        var title = `Bought: ${miner.buyCount}`;
        $(`#miner${miner.id}-btn`).data('bs-title', title);
    });
}

export { drawCards, updateCards, drawCheats, updateBtns };