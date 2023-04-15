function validateStateJSON(state) {
    // Check if state is a valid JSON
    try {
        JSON.parse(state);
    }
    catch (e) {
        return false;
    }
    return true;
}

function validateState(state) {
    // Check if state is valid string
    if (typeof state !== 'string') {
        return false;
    }
    // Check if state is a valid JSON
    if (!validateStateJSON(state)) {
        return false;
    }
    // Check if state is a valid save state
    if (!state.includes('{"globalBytes":')) {
        return false;
    }
    return true;
}

export { validateState, validateStateJSON }