"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
exports.globalExceptionHandler = globalExceptionHandler;
/** Use for invalid input, bad ids, validation failures → 400 */
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = 'BadRequestError';
    }
}
exports.BadRequestError = BadRequestError;
/** Sends 400 for BadRequestError, 500 for any other error. */
function globalExceptionHandler(err, _req, res, _next) {
    if (err instanceof BadRequestError) {
        res.status(400).json({ error: err.message });
        return;
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
}
