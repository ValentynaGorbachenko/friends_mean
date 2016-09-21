// friends.js
console.log("loading the controller file - friends.js");
// var mongoose = require('mongoose');
// var Friend = mongoose.model('Friend');
// var path = require('path');

module.exports = (function(){
	var mongoose = require('mongoose');
	var Friend = mongoose.model('Friend');
	var path = require('path');

	function friendsController(){
		this.index = function(req, res){
			Friend.find({}, function(err, friends){
				console.log("errors - ", err);
				console.log("result - ", friends);
				if(err){
					console.log('something went wrong while getting all friends data');
					res.json(err);
				} else {
					console.log("successfully got all friends!", friends);
					res.json(friends);
					// res.render('index', {title: "First Mongoose App", users: users});
				}
			});
			// res.json({placeholder:'index'});
		};
		this.create = function(req, res){
			console.log("post data", req.body);
			// inserting new ffriend into db
			var friend = new Friend(req.body);
			friend.save(function(err, result){
				console.log("errors - ", err);
				console.log("result - ", result);
				if(err){
					console.log('something went wrong while saving a new friend data', err);
					res.json(err);
				} else {
					console.log("successfully added a new friend!", result);
					// res.redirect('/');
					res.json(result);
				}
			});
			// res.json({placeholder:'create'});
		};
		// res.json({placeholder:'update'});
		this.update = function(req, res){
			console.log("updating data ", req.body);
			// inserting new friend into db
			Friend.findOne({_id: req.params.id}, function(err, friend){
				console.log("errors - ", err);
				console.log("result - ", friend);
				if(err){
					console.log('something went wrong while getting a friend data for updating', err);
				} else {
					console.log("successfully got a friend data for updating!");
					friend.first_name = req.body.first_name;
					friend.last_name = req.body.last_name;
					friend.birthday = req.body.birthday;
					friend.updatedAt = new Date();
					friend.save(function(err, result){
						console.log("errors - ", err);
						console.log("result - ", result);
						if(err){
							console.log('something went wrong while saving a friend data after updating', err);
							res.json(err);
						} else {
							console.log("successfully updated a friend!", result);
							// res.redirect(path.join('/users/', req.params.id));
							res.json(result)
						}
					});
				}
			});
		};
		//res.json({placeholder:'delete'});
		this.delete = function(req, res){
			console.log("delete");

			// finding a friend 
			Friend.findOne({_id: req.params.id}, function(err, friend){
				console.log("errors - ", err);
				console.log("result - ", friend);
				if(err){
					console.log('something went wrong while finding a friend for deleting', err);
				} else {
					console.log("successfully got friend data for deleting!");
					// res.json({placeholder:'delete'});
					Friend.remove({_id: friend._id}, function(err, result){
						if(err){
							console.log('something went wrong while deleting a friend', err);
							res.json(err);
						} else {
							console.log("successfully deleted a friend!");
							res.json(result);
						}
					});
				}
			});
		};
		//res.json({placeholder:'show'});
		this.show = function(req, res){
			// finding one friend
			Friend.findOne({_id: req.params.id}, function(err, friend){
				console.log("errors - ", err);
				console.log("result - ", friend);
				if(err){
					console.log('something went wrong while getting a friend data for show page', err);
					res.json(err);
				} else {
					console.log("successfully got a friend data for show page!", friend);
					// res.render('show', {title: "User Show - First Mongoose App", user: user});
					res.json(friend);
				}
			});
		};
	}
	return new friendsController();
})();