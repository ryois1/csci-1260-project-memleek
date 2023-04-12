// Document ready function jQuery
import { loadFromServer } from './utils/SaveState.js';

$(document).ready(async function () {
    // check to see if localStorage has a clientID
    if (localStorage.getItem('clientID') === null) {
        // if not, generate a new one
        const client_ID = await getClientIDFromServer();
        localStorage.setItem('clientID', client_ID);
    }

    // check to see if localStorage has a key
    if (localStorage.getItem('key') === null) {

        let tempNewKey;
        $("#newUserModal").show();

        $("#useExistingKey").click(function () {
            $("#newUserModal").hide();
            $("#existingUserModal").show();
        });

        $("#useNewKey").click(async function () {
            tempNewKey = await getKeyFromServer();
            $("#showKeyForCopy").html(`Save Key: <code>${tempNewKey}</code>`);
            $("#newUserModal").hide();
            $("#newKeyModal").show();
        });

        $("#saveExistingKey").click(function () {
            $("#existingUserModal").hide();
            // Get key from input
            let saveKeyInput = $("#existingKeyInput").val();
            // Save key to localStorage
            localStorage.setItem('key', saveKeyInput);
            // Set in globals
            saveKey = saveKeyInput;
            // Display key in span
            $('#saveKey').html(`Save Key: <code>${saveKeyInput}</code>`);
            // Show toast
            Toastify({
                text: "Save key loaded!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(90deg, rgba(0,50,0,1) 0%, rgba(0,193,58,1) 100%)",
                }
            }).showToast();
            // Load save state from server
            loadFromServer(saveKey);
        });

        $("#useNewKeyBtn").click(function () {
            $("#newKeyModal").hide();
            // Store key in localStorage
            localStorage.setItem('key', tempNewKey);
            // Set in globals
            saveKey = tempNewKey;
            // Display key in span
            $('#saveKey').html(`Save Key: <code>${tempNewKey}</code>`);
            // Show toast
            Toastify({
                text: "Save key loaded!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(90deg, rgba(0,50,0,1) 0%, rgba(0,193,58,1) 100%)",
                }
            }).showToast();
            gameInitialized = true;
        });
    } else {
        saveKey = localStorage.getItem('key');
        // Display key in span
        $('#saveKey').html(`Save Key: <code>${localStorage.getItem('key')}</code>`);
        // Show toast
        Toastify({
            text: "Save key loaded!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(90deg, rgba(0,50,0,1) 0%, rgba(0,193,58,1) 100%)",
            }
        }).showToast();

        // Load save state from server
        loadFromServer(saveKey);

        gameInitialized = true;
    }
});

async function getKeyFromServer() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://memleek-sync.ryois.net/api/key',
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

async function getClientIDFromServer() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://memleek-sync.ryois.net/api/client',
            type: 'POST',
            success: function (data) {
                resolve(data.client_id);
            },
            // if the request fails, display an error message
            error: function (data) {
                console.log('Error: ' + data);
                reject(data);
            }
        });
    });
}
