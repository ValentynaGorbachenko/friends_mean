// factory.js
console.log("loading factory");
app.factory('friendFactory', ['$http', function($http){

	return (function($http){
		var friends = [];
		var friend = [];
		function friendFactory(){
			this.getFriends = function(callback){
				callback(friends);
			};
			this.getFriend = function(callback){
				callback(friend);
			};
			this.index = function(callback){
				$http.get('/friends').then(function(data){
					console.log('data from index factory',data.data);
					friends = data.data;
					if (typeof(callback) === 'function'){
						callback(friends);
					}
				});
			};
			this.create = function(new_friend, callback){
				console.log("new_friend data from the factory ",new_friend);
				$http.post('/friends', new_friend).then(function(data){
					console.log("data returned from create new friend from server", data.data);
					if (typeof(callback) === 'function'){
						// add new friend to the friends array? - it updates when comes back to the root route
						callback(data.data);
					}
				});
			};
			this.update = function(id, friend, callback){
				console.log("friend data from factory ", friend);
				$http.put('/friends/'+id, friend).then(function(data){
					console.log("data from update from server ", data.data);
					if (typeof(callback) === 'function'){
						// change the data in the friends array? - it updates when comes back to the root route
						callback(data.data);
					}
				})

			};
			this.show = function(id, callback){
				console.log("id from factory ", id);
				console.log('/friends/'+id);
				$http.get("/friends/"+id).then(function(data){
					console.log(data.data);
					if (typeof(callback) === 'function'){
						callback(data.data);
					}
				})
			};
			this.delete = function(friend, callback){
				console.log("deleting a friend ", friend);
				$http.delete('/friends/'+friend._id, friend).then(function(data){
					console.log("data from server from delete ", data.data);
					if (typeof(callback) === 'function'){
						// I should return all friends and update friends array
						
						$http.get('/friends').then(function(data){
							console.log('data from index factory',data.data);
							friends = data.data;
							callback(friends);
						});

					}
				});
				// $http.delete('/test').then(function(data){
				// 	console.log("data ", data);
				// });
			};
		}
		return new friendFactory();
	})($http);
}]);