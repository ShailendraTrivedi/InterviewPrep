"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTopic = mapTopic;
exports.mapTopicList = mapTopicList;
const toResponse_1 = require("../util/toResponse");
function mapTopic(doc) {
    return doc ? (0, toResponse_1.toResponse)(doc) : null;
}
function mapTopicList(docs) {
    return (0, toResponse_1.toResponseList)(docs);
}
