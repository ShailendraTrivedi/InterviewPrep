"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCategory = mapCategory;
exports.mapCategoryList = mapCategoryList;
const toResponse_1 = require("../util/toResponse");
function mapCategory(doc) {
    return doc ? (0, toResponse_1.toResponse)(doc) : null;
}
function mapCategoryList(docs) {
    return (0, toResponse_1.toResponseList)(docs);
}
