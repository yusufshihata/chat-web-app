const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 3,
	},
	email: {
		type: String,
		required: true,
		min: 6,
	},
	password: {
		type: String,
		required: true,
		min: 8,
	},
	age: {
		type: Number,
		required: true
	},
	friends: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model("UserSchema", UserSchema);
