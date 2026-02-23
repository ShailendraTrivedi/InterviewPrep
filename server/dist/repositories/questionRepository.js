"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.findByTopicId = findByTopicId;
const mongoose_1 = __importDefault(require("mongoose"));
const Question_1 = require("../models/Question");
/** Data access only. Returns plain docs (lean). */
async function findAll() {
    return Question_1.Question.find().select('categoryId groupId topicId question answer').lean();
}
async function findByTopicId(topicId) {
    return Question_1.Question.find({ topicId: new mongoose_1.default.Types.ObjectId(topicId) })
        .select('categoryId groupId topicId question answer')
        .lean();
}
