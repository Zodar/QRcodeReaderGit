controllers.controller('QRCtrl', function($scope, $rootScope, QRBase, Message, $cordovaBarcodeScanner, $cordovaInAppBrowser, $ionicPopup) {
	
    function saveSuccess(msg) {
    	Message.longBottom(msg);
    }
	
	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
        	testURL = imageData.text.trim();
        	if (testURL.substring(0, 4) == "http") {
            	QRBase.saveOne(saveSuccess, imageData.text, "link");
        	    $cordovaInAppBrowser.open(imageData.text, "_self");		
        	} else {
            	QRBase.saveOne(saveSuccess, imageData.text, "texte");
        		var myPopup = $ionicPopup.show({subTitle: imageData.text, buttons: [{text: 'OK'}] });
        	}
        }, function(error) {
        	Message.erreur(error, "QRCtrl.js scanBarcode");
        });
    };
    
});