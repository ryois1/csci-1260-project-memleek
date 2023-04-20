import { IconMap } from "./Icons.js";
import { validateState, validateStateJSON } from "./ValidateState.js";

function save(data) {
    $("#localSaveState").html(IconMap["saving"]);
    if(validateState(JSON.stringify(data))){
        localStorage.setItem("savedata", JSON.stringify(data));
        // Wait 1 second before changing the icon back
        setTimeout(function () {
            $("#localSaveState").html(IconMap["saved"]);
        }, 1000);
    } else {
        console.log("Error saving local save state!");
        return;
    }
}

function load() {
    $("#localSaveState").html(IconMap["loading"]);
    const data = localStorage.getItem("savedata");
    if(validateState(data)){
        let output;
        try {
            output = JSON.parse(data);
        } catch (e) {
            console.log("Error parsing save data!");
            // Show toast
            showNotification("Error parsing local save data!", 3000, "rgba(253,29,29,1)", "rgba(252,176,69,1)");

            // Clear the save data
            localStorage.removeItem("savedata");

            // Try to load from server

            loadFromServer(localStorage.getItem('key'));
            
        }
        return output;
    } else {
        console.log("Error loading local save state! Trying to load from server...");
        try {
            loadFromServer(localStorage.getItem('key'));
        } catch (e) {
            console.log("Error loading from server!");
        }
        return;
    }
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

                    const currentLocalSave = localStorage.getItem('savedata');

                    if (currentLocalSave != null) {
                        if(validateState(currentLocalSave)){
                            const currentLocalSaveState = JSON.parse(currentLocalSave);
                            
                        if (currentLocalSaveState.lastSave > dataState.lastSave) {
                            console.log("Local save state is newer than server save state!");
                            console.log("Saving local save state to server...");
                            saveToServer(saveKey);
                            return;
                        }
                        } else {
                            console.log("Error parsing local save state!");
                        }
                    }
                    // Store the key in localStorage
                    
                    localStorage.setItem('savedata', dataState);
                    cloudSyncSuccessfulSetup = true;


                    globalBytes = dataState.globalBytes;
                    minerInstances[7].sacrificemultiplier = dataState.minerInstances[7].sacrificemultiplier;
                    minerInstances[7].lastsacrificequantity = dataState.minerInstances[7].lastsacrificequantity;
                    window.boost.buyCount = dataState.boosts.buyCount;
                    window.boost.cost = dataState.boosts.cost;
                    window.boost.multiplier = dataState.boosts.multiplier;
                    window.boost.quantity = dataState.boosts.quantity;

                    minerInstances.forEach(function (miner, i) {
                        miner.id = dataState.minerInstances[i].id;
                        miner.quantity = dataState.minerInstances[i].quantity;
                        miner.buyCount = dataState.minerInstances[i].buyCount;
                        miner.cost = dataState.minerInstances[i].cost;
                        miner.production = dataState.minerInstances[i].production;

                        // Prestige.globalCompressionPoints = dataState.globalCompressionPoints;
                        // Prestige.globalCompressionLevel = dataState.globalCompressionLevel;
                        // Prestige.globalCompressionCost = dataState.globalCompressionCost;
                        // Prestige.globalCompressionMultiplier = dataState.globalCompressionMultiplier;
                    });

                    // Show toast
                    showNotification("Save state loaded!", 1000, "rgba(0,50,0,1)", "rgba(0,193,58,1)");
                    $("#cloudSaveState").html(IconMap["downloaded"]);
                    gameInitialized = true;
                },
                // if the request fails, display an error message
                error: function (data) {
                    console.log('Error: ' + data);
                    // Show toast
                    showNotification("Unable to get save state from server!", 3000, "rgba(253,29,29,1)", "rgba(252,176,69,1)");
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
        success: async function (response) {
            if(response.status == false){
                switch(response.error.code){
                    case "ER_NO_REFERENCED_ROW_2":
                        console.log("No save key found on server!");
                        // Show toast
                        showNotification("No save key found on server! Getting new one.", 3000, "rgba(253,29,29,1)", "rgba(252,176,69,1)");
                        $("#cloudSaveState").html(IconMap["upload_error"]);

                        const saveKeyFromServer = await getKeyFromServer();
                        $('#saveKey').html(`<code>${saveKeyFromServer}</code>`);
                        saveKey = saveKeyFromServer;
                        localStorage.setItem('key', saveKeyFromServer);

                        return;
                    case "ER_DUP_ENTRY":
                        console.log("Save state is locked to another client!");
                        // Show toast
                        showNotification("Save state is locked to another client!", 3000, "rgba(253,29,29,1)", "rgba(252,176,69,1)");
                        $("#cloudSaveState").html(IconMap["upload_error"]);
                        return;
                    default:
                        console.log("Unknown error!" + response.error.code);
                        // Show toast
                        showNotification("Error saving to server!", 3000, "rgba(253,29,29,1)", "rgba(252,176,69,1)");
                        $("#cloudSaveState").html(IconMap["upload_error"]);
                        return;
                }
            }
            // wait 1 second before changing the icon back
            setTimeout(function () {
                $("#cloudSaveState").html(IconMap["uploaded"]);
            }, 1000);
        },
        // if the request fails, display an error message
        error: function (data) {
            console.log('Error: ' + data);
            // Show toast
            showNotification("Unable to send save state to server!", 3000, "rgba(253,29,29,1)", "rgba(252,176,69,1)");
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
                    showNotification("Save state locked by another client!", 3000, "rgba(253,29,29,1)", "rgba(252,176,69,1)");
                    resolve(true);
                }
            },
            // if the request fails, display an error message
            error: function (data) {
                console.log('Error: ' + data);
                // Show toast
                showNotification("Unable to get save state from server!", 3000, "rgba(253,29,29,1)", "rgba(252,176,69,1)");
                resolve(true);
            }
        });
    });
}

async function getKeyFromServer() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${settings.cloudSyncBaseURL}/key`,
            type: 'POST',
            success: function (data) {
                resolve(data.key);
            },
            // if the request fails, display an error message
            error: function (data) {
                console.log('Error: ' + data);
                reject(data);
            }
        });
    });
}