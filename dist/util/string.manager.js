"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringManager = void 0;
class StringManager {
    static capitalizeFirstLetter(str) {
        if (!str)
            return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
}
exports.StringManager = StringManager;
