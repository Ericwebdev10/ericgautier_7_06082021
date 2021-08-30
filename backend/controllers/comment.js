const mySqlConnection = require("../middleware/mysql-connection");
const Comment = require("../models/comment");

exports.createComment = (req, res, next) => {
	const content = req.body.content;
	const comment = new Comment({
		user_id: req.body.user_id,
		post_id: req.body.post_id,
		content: req.body.content,
	});
	if (!content) {
		return res.status(400).json({ message: "Required field" });
	} else {
		mySqlConnection.query(
			`INSERT INTO comment SET ?`,
			comment,
			(error, result) => {
				if (error) {
					res.status(400).json({ error: error });
				} else {
					res.status(200).json({ result });
				}
			}
		);
	}
};

exports.deleteComment = (req, res, next) => {
	let comment_id = req.params.id;
	mySqlConnection.query(
		`DELETE FROM comment WHERE id = ?`,
		comment_id,
		(error, result) => {
			if (error)
				return res
					.status(400)
					.json({ error: "Comment can not be deleted" });
			return res.status(200).json(result);
		}
	);
};

exports.getAllComm = (req, res, next) => {
	mySqlConnection.query(
		`SELECT comment.id, comment.content, comment.dateCreate, comment.user_id, comment.post_id, user.username FROM comment INNER JOIN post ON post.id = comment.post_id left join user on user.id = comment.user_id WHERE post.id= ? ORDER BY dateCreate DESC`,
		req.params.id,
		(error, result) => {
			if (error)
				return res
					.status(400)
					.json({ error: "Comments can not be posted" });
			return res.status(200).json(result);
		}
	);
};

exports.getOneComm = (req, res, next) => {
	mySqlConnection.query(
		"SELECT comment.id, comment.content, user_id, isAdmin  FROM comment INNER JOIN user ON user.id = comment.user_id WHERE comment.id=? ",
		req.params.id,
		(error, result) => {
			if (error) {
				return res
					.status(400)
					.json({ error: "Comments can not be posted" });
			}
			return res.status(200).json(result);
		}
	);
};
