controllers.controller('QRCtrl', function(
		$scope,
		$rootScope,
		$cordovaBarcodeScanner,
		$cordovaInAppBrowser,
		$cordovaAppRate,
		$ionicPopup) {
	
	$scope.dontShowAgain = false;
	$scope.dontShowAgainAds = false;
	
	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
        	testURL = imageData.text.trim();
        	if (testURL.substring(0, 4) == "http") {
        	    $cordovaInAppBrowser.open(imageData.text, "_self");		
        	} else {
        		var myPopup = $ionicPopup.show({
        		    title: 'Result:',
        		    subTitle: imageData.text,
        		    buttons: [{ text: 'OK',
        		        onTap: function(e) {
        	        	    rating();
        		        } 
        		    }]
        		});
        	}
        }, function(error) {
            console.error("Erreur perso: " + JSON.stringify(error));
        });
    };
    
    $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event) {
    	rating();
    });
    
    function rating() {
//    	if (!$scope.dontShowAgain) {
//    	    $cordovaAppRate.promptForRating(true).then(function (result) {
//    	    	$scope.dontShowAgain = true;
//            });	
//    	} else 
//    	if (!$scope.dontShowAgainAds) {
    	    adbuddiz.showAd();
	    	$scope.dontShowAgainAds = true;
//    	}
    }
});