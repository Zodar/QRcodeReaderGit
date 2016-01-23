app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('tab', {
	    url: '/tab',
	    abstract: true,
	    templateUrl: 'templates/tabs.html'
	});

	$stateProvider.state('tab.qr', {
	    url: '/qr',
	    views: {
	    	'tab-qr': {
		        templateUrl: 'templates/tab-qr.html',
		        controller: 'QRCtrl'
	    	}
	    }
	});
	
	$stateProvider.state('tab.history', {
	    url: '/history',
	    views: {
	    	'tab-history': {
		        templateUrl: 'templates/tab-history.html',
		        controller: 'HistoryCtrl'
	    	}
	    }
	});

	$urlRouterProvider.otherwise('/tab/qr');
});