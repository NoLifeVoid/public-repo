"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const middleware_1 = require("./middleware");
const listener_1 = require("./listener");
class Server {
    constructor() {
        console.log(new Date().toISOString(), " : Starting Server");
        const app = (0, express_1.default)();
        new middleware_1.Middleware(app);
        new controller_1.Controller(app);
        new listener_1.Listener(app);
    }
}
exports.Server = Server;
