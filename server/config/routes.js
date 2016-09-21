// routes.js
console.log("loading the routes file - routes.js");
var friends = require('./../controllers/friends.js');

module.exports = function(app){
	app.get('/friends', friends.index);
	app.get('/friends/:id', friends.show);
	app.post('/friends', friends.create);
	app.put('/friends/:id', friends.update);
	app.delete('/friends/:id', friends.delete);
	// app.delete('/test', function(req, res){
	// 	console.log("test");
	// 	res.json({success: true});
	// });
}