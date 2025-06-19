"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.closeDatabaseConnection = closeDatabaseConnection;
const mongoose_1 = __importDefault(require("mongoose"));
const DB_STRING = process.env.DB_STRING;
const uri = DB_STRING || "";
async function connectToDatabase() {
    await mongoose_1.default.connect(uri);
}
async function closeDatabaseConnection() {
    await mongoose_1.default.connection.close();
}
