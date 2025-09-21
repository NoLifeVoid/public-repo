export abstract class StringManager{

static capitalizeFirstLetter(str: string): string {
if (!str) return ""
return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()}

// 👆 We delcare a static capitalizeFirstLetter method to make the usersname look good for the opening greeting line of the email.
// eg: var username = 'mAtThiAs'
// console.log(username) logs mAtThiAs
// console.log(Mailer.capitalizeFirstLetter(username)) logs Matthias, which read nicer on emails
}