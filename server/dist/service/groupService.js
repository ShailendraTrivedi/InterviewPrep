"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getByCategoryId = getByCategoryId;
exports.getBySlug = getBySlug;
const groupRepository = __importStar(require("../repository/groupRepository"));
const group_dto_1 = require("../dto/group.dto");
async function getAll() {
    const docs = await groupRepository.findAll();
    return (0, group_dto_1.mapGroupList)(docs);
}
async function getByCategoryId(categoryId, options) {
    const docs = await groupRepository.findByCategoryId(categoryId);
    if (options?.includeTopicCount) {
        const withCount = await Promise.all(docs.map(async (g) => {
            const topicCount = await groupRepository.countTopicsByGroupId(g._id);
            return { ...g, topicCount };
        }));
        return (0, group_dto_1.mapGroupList)(withCount);
    }
    return (0, group_dto_1.mapGroupList)(docs);
}
async function getBySlug(categoryId, name) {
    const doc = await groupRepository.findOneByCategoryIdAndName(categoryId, name);
    if (!doc)
        return null;
    const topicCount = await groupRepository.countTopicsByGroupId(doc._id);
    return (0, group_dto_1.mapGroup)({ ...doc, topicCount });
}
