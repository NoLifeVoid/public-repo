import nodemailer from 'nodemailer'
import dotenv from "dotenv"
import fs from "fs/promises"
import path from "path"
import { StringManager } from '../util/string.manager'

// 👆 imports libraries

dotenv.config()

// 👆 This loads .env file into process.env

export abstract class Mailer{

static transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD }})

 // 👆 We set up the transporters. This could look differntly depending on what service you are using. This currently works for the gmail service. AI is a great help there.


static async sendRegistrationMail(email:string,username:string,token:string):Promise<boolean>{

    const registrationHtml = await fs.readFile(path.join(__dirname, "reg.html"),"utf-8")

    // 👆 Here we load template from ./reg.html file 

    const subject:string=`Welcome to the ${process.env.COMPANY_NAME} App`

    // 👆 Here define a subject for our mail

    const injectedRegistrationHtml:string = registrationHtml
    .replace(/###usernamegreeting###/g, StringManager.capitalizeFirstLetter(username))
    .replace(/###username###/g, username)
    .replace(/###token###/g, token)
    .replace(/###frontendlogin###/g, process.env.FRONTEND_URL || 'https://bing.com')
    .replace(/###companyname###/g, process.env.COMPANY_NAME || 'Microsoft')

    // 👆 Here We inject method-input-variables AND predefined content from our .env file the into the html template of our e-mail.

    
    const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: subject,
    html: injectedRegistrationHtml}

    // 👆 Here we assemble the mail options. To then use as the transporters own sendMail function's input

        try {
            const info = await this.transporter.sendMail(mailOptions)

            // 👆 The const info holds the logs of the mail being sent

            console.log('Email sent:', info.response)
            return true
        } catch (error) {
            console.error('Error sending email:', error)
            return false
        }
}

static async sendNewPasswordMail(email:string,username:string,token:string):Promise<boolean>{

    const registrationHtml = await fs.readFile(path.join(__dirname, "recover.html"),"utf-8")

    // 👆 Here we load template from ./reg.html file 

    const subject:string=`Welcome to the ${process.env.COMPANY_NAME} App`

    // 👆 Here define a subject for our mail

    const injectedRegistrationHtml:string = registrationHtml
    .replace(/###usernamegreeting###/g, StringManager.capitalizeFirstLetter(username))
    .replace(/###username###/g, username)
    .replace(/###token###/g, token)
    .replace(/###frontendlogin###/g, process.env.FRONTEND_URL || 'https://bing.com')
    .replace(/###companyname###/g, process.env.COMPANY_NAME || 'Microsoft')

    // 👆 Here We inject method-input-variables AND predefined content from our .env file the into the html template of our e-mail.

    
    const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: subject,
    html: injectedRegistrationHtml}

    // 👆 Here we assemble the mail options. To then use as the transporters own sendMail function's input

        try {
            const info = await this.transporter.sendMail(mailOptions)

            // 👆 The const info holds the logs of the mail being sent

            console.log('Email sent:', info.response)
            return true
        } catch (error) {
            console.error('Error sending email:', error)
            return false
        }
}

}