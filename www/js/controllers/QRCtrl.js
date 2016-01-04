controllers.controller('QRCtrl', function(
		$scope,
		$cordovaBarcodeScanner,
		$cordovaInAppBrowser,
		$cordovaAppRate) {
	
	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            $cordovaInAppBrowser.open(imageData.text, "_self");
        }, function(error) {
            console.error("Erreur perso: " + JSON.stringify(error));
        });
    };
    
    document.addEventListener("deviceready", function () {
    	$cordovaAppRate.promptForRating(true).then(function (result) {
            // success
        });
    }, false);
});