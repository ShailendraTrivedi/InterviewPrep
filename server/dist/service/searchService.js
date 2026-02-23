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
exports.searchQuestions = searchQuestions;
const questionRepository = __importStar(require("../repository/questionRepository"));
const topicRepository = __importStar(require("../repository/topicRepository"));
const groupRepository = __importStar(require("../repository/groupRepository"));
const categoryRepository = __importStar(require("../repository/categoryRepository"));
const question_dto_1 = require("../dto/question.dto");
async function searchQuestions(query) {
    const docs = await questionRepository.search(query);
    const questions = (0, question_dto_1.mapQuestionList)(docs);
    if (questions.length === 0)
        return [];
    const topicIds = [...new Set(questions.map((q) => q.topicId))];
    const topics = await topicRepository.findByIds(topicIds);
    const topicMap = new Map(topics.map((t) => [String(t._id), t]));
    const groupIds = [...new Set(topics.map((t) => String(t.groupId)))];
    const groups = await groupRepository.findByIds(groupIds);
    const groupMap = new Map(groups.map((g) => [String(g._id), g]));
    const categoryIds = [...new Set(groups.map((g) => String(g.categoryId)))];
    const categories = await categoryRepository.findByIds(categoryIds);
    const categoryMap = new Map(categories.map((c) => [String(c._id), c]));
    return questions.map((q) => {
        const topic = topicMap.get(q.topicId);
        const group = topic ? groupMap.get(String(topic.groupId)) : null;
        const category = group ? categoryMap.get(String(group.categoryId)) : null;
        return {
            ...q,
            categoryName: category?.name ?? '',
            groupName: group?.name ?? '',
            topicName: topic?.name ?? '',
        };
    });
}
