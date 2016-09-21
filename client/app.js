// app.js
console.log("loading app");
var app = angular.module('app', ['ngRoute']);

(function(){
	app.config(function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'partials/friends.html',
			controller: 'IndexController'
		})
		.when('/friends/new', {
			templateUrl: 'partials/new.html',
			controller: 'NewController'
		})
		.when('/friends/:id/edit', {
			templateUrl: 'partials/edit.html',
			controller: 'EditController'
		})
		.when('/friends/:id', {
			templateUrl: 'partials/show.html',
			controller: 'ShowController'
		})
		.otherwise({
			redirectTo: '/'
		});
	});
})();