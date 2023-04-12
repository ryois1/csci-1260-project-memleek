function save(data){
    // console.log(`Saving Data: ${JSON.stringify(data)}`);
    localStorage.setItem("savedata", JSON.stringify(data));
    $("#saveState").html("Saved");
}

function load(){
    const data = localStorage.getItem("savedata");
    if(data == null){
        return null;
    }
    // console.log(`Loading Data: ${JSON.stringify(data)}`);
    return JSON.parse(data);
}

function testLS(){
    if(typeof(Storage) !== "undefined") {
        console.log("localStorage is supported!");
    } else {
        // Sorry! No Web Storage support..
        alert("localStorage is not supported");
    }
}

export { save, load, testLS }