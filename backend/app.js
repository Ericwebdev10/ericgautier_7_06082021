//https://www.npmjs.com/package/dotenv
//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commRoutes = require("./routes/comment");

//https://expressjs.com/fr/advanced/best-practice-security.html
//Helmet helps to secure Express apps by setting various HTTP headers
const helmet = require("helmet"); //https://www.npmjs.com/package/helmet

//https://www.npmjs.com/package/express-sanitize-middleware
const sanitizeMiddleware = require("sanitize-middleware");

const app = express();


//Cross Origin Resource Sharing (CORS) is a W3C standard that allows a server to relax the same-origin policy. Using CORS, a server can explicitly allow some cross-origin requests while rejecting others.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// Sanitize Middleware (Inyection Attacks)
app.use(sanitizeMiddleware());
app.use(bodyParser.json());
app.use(helmet());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comm", commRoutes);

module.exports = app;