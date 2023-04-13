import { formatBytes } from "./Format.js";

function drawCards(minersJS, minerInstances) {

    //  as of now there is no way for the user to set the notation, so it is set to the default case for now
    switch (settings.notation) {
        case "scientific":
            minersJS.forEach(function (miner, i) {
                $("#miners").append(`<div class="card text-white bg-dark miner text-center">
                <h4 class="miner-name">${miner.name}</h4>
                    ${miner.url ? `<a href="${miner.url}" target="_blank">` : ''}<img class="card-img-top miner-img" src="/assets/images/${miner.image}">${miner.url ? '</a>' : ''}
                    <div class="card-body text-center" id="${miner.id}">
                        <button class="btn btn-outline-primary" id="${miner.id}-btn" onclick="BuyMiner('${miner.id}');" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Bought: ${minerInstances[i].buyCount}">${miner.cost.toExponential(2).replace("+", "")}</button>
                        <p class="card-text" id="${miner.id}-qty">Quantity: ${minerInstances[i].quantity.toExponential(2).replace("+", "") + 'x'}</p>
                        <p class="card-text" id="${miner.id}-text">Production: ${minerInstances[i].production.toExponential(2).replace("+","")}x</p>
                        <span>${miner.description}</span>
                    </div>
                    <div class="card-footer text-muted d-flex d-flex justify-content-between">
                        <button type="button" class="btn btn-outline-success" onclick="minerInstances[${i}].buyTen()">+10</button><button type="button" class="btn btn-outline-success" onclick="minerInstances[${i}].buyMax()">+Max</button>
                    </div>
                </div>`);
            });
            break;
        default:
            minersJS.forEach(function (miner, i) {
                $("#miners").append(`<div class="card text-white bg-dark miner text-center">
                <h4 class="miner-name">${miner.name}</h4>
                    ${miner.url ? `<a href="${miner.url}" target="_blank">` : ''}<img class="card-img-top miner-img" src="/assets/images/${miner.image}">${miner.url ? '</a>' : ''}
                    <div class="card-body text-center" id="${miner.id}">
                        <button class="btn btn-outline-primary" id="${miner.id}-btn" onclick="BuyMiner('${miner.id}');" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Bought: ${minerInstances[i].buyCount}">${miner.cost > 1.00E+24 ? miner.cost.toExponential(2).replace("+", "") : formatBytes(miner.cost)}</button>
                        <p class="card-text" id="${miner.id}-qty">Quantity: ${minerInstances[i].quantity.toExponential(2).replace("+", "")}x</p>
                        <p class="card-text" id="${miner.id}-text">Production: ${minerInstances[i].production}</p>
                        <span>${miner.description}</span>
                    </div>
                    <div class="card-footer text-muted d-flex d-flex justify-content-between">
                        <button type="button" class="btn btn-outline-success" onclick="minerInstances[${i}].buyTen()">+10</button><button type="button" class="btn btn-outline-success" onclick="minerInstances[${i}].buyMax()">+Max</button>
                    </div>
                </div>`);
            });
    }

}

