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
        case "s":
            //if sacrifice button is shown, you can sacrifice
            if (window.minerInstances[0].quantity > window.minerInstances[7].lastsacrificequantity) {
                console.log(window.minerInstances[7].production);
                window.minerInstances[7].Sacrifice(window.minerInstances);
                console.log(window.minerInstances[7].production);
            } 
            else {
                Toastify({
                    text: "Not enough miners to sacrifice",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)",
                    }
                }).showToast();
                console.log("Not enough miners to sacrifice");
                break;
            }
            break;
        default:
            break;
    }
};

$("#sacrificeBtn").click(function () {
    window.minerInstances[7].Sacrifice(window.minerInstances);
});

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