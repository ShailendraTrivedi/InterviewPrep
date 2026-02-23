"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.findById = findById;
exports.findByIds = findByIds;
exports.findByCategoryId = findByCategoryId;
exports.findOneByCategoryIdAndName = findOneByCategoryIdAndName;
exports.countTopicsByGroupId = countTopicsByGroupId;
const mongoose_1 = __importDefault(require("mongoose"));
const Group_1 = require("../model/Group");
const Topic_1 = require("../model/Topic");
/** Data access only. Returns plain docs (lean). */
async function findAll() {
    return Group_1.Group.find().select('categoryId name title icon').lean();
}
async function findById(id) {
    return Group_1.Group.findById(id).select('categoryId name title icon').lean();
}
async function findByIds(ids) {
    if (ids.length === 0)
        return [];
    return Group_1.Group.find({ _id: { $in: ids.map((id) => new mongoose_1.default.Types.ObjectId(id)) } })
        .select('categoryId name title icon')
        .lean();
}
async function findByCategoryId(categoryId) {
    return Group_1.Group.find({ categoryId: new mongoose_1.default.Types.ObjectId(categoryId) })
        .select('categoryId name title icon')
        .lean();
}
async function findOneByCategoryIdAndName(categoryId, name) {
    return Group_1.Group.findOne({
        categoryId: new mongoose_1.default.Types.ObjectId(categoryId),
        name,
    })
        .select('categoryId name title icon')
        .lean();
}
async function countTopicsByGroupId(groupId) {
    return Topic_1.Topic.countDocuments({ groupId });
}
