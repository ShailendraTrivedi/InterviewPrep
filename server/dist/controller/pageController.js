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
const express_1 = require("express");
const pageService = __importStar(require("../service/pageService"));
const router = (0, express_1.Router)();
/** GET /api/page/category/:name → { category, groups } */
async function getCategoryPage(req, res) {
    try {
        const data = await pageService.getCategoryPage(req.params.name);
        if (!data)
            return res.status(404).json({ error: 'Category not found' });
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load page' });
    }
}
/** GET /api/page/category/:categoryName/group/:groupName → { category, group, topics } */
async function getGroupPage(req, res) {
    try {
        const data = await pageService.getGroupPage(req.params.categoryName, req.params.groupName);
        if (!data)
            return res.status(404).json({ error: 'Page not found' });
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load page' });
    }
}
/** GET /api/page/category/:categoryName/group/:groupName/topic/:topicName → { category, group, topic, questions } */
async function getTopicPage(req, res) {
    try {
        const data = await pageService.getTopicPage(req.params.categoryName, req.params.groupName, req.params.topicName);
        if (!data)
            return res.status(404).json({ error: 'Page not found' });
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load page' });
    }
}
router.get('/category/:name', getCategoryPage);
router.get('/category/:categoryName/group/:groupName', getGroupPage);
router.get('/category/:categoryName/group/:groupName/topic/:topicName', getTopicPage);
exports.default = router;
