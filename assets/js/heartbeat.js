import { IconMap } from "./utils/Icons.js";

let lastHealthyHeartbeat = Date.now();

function connect() {
    $("#cloudConnState").html(IconMap["connecting"]);
    var socket = new WebSocket(settings.cloudSyncWS);
    socket.onopen = function () {
        socket.send(JSON.stringify({
            type: "auth",
            payload: {
                saveKey: saveKey,
                clientID: localStorage.getItem("clientID")
            }
        }));
    };

    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case "auth":
                console.log(`Authenticated with server!`);
                $("#cloudConnState").html(IconMap["connected"]);
                break;
            case "heartbeat":
                if (data.message.status === "SYN") {
                    socket.send(JSON.stringify({ type: "heartbeat", payload: { status: "SYN-ACK", clientID: localStorage.getItem("clientID"), key: saveKey } }));
                }
                else if (data.message.status === "ACK") {
                    lastHealthyHeartbeat = Date.now();
                    $("#cloudConnState").html(IconMap["cloud_healthy"]);
                }
            default:
                break;
        }
    };

    socket.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        $("#cloudConnState").html(IconMap["disconnected"]);
        setTimeout(function () {
            connect();
        }, 1000);
    };

    socket.onerror = function (err) {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        $("#cloudConnState").html(IconMap["disconnected"]);
        socket.close();
    };
}

function checkHeartbeat() {
    if (Date.now() - lastHealthyHeartbeat > 10000) {
        $("#cloudConnState").html(IconMap["cloud_unhealthy"]);
    }
}

setInterval(checkHeartbeat, 1000);

connect();