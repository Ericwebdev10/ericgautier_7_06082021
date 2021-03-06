//https://www.npmjs.com/package/mysql2
const mysql = require("mysql2");
require("dotenv").config();

const mySqlConnection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

// Check connection
mySqlConnection.connect(function (err) {
	if (err) {
		console.log("!!! Cannot connect to MySQL database");
		throw err;
	} else {
		console.log("Connected to MySQL database!");
	}
});
module.exports = mySqlConnection;
