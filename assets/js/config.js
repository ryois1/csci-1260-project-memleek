let gameInitialized = false;
let gameLocked = false;
let saveKey = null;
let cloudSyncSuccessfulSetup = false;
let globalBytes = 10;
let settings = {
    notation: "",
    gameTickSpeed: 1000,
    UITick: 100,
    cloudSyncSpeed: 10000,
    cloudSyncBaseURL: "https://memleek-sync.ryois.net/api",
    cloudSyncWS: "wss://memleek-sync.ryois.net/"
}