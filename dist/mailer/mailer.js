"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const string_manager_1 = require("../util/string.manager");
// 👆 imports libraries
dotenv_1.default.config();
// 👆 This loads .env file into process.env
class Mailer {
    static transporter = nodemailer_1.default.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });
    // 👆 We set up the transporters. This could look differntly depending on what service you are using. This currently works for the gmail service. AI is a great help there.
    static async sendRegistrationMail(email, username, token) {
        const registrationHtml = await promises_1.default.readFile(path_1.default.join(__dirname, "reg.html"), "utf-8");
        // 👆 Here we load template from ./reg.html file 
        const subject = `Welcome to the ${process.env.COMPANY_NAME} App`;
        // 👆 Here define a subject for our mail
        const injectedRegistrationHtml = registrationHtml
            .replace(/###usernamegreeting###/g, string_manager_1.StringManager.capitalizeFirstLetter(username))
            .replace(/###username###/g, username)
            .replace(/###token###/g, token)
            .replace(/###frontendlogin###/g, process.env.FRONTEND_URL || 'https://bing.com')
            .replace(/###companyname###/g, process.env.COMPANY_NAME || 'Microsoft');
        // 👆 Here We inject method-input-variables AND predefined content from our .env file the into the html template of our e-mail.
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: subject,
            html: injectedRegistrationHtml
        };
        // 👆 Here we assemble the mail options. To then use as the transporters own sendMail function's input
        try {
            const info = await this.transporter.sendMail(mailOptions);
            // 👆 The const info holds the logs of the mail being sent
            console.log('Email sent:', info.response);
            return true;
        }
        catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
    static async sendNewPasswordMail(email, username, token) {
        const registrationHtml = await promises_1.default.readFile(path_1.default.join(__dirname, "recover.html"), "utf-8");
        // 👆 Here we load template from ./reg.html file 
        const subject = `Welcome to the ${process.env.COMPANY_NAME} App`;
        // 👆 Here define a subject for our mail
        const injectedRegistrationHtml = registrationHtml
            .replace(/###usernamegreeting###/g, string_manager_1.StringManager.capitalizeFirstLetter(username))
            .replace(/###username###/g, username)
            .replace(/###token###/g, token)
            .replace(/###frontendlogin###/g, process.env.FRONTEND_URL || 'https://bing.com')
            .replace(/###companyname###/g, process.env.COMPANY_NAME || 'Microsoft');
        // 👆 Here We inject method-input-variables AND predefined content from our .env file the into the html template of our e-mail.
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: subject,
            html: injectedRegistrationHtml
        };
        // 👆 Here we assemble the mail options. To then use as the transporters own sendMail function's input
        try {
            const info = await this.transporter.sendMail(mailOptions);
            // 👆 The const info holds the logs of the mail being sent
            console.log('Email sent:', info.response);
            return true;
        }
        catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
}
exports.Mailer = Mailer;
