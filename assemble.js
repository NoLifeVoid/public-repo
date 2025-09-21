//assemble.js 
// builds things .env and prisma natively doesnt allow such as in stringterpolation and then writes DATABASE_URL at the bottom of .env
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const host = process.env.MYSQL_HOST
const port = process.env.MYSQL_PORT
const user = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD 
const database = process.env.MYSQL_DATABASE

const connectionString = `mysql://${user}:${password}@${host}:${port}/${database}`

console.log ("assemble.js has just built 'DATABASE_URL':", connectionString)

console.log("Now updating .env file...");

// --- Read .env ---
let envContent = fs.readFileSync('.env', 'utf8');

// --- Remove any existing DATABASE_URL lines ---
const filteredContent = envContent
  .split(/\r?\n/)
  .filter(line => !line.startsWith('DATABASE_URL'))
  .join('\n');

// --- Add the new DATABASE_URL at the end ---
const newEnvContent = filteredContent + `\nDATABASE_URL="${connectionString}"\n`;

// --- Write back to .env ---
fs.writeFileSync('.env', newEnvContent);

console.log("Updated .env with new DATABASE_URL ✅");