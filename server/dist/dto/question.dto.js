"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapQuestion = mapQuestion;
exports.mapQuestionList = mapQuestionList;
const toResponse_1 = require("../util/toResponse");
function mapQuestion(doc) {
    return doc ? (0, toResponse_1.toResponse)(doc) : null;
}
function mapQuestionList(docs) {
    return (0, toResponse_1.toResponseList)(docs);
}
