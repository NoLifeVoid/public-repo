// wait-for-mysql.js
const mysql = require("mysql2/promise");

const host = process.env.MYSQL_HOST || "127.0.0.1";
const port = process.env.MYSQL_PORT || 3306;
const user = process.env.MYSQL_USER || "mysql";
const password = process.env.MYSQL_PASSWORD || "mysql";
const database = process.env.MYSQL_DATABASE || "user_database";

async function waitForMysql() {
  let connected = false;
  while (!connected) {
    try {
      const conn = await mysql.createConnection({ host, port, user, password, database });
      await conn.end();
      connected = true;
      console.log("✅ MySQL is ready!");
    } catch (err) {
      console.log("⏳ Waiting for MySQL...");
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

waitForMysql();
