"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const categoryController_1 = __importDefault(require("./controller/categoryController"));
const groupController_1 = __importDefault(require("./controller/groupController"));
const topicController_1 = __importDefault(require("./controller/topicController"));
const questionController_1 = __importDefault(require("./controller/questionController"));
const pageController_1 = __importDefault(require("./controller/pageController"));
const globalExceptionHandler_1 = require("./exception/globalExceptionHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'InterviewPrep API' });
});
app.use('/api/categories', categoryController_1.default);
app.use('/api/groups', groupController_1.default);
app.use('/api/topics', topicController_1.default);
app.use('/api/questions', questionController_1.default);
app.use('/api/page', pageController_1.default);
app.use(globalExceptionHandler_1.globalExceptionHandler);
exports.default = app;
