const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			throw "Invalid user ID";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!"),
		});
	}
};
//https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466557-creez-des-tokens-dauthentification
