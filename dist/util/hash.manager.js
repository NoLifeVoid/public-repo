"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashManager = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class HashManager {
    static SALT_ROUNDS = 10;
    static PEPPER = process.env.PEPPER || "";
    // Hash a plain string (like a password) with pepper
    static async hash(value) {
        console.log(process.env.PEPPER);
        const valueWithPepper = value + this.PEPPER;
        const hashed = await bcryptjs_1.default.hash(valueWithPepper, this.SALT_ROUNDS);
        return hashed;
    }
    // Compare a plain string with a hashed string, including pepper
    static async compare(value, hash) {
        const valueWithPepper = value + this.PEPPER;
        const isMatch = await bcryptjs_1.default.compare(valueWithPepper, hash);
        return isMatch;
    }
}
exports.HashManager = HashManager;
