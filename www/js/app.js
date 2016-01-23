app.run(function($ionicPlatform, InitDb) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
		
		if (window.cordova) {
			adbuddiz.setLogLevel(adbuddiz.LogLevel.Silent);
		    adbuddiz.setAndroidPublisherKey("9c81ff2e-e1ae-49c1-84a0-d43a27f9bbbf");
		    adbuddiz.cacheAds();	
		}
	    
		InitDb.init();
	});
});

app.config(function($ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
});