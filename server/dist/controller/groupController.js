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
const groupService = __importStar(require("../service/groupService"));
const router = (0, express_1.Router)();
async function getAll(req, res) {
    try {
        const categoryId = req.query.categoryId;
        const includeTopicCount = req.query.includeTopicCount === 'true';
        const groups = categoryId
            ? await groupService.getByCategoryId(categoryId, { includeTopicCount })
            : await groupService.getAll();
        res.json(groups);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
}
async function getBySlug(req, res) {
    try {
        const group = await groupService.getBySlug(req.params.categoryId, req.params.name);
        if (!group)
            return res.status(404).json({ error: 'Group not found' });
        res.json(group);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch group' });
    }
}
router.get('/', getAll);
router.get('/by-slug/:categoryId/:name', getBySlug);
exports.default = router;
