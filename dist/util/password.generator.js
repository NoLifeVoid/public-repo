"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordGenerator = void 0;
class PasswordGenerator {
    static LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    static UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static NUMBERS = "0123456789";
    static SYMBOLS = "&%$#@!?*";
    // 👆 defined categories
    static generate() {
        // 👆 It returns a random password due to the refering requierements: At least 1 lowercase letter, 1 uppercse letter, 1 number and 1 special character.
        // if (length < 4) {
        //   throw new Error("Password length must be at least 4 to satisfy complexity rules.");
        // }
        // 👆 unquote the if condition and put `length:number` as in input parameter in the generate function if you hoose to work with length input parameter for passwordlength
        const length = 12;
        // 👆 quote the length constant if you hoose to work with length input parameter for passwordlength
        const chars = [
            this.getRandomChar(this.LOWERCASE),
            this.getRandomChar(this.UPPERCASE),
            this.getRandomChar(this.NUMBERS),
            this.getRandomChar(this.SYMBOLS),
        ];
        // 👆 guarantee each category
        const allChars = this.LOWERCASE + this.UPPERCASE + this.NUMBERS + this.SYMBOLS;
        for (let i = chars.length; i < length; i++) {
            chars.push(this.getRandomChar(allChars));
        }
        // 👆 fill the rest randomly from all combined
        return this.shuffle(chars).join("");
        // 👆 shuffle the array so guaranteed chars are not always first
    }
    static getRandomChar(pool) {
        const index = Math.floor(Math.random() * pool.length);
        return pool[index];
    }
    // 👆 helper function to return a random Char from allChars
    static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}
exports.PasswordGenerator = PasswordGenerator;
