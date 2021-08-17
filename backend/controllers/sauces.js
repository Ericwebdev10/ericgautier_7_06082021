const Sauce = require("../models/sauce");
const fs = require("fs"); //https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466697-developpez-la-fonction-delete-du-back-end

exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			//get image URL after multer https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466669-modifiez-les-routes-pour-prendre-en-compte-les-fichiers
			req.file.filename
		}`,

		likes: 0, //initialize counters and user lists
		dislikes: 0,
		usersLiked: [],
		usersDisliked: [],
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Sauce saved !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({
		_id: req.params.id,
	})
		.then((sauce) => {
			res.status(200).json(sauce);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body };
	Sauce.updateOne(
		{ _id: req.params.id },
		{ ...sauceObject, _id: req.params.id }
	)
		.then(() => res.status(200).json({ message: "Sauce modified !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() =>
						res.status(200).json({ message: "Sauce deleted !" })
					)
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.getAllsauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => { 
			res.status(200).json(sauces);
		})
		.catch((error) => {
			res.status(400).json({ error: error });
		});
};

exports.updateLikeDislike = (req, res, next) => {
	let likeValue = req.body.like;
	let userId = req.body.userId;
	let sauceId = req.params.id;

//	console.log(likeValue); //debug to delete
//	console.log(userId); //debug to delete
//	console.log(sauceId); //debug to delete
	
	if (likeValue === 1) {
		// if like => push userid and update counter
		//https://docs.mongodb.com/drivers/node/current/fundamentals/crud/write-operations/embedded-arrays/
		Sauce.updateOne(
			{ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
			.then(() => res.status(200).json({ message: "like added !" }))
			.catch((error) => res.status(400).json({ error }));
	}
	if (likeValue === -1) {
		// if dislike => push userid and update counter
		Sauce.updateOne(
			{ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
			.then(() => res.status(200).json({ message: "Dislike added !" }))
			.catch((error) => res.status(400).json({ error }));
	}
	if (likeValue === 0) {
		// if to cancel like or dislike
		Sauce.findOne({ _id: sauceId })
			.then((sauce) => {
				// cancel a like
				if (sauce.usersLiked.includes(userId)) {
					Sauce.updateOne(
						{ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
						.then(() =>	res.status(200).json({ message: "Like removed !" }))
						.catch((error) => res.status(400).json({ error }));
				}
				// cancel a dislike
				if (sauce.usersDisliked.includes(userId)) { 
					Sauce.updateOne(
						{ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
						.then(() => res.status(200).json({ message: "Dislike removed !" }))
						.catch((error) => res.status(400).json({ error }));
				}
			})
			.catch((error) => res.status(404).json({ error }));
	}
};
