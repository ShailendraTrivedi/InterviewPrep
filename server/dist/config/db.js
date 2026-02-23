"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewprep';
    try {
        await mongoose_1.default.connect(uri);
        console.log('MongoDB connected');
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('MongoDB connection error:', message);
        process.exit(1);
    }
}
