"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Listener {
    constructor(app) {
        const port = Number(process.env.BACKEND_PORT) || 3000;
        app.listen(port, () => { console.log(`💍 User-Management-API blings on port ${port}`); });
    }
}
exports.Listener = Listener;
