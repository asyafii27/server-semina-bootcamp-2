class customeAPIError extends Error {
    constructor (message) {
        super(message);
    }
}

module.exports = customeAPIError;