// friend.js scheema
console.log("loading the model file - friend.js");

var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
	first_name: {type: String, required:[true, "First name cannot be empty!"]},
	last_name: {type: String, required:[true, "Last name cannot be empty!"]},
	birthday: {type: Date, required:[true, "Date of birth name cannot be empty!"]}
}, {timestamps: true});
// setter
mongoose.model('Friend', FriendSchema);

