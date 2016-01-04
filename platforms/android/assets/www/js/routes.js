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

  $urlRouterProvider.otherwise('/tab/qr');

});