function updateCards(minerInstances) {
    minerInstances.forEach(function (miner, i) {
        var title = `Bought: ${miner.buyCount}`;
        var quantity = miner.quantity;
        var cost = formatBytes(miner.cost);
        var production = miner.production.toExponential(2).replace("+","");
        switch(settings.notation) {
            case "scientific":
                if (miner.quantity > 1.00E+4) {
                    quantity = quantity.toExponential(2).replace("+", "");
                    cost = miner.cost.toExponential(2).replace("+", "") + ' bytes';
                }
                break;
            default:
                if (miner.cost > 1.00E+27 && miner.quantity > 1.00E+4) {
                    quantity = quantity.toExponential(2).replace("+", "");
                    cost = miner.cost.toExponential(2).replace("+", "") + ' bytes';
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

/*
function updateCards(minerInstances) {

    switch (settings.notation) {
        case "scientific":
            minerInstances.forEach(function (miner, i) {
                if (miner.quantity > 1.00E+4) {
                    $(`#miner${miner.id}-btn`).data('bs-title', `Bought: ${miner.buyCount}`);
                    $(`#miner${miner.id}-btn`).html(`${miner.cost.toExponential(2).replace("+", "") + ' bytes'}x`);
                    $(`#miner${miner.id}-qty`).html(`Quantity: ${miner.quantity.toExponential(2).replace("+", "")}`);
                    $(`#miner${miner.id}-text`).html(`Production: ${miner.production.toExponential(2).replace("+","")}x`);
                    if (globalBytes >= miner.cost) {
                        $(`#miner${miner.id}-btn`).removeClass("cannotBuy") // Enough bytes to buy
                    }
                    else {
                        $(`#miner${miner.id}-btn`).addClass("cannotBuy"); // Not enough bytes to buy
                    }
                }
                else {
                    $(`#miner${miner.id}-btn`).data('bs-title', `Bought: ${miner.buyCount}`);
                    $(`#miner${miner.id}-btn`).html(`${miner.cost.toExponential(2).replace("+", "") + ' bytes'}x`);
                    $(`#miner${miner.id}-qty`).html(`Quantity: ${miner.quantity}`);
                    $(`#miner${miner.id}-text`).html(`Production: ${miner.production.toExponential(2).replace("+","")}x`);
                    if (globalBytes >= miner.cost) {
                        $(`#miner${miner.id}-btn`).removeClass("cannotBuy") // Enough bytes to buy
                    }
                    else {
                        $(`#miner${miner.id}-btn`).addClass("cannotBuy"); // Not enough bytes to buy
                    }
                }
            });
            break;
        default:

            minerInstances.forEach(function (miner, i) {

                if (miner.cost > 1.00E+27) {

                    if (miner.quantity > 1.00E+4) {
                        $(`#miner${miner.id}-btn`).data('bs-title', `Bought: ${miner.buyCount}`);
                        $(`#miner${miner.id}-btn`).html(`${miner.cost.toExponential(2).replace("+", "") + ' bytes'}`);
                        $(`#miner${miner.id}-qty`).html(`Quantity: ${miner.quantity.toExponential(2).replace("+", "")}`);
                        $(`#miner${miner.id}-text`).html(`Production: ${miner.production.toExponential(2).replace("+","")}x`);
                        if (globalBytes >= miner.cost) {
                            $(`#miner${miner.id}-btn`).removeClass("cannotBuy") // Enough bytes to buy
                        }
                        else {
                            $(`#miner${miner.id}-btn`).addClass("cannotBuy"); // Not enough bytes to buy
                        }
                    }
                    else {
                        $(`#miner${miner.id}-btn`).data('bs-title', `Bought: ${miner.buyCount}`);
                        $(`#miner${miner.id}-btn`).html(`${miner.cost.toExponential(2).replace("+", "") + ' bytes'}`);
                        $(`#miner${miner.id}-qty`).html(`Quantity: ${miner.quantity}`);
                        $(`#miner${miner.id}-text`).html(`Production: ${miner.production.toExponential(2).replace("+","")}x`);
                        if (globalBytes >= miner.cost) {
                            $(`#miner${miner.id}-btn`).removeClass("cannotBuy") // Enough bytes to buy
                        }
                        else {
                            $(`#miner${miner.id}-btn`).addClass("cannotBuy"); // Not enough bytes to buy
                        }
                    }
                } else {
                    if (miner.quantity > 1.00E+4) {
                        $(`#miner${miner.id}-btn`).data('bs-title', `Bought: ${miner.buyCount}`);
                        $(`#miner${miner.id}-btn`).html(`${formatBytes(miner.cost)}`);
                        $(`#miner${miner.id}-qty`).html(`Quantity: ${miner.quantity.toExponential(2).replace("+", "") + ' bytes'}`);
                        $(`#miner${miner.id}-text`).html(`Production: ${miner.production.toExponential(2).replace("+","")}x`);
                        if (globalBytes >= miner.cost) {
                            $(`#miner${miner.id}-btn`).removeClass("cannotBuy") // Enough bytes to buy
                        }
                        else {
                            $(`#miner${miner.id}-btn`).addClass("cannotBuy"); // Not enough bytes to buy
                        }
                    }
                    else {
                        $(`#miner${miner.id}-btn`).data('bs-title', `Bought: ${miner.buyCount}`);
                        $(`#miner${miner.id}-btn`).html(`${formatBytes(miner.cost)}`);
                        $(`#miner${miner.id}-qty`).html(`Quantity: ${miner.quantity}`);
                        $(`#miner${miner.id}-text`).html(`Production: ${miner.production.toExponential(2).replace("+","")}x`);
                        if (globalBytes >= miner.cost) {
                            $(`#miner${miner.id}-btn`).removeClass("cannotBuy") // Enough bytes to buy
                        }
                        else {
                            $(`#miner${miner.id}-btn`).addClass("cannotBuy"); // Not enough bytes to buy
                        }
                    }
                }

            });

            break;
    }
}*/


function drawCheats() {
    for (let i = 0; i < 9; i++) {
        $("#cheatsAddBtns").append(`<button class="btn btn-outline-primary btn-cheat" onclick="AddBytes(1e+${Math.floor(Math.pow(i, 2.75))})">1e${Math.floor(Math.pow(i, 2.75))} Bytes</button>`); // Add the add bytes buttons
        $("#cheatsRemoveBtns").append(`<button class="btn btn-outline-danger btn-cheat" onclick="RemoveBytes(1e+${Math.floor(Math.pow(i, 2.75))})">-1e${Math.floor(Math.pow(i, 2.75))} Bytes</button>`); // Add the remove bytes buttons
    }
}

export { drawCards, updateCards, drawCheats };