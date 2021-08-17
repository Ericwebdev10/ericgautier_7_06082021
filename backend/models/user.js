const mongoose = require("mongoose"); //Mongoose is a MongoDB object modeling tool 

//Check that email is unique
const uniqueValidator = require("mongoose-unique-validator"); //https://www.npmjs.com/package/mongoose-unique-validator

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
