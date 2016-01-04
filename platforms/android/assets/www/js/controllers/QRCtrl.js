controllers.controller('QRCtrl', function(
		$scope,
		$cordovaBarcodeScanner,
		$cordovaInAppBrowser,
		$cordovaAppRateProvider) {
	
	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            $cordovaInAppBrowser.open(imageData.text, "_self");
        }, function(error) {
            console.error("Erreur perso: " + JSON.stringify(error));
        });
    };
    
    $cordovaAppRateProvider.promptForRating(true);
});