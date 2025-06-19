"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.closeDatabaseConnection = closeDatabaseConnection;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI;
const uri = MONGODB_URI || "";
async function connectToDatabase() {
    await mongoose_1.default.connect(uri);
}
async function closeDatabaseConnection() {
    await mongoose_1.default.connection.close();
}
