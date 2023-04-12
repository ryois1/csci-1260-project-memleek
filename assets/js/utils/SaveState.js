function save(data) {
    // console.log(`Saving Data: ${JSON.stringify(data)}`);
    localStorage.setItem("savedata", JSON.stringify(data));
    $("#localSaveState").html("Saved");
}

function load() {
    const data = localStorage.getItem("savedata");
    if (data == null) {
        return null;
    }
    // console.log(`Loading Data: ${JSON.stringify(data)}`);
    return JSON.parse(data);
}

async function loadFromServer(key) {
    let clientID = localStorage.getItem('clientID');
    // See if save state is locked to another client
    isLocked(key, clientID).then((locked) => {
        if (locked) {
            console.log("Save state is locked to another client!");
            gameInitialized = false;
            gameLocked = true;
            $("#cloudSaveState").html("Locked");
            $("#cards").addClass("locked");
            $("#resetButton").addClass("locked");
            $("#alert").addClass("visibleAlert");
            return;
        } else {
            console.log("Save state is not locked to another client!");
            // Get save state from server
            $.ajax({
                url: `https://memleek-sync.ryois.net/api/game_state/${key}`,
                type: 'GET',
                success: function (data) {
                    if (data.status == false) {
                        return;
                    }
                    console.log(`Loading save state from server: ${JSON.stringify(data)}`);
                    // Store the key in localStorage

                    // Decode from base64
                    const jsonData = JSON.stringify(data.state);
                    localStorage.setItem('savedata', jsonData);
                    cloudSyncSuccessfulSetup = true;
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
                }
            });
        }
    });
}


function saveToServer(key) {
    console.log("Saving to server...")
    let clientID = localStorage.getItem('clientID');
    if (!gameInitialized) {
        return;
    }
    $.ajax({
        url: `https://memleek-sync.ryois.net/api/game_state/${key}`,
        type: 'POST',
        data: { client_id: clientID, state: localStorage.getItem('savedata') },
        success: function () {
            $("#cloudSaveState").html("Saved");
            Toastify({
                text: "Save state sent to server!",
                duration: 1000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(90deg, rgba(0,50,0,1) 0%, rgba(0,193,58,1) 100%)",
                }
            }).showToast();
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
            url: `https://memleek-sync.ryois.net/api/game_state/${key}/lock`,
            data: { client_id: clientID },
            type: 'GET',
            success: function (data) {
                if ((data.client == clientID) || (data.client == null)) {
                    // Lock save state to this client
                    $.ajax({
                        url: `https://memleek-sync.ryois.net/api/game_state/${key}/lock/${clientID}`,
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