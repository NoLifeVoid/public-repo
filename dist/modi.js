"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modi = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Modi {
    static dbConnectionOpen = process.env.DATABASE_ON_REQUEST || 'false';
}
exports.Modi = Modi;
