const rateLimit = require("express-rate-limit");

// Enable if you"re behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set("trust proxy", 1);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // limit each IP to 10 requests per windowMs
});

// apply to all login requests
module.exports = rateLimit(limiter);

//https://www.npmjs.com/package/express-rate-limit
// => response if exceeded : 429 Too Many Requests
