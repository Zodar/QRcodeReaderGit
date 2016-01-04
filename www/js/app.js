var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova']);
var controllers = angular.module('starter.controllers', []);

app.config(function($ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
});

app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});