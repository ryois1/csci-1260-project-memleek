function keypress(e) {
    switch (e.key) {
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


const channel = new BroadcastChannel('tab');

channel.postMessage('another-tab');
// note that listener is added after posting the message

channel.addEventListener('message', (msg) => {
    if (msg.data === 'another-tab') {
        // message received from 2nd tab
        alert('Cannot open multiple instances');
        gameInitialized = false; // Prevent the game from initializing
        $("#cloudSaveState").html("Locked");
        $("#cards").addClass("locked");
        $("#resetButton").addClass("locked");
        $("#alert").addClass("visibleAlert");
    }
});