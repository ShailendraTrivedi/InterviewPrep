"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.findById = findById;
exports.findByName = findByName;
const Category_1 = require("../models/Category");
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
