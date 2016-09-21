// controllers.js
console.log("loading controllers");
app.controller('NewController', ['$scope', 'friendFactory', '$location', function($scope, friendFactory, $location){
	$scope.createFriend = function(new_friend){
		console.log("before adding new_friend ", new_friend);
		friendFactory.create(new_friend, function(data){
			console.log("added new friend ", data);
			$location.path('/');
		});
	};
}]);

app.controller('IndexController', ['$scope', 'friendFactory', '$location', function($scope, friendFactory, $location){
	$scope.friends = [];
	// for sorting 
	$scope.reverse = true;
	$scope.sortBy = function(){
		$scope.reverse = !$scope.reverse;
	};
	friendFactory.index(function(data){
		console.log('data from controller index ', data);
		$scope.friends = data;
		console.log('friends ', $scope.friends);
	});
	$scope.deleteFriend = function(friend){
		console.log("deleing a friend ", friend);
		var conf = confirm("Are you sure you want to delete "+ friend.first_name+ " "+friend.last_name+"?");
		if (conf){
			friendFactory.delete(friend, function(data){
				console.log("data from delete from factory ", data);
				$scope.friends = data;
			});
		}
	};
}]);

app.controller('EditController', ['$scope', 'friendFactory', '$location', '$routeParams', function($scope, friendFactory, $location, $routeParams){
	console.log($routeParams.id);
	$scope.friend = [];
	$scope.convertDate = function(str){
		return new Date(str);
	}
	friendFactory.show($routeParams.id, function(data){
		console.log("data from show ", data);
		$scope.friend = data;
		$scope.friend.birthday = $scope.convertDate(data.birthday);
		console.log($scope.friend.birthday);
	});
	$scope.updateFriend = function(friend){
		console.log("friend for updating ", friend);
		console.log($routeParams.id);
		friendFactory.update($routeParams.id, friend,  function(data){
			console.log("data from update factory ", data);
			$location.path('/');
		});
	};
}]);

app.controller('ShowController', ['$scope', 'friendFactory', '$location', '$routeParams', function($scope, friendFactory, $location, $routeParams){
	console.log($routeParams.id);
	$scope.friend = [];
	$scope.convertDate = function(str){
		return new Date(str);
	}
	friendFactory.show($routeParams.id, function(data){
		console.log("data from show ", data);
		$scope.friend = data;
		// $scope.friend.birthday = $scope.convertDate(data.birthday);
		// $scope.friend.updatedAt = $scope.convertDate(data.updatedAt);
		console.log($scope.friend.birthday);
	});
}]);