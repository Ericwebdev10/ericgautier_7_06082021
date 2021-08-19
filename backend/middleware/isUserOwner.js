const jwt = require('jsonwebtoken');
const mySqlConnection = require("../middleware/mysql-connection");
const dotenv = require("dotenv");   // needed?
dotenv.config();                    // needed?

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userId = decodedToken.userId;

    mySqlConnection.query('SELECT * FROM user WHERE id =?', req.params.id, (error, result) => {
        if ((result[0].id === userId) || result.isAdmin === 1) {
            console.log("Query authorized");
            next();
        } else {
            res.status(403).json({ message: "Query NOT authorized" });
        }
    });

};