"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGroup = mapGroup;
exports.mapGroupList = mapGroupList;
const toResponse_1 = require("../util/toResponse");
function mapGroup(doc) {
    return doc ? (0, toResponse_1.toResponse)(doc) : null;
}
function mapGroupList(docs) {
    return (0, toResponse_1.toResponseList)(docs);
}
