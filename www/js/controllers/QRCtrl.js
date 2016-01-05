controllers.controller('QRCtrl', function(
		$scope,
		$cordovaBarcodeScanner,
		$cordovaInAppBrowser,
		$cordovaAppRate,
		$ionicPopup) {
	
	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
        	if (imageData.text.substring(0, 4) == "http") {
        	    $cordovaInAppBrowser.open(imageData.text, "_self");		
        	} else {
        		var myPopup = $ionicPopup.show({
        		    title: 'Result:',
        		    subTitle: imageData.text,
        		    buttons: [{ text: 'OK' }, { text: 'It\'s an URL',
        		        onTap: function(e) {
        	        	    $cordovaInAppBrowser.open(imageData.text, "_self");
        		        }
        		    }]
        		});
        	}
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