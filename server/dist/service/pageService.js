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
exports.getCategoryPage = getCategoryPage;
exports.getGroupPage = getGroupPage;
exports.getTopicPage = getTopicPage;
const categoryService = __importStar(require("./categoryService"));
const groupService = __importStar(require("./groupService"));
const topicService = __importStar(require("./topicService"));
const questionService = __importStar(require("./questionService"));
/** Get full payload for category page: category + groups. Uses category slug (name). */
async function getCategoryPage(categoryName) {
    const category = await categoryService.getByName(categoryName);
    if (!category)
        return null;
    const groups = await groupService.getByCategoryId(category.id, { includeTopicCount: true });
    return { category, groups };
}
/** Get full payload for group/topics page: category + group + topics. Uses category and group slugs. */
async function getGroupPage(categoryName, groupName) {
    const category = await categoryService.getByName(categoryName);
    if (!category)
        return null;
    const group = await groupService.getBySlug(category.id, groupName);
    if (!group)
        return null;
    const topics = await topicService.getByGroupId(group.id, { includeQuestionCount: true });
    return { category, group, topics };
}
/** Get full payload for topic/questions page: category + group + topic + questions. Uses all three slugs. */
async function getTopicPage(categoryName, groupName, topicName) {
    const category = await categoryService.getByName(categoryName);
    if (!category)
        return null;
    const group = await groupService.getBySlug(category.id, groupName);
    if (!group)
        return null;
    const topic = await topicService.getBySlug(group.id, topicName);
    if (!topic)
        return null;
    const questions = await questionService.getByTopicId(topic.id);
    return { category, group, topic, questions };
}
