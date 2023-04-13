import { IconMap } from "./Icons.js";

function save(data) {
    $("#localSaveState").html(IconMap["saving"]);
    localStorage.setItem("savedata", JSON.stringify(data));
    // Wait 1 second before changing the icon back
    setTimeout(function () {
        $("#localSaveState").html(IconMap["saved"]);
    }, 1000);
}

function load() {
    $("#localSaveState").html(IconMap["loading"]);
    const data = localStorage.getItem("savedata");
    if (data == null) {
        return null;
    }
    let output;
    try {
        output = JSON.parse(data);
    } catch (e) {
        console.log("Error parsing save data!");
        // Show toast
        Toastify({
            text: "Error parsing local save data!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)",
            }
        }).showToast();

        // Clear the save data
        localStorage.removeItem("savedata");

        // Try to load from server
        loadFromServer(localStorage.getItem('key'));


    }
    return output;
}

async function loadFromServer(key, minerInstances) {
    $("#cloudSaveState").html(IconMap["connecting"]);
    let clientID = localStorage.getItem('clientID');
    // See if save state is locked to another client
    isLocked(key, clientID).then((locked) => {
        if (locked) {
            console.log("Save state is locked to another client!");
            gameInitialized = false;
            gameLocked = true;
            $("#cloudSaveState").html(IconMap["cloud_locked"]);
            $("#cards").addClass("locked");
            $("#alert").addClass("visibleAlert");
            return;
        } else {
            console.log("Save state is not locked to another client!");
            // Get save state from server
            $.ajax({
                url: `${settings.cloudSyncBaseURL}/game_state/${key}`,
                type: 'GET',
                success: function (data) {
                    if (data.status == false) {
                        return;
                    }
                    console.log(`Loading save state from server:`);

                    // decode base64 string

                    const dataState = JSON.parse(atob(data.state));

                    // Store the key in localStorage
                    
                    localStorage.setItem('savedata', dataState);
                    cloudSyncSuccessfulSetup = true;


                    globalBytes = dataState.globalBytes;
                    minerInstances.forEach(function (miner, i) {
                        miner.id = dataState.minerInstances[i].id;
                        miner.quantity = dataState.minerInstances[i].quantity;
                        miner.buyCount = dataState.minerInstances[i].buyCount;
                        miner.cost = dataState.minerInstances[i].cost;
                        miner.production = dataState.minerInstances[i].production;
                        minerInstances[7].sacrificemultiplier = dataState.minerInstances[7].sacrificemultiplier;
                        minerInstances[7].lastsacrificequantity = dataState.minerInstances[7].lastsacrificequantity;
                        Prestige.globalCompressionPoints = dataState.globalCompressionPoints;
                        Prestige.globalCompressionLevel = dataState.globalCompressionLevel;
                        Prestige.globalCompressionCost = dataState.globalCompressionCost;
                        Prestige.globalCompressionMultiplier = dataState.globalCompressionMultiplier;
                    });

                    // Show toast
                    Toastify({
                        text: "Save state loaded!",
                        duration: 1000,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(90deg, rgba(0,50,0,1) 0%, rgba(0,193,58,1) 100%)",
                        }
                    }).showToast();
                    $("#cloudSaveState").html(IconMap["downloaded"]);
                    gameInitialized = true;
                },
                // if the request fails, display an error message
                error: function (data) {
                    console.log('Error: ' + data);
                    // Show toast
                    Toastify({
                        text: "Unable to get save state from server!",
                        duration: 3000,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)",
                        }
                    }).showToast();
                    $("#cloudSaveState").html(IconMap["error"]);
                }
            });
        }
    });
}


function saveToServer(key) {
    $("#cloudSaveState").html(IconMap["uploading"]);
    console.log("Saving to server...")
    let clientID = localStorage.getItem('clientID');
    if (!gameInitialized) {
        return;
    }
    $.ajax({
        url: `${settings.cloudSyncBaseURL}/game_state/${key}`,
        type: 'POST',
        data: { client_id: clientID, state: localStorage.getItem('savedata') },
        success: function () {
            // wait 1 second before changing the icon back
            setTimeout(function () {
                $("#cloudSaveState").html(IconMap["uploaded"]);
            }, 1000);
        },
        // if the request fails, display an error message
        error: function (data) {
            console.log('Error: ' + data);
            // Show toast
            Toastify({
                text: "Unable to send save state to server!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)",
                }
            }).showToast();
            $("#cloudSaveState").html(IconMap["upload_error"]);
        }
    });
}


function testLS() {
    if (typeof (Storage) !== "undefined") {
        console.log("localStorage is supported!");
    } else {
        // Sorry! No Web Storage support..
        alert("localStorage is not supported");
    }
}

export { save, load, testLS, loadFromServer, saveToServer }

function isLocked(key, clientID) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${settings.cloudSyncBaseURL}/game_state/${key}/lock`,
            data: { client_id: clientID },
            type: 'GET',
            success: function (data) {
                if ((data.client == clientID) || (data.client == null)) {
                    // Lock save state to this client
                    $.ajax({
                        url: `${settings.cloudSyncBaseURL}/game_state/${key}/lock/${clientID}`,
                        type: 'POST',
                        success: function (data) {
                            console.log(`Save state locked this client: ${clientID}`);
                            resolve(false);
                        },
                        // if the request fails, display an error message
                        error: function (data) {
                            console.log('Error: ' + data);
                            reject(true);
                        }
                    });
                }
                else {
                    console.log(`Save state locked by client: ${data.client}`);
                    // Show toast
                    Toastify({
                        text: "Save state locked by another client!",
                        duration: 3000,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)",
                        }
                    }).showToast();
                    resolve(true);
                }
            },
            // if the request fails, display an error message
            error: function (data) {
                console.log('Error: ' + data);
                // Show toast
                Toastify({
                    text: "Unable to get save state from server!",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)",
                    }
                }).showToast();
                resolve(true);
            }
        });
    });
}