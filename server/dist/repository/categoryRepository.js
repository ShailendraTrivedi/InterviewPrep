"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.findById = findById;
exports.findByName = findByName;
exports.findByIds = findByIds;
const mongoose_1 = __importDefault(require("mongoose"));
const Category_1 = require("../model/Category");
/** Data access only. Returns plain docs (lean). */
async function findAll() {
    return Category_1.Category.find().select('name title icon').lean();
}
async function findById(id) {
    return Category_1.Category.findById(id).select('name title icon').lean();
}
async function findByName(name) {
    return Category_1.Category.findOne({ name }).select('name title icon').lean();
}
async function findByIds(ids) {
    if (ids.length === 0)
        return [];
    return Category_1.Category.find({ _id: { $in: ids.map((id) => new mongoose_1.default.Types.ObjectId(id)) } })
        .select('name title icon')
        .lean();
}
