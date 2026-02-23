"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toResponseList = toResponseList;
exports.toResponse = toResponse;
const mongoose_1 = require("mongoose");
/**
 * Turn a MongoDB doc (with _id and maybe ObjectId refs) into the shape we send to the frontend:
 * - id = _id as string
 * - any ObjectId field (e.g. categoryId) becomes a string
 */
function toResponse(doc) {
    if (!doc || doc._id == null) {
        return doc;
    }
    const d = doc;
    const { _id, ...rest } = d;
    const out = { id: _id.toString() };
    for (const [key, value] of Object.entries(rest)) {
        out[key] = value instanceof mongoose_1.Types.ObjectId ? value.toString() : value;
    }
    return out;
}
function toResponseList(docs) {
    return docs.map(toResponse);
}
