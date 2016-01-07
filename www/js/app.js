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
		
//	    adbuddiz.setLogLevel(adbuddiz.LogLevel.Info);
//	    adbuddiz.setTestModeActive();
	    adbuddiz.setLogLevel(adbuddiz.LogLevel.Silent);
	    adbuddiz.setAndroidPublisherKey("9c81ff2e-e1ae-49c1-84a0-d43a27f9bbbf");
	    adbuddiz.cacheAds();
	    adbuddiz.showAd();
	});
});