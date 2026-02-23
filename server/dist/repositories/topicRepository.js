"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.findByGroupId = findByGroupId;
exports.findOneByGroupIdAndName = findOneByGroupIdAndName;
exports.countQuestionsByTopicId = countQuestionsByTopicId;
const mongoose_1 = __importDefault(require("mongoose"));
const Topic_1 = require("../models/Topic");
const Question_1 = require("../models/Question");
/** Data access only. Returns plain docs (lean). */
async function findAll() {
    return Topic_1.Topic.find().select('groupId categoryId name title').lean();
}
async function findByGroupId(groupId) {
    return Topic_1.Topic.find({ groupId: new mongoose_1.default.Types.ObjectId(groupId) })
        .select('groupId categoryId name title')
        .lean();
}
async function findOneByGroupIdAndName(groupId, name) {
    return Topic_1.Topic.findOne({
        groupId: new mongoose_1.default.Types.ObjectId(groupId),
        name,
    })
        .select('groupId categoryId name title')
        .lean();
}
async function countQuestionsByTopicId(topicId) {
    return Question_1.Question.countDocuments({ topicId });
}
