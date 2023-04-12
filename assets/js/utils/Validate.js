function validateJSON(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

function validateJSONAsync (json, callback) {
    setTimeout(function () {
        callback(validateJSON(json));
    }, 0);
}

function validateJSONPromise (json) {
    return new Promise(function (resolve, reject) {
        resolve(validateJSON(json));
    });
}

export { validateJSON, validateJSONAsync, validateJSONPromise };