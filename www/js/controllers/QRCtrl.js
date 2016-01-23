controllers.controller('QRCtrl', function($scope, $rootScope, QRBase, Message, $cordovaBarcodeScanner, $cordovaInAppBrowser, $ionicPopup) {
	
    function saveSuccess(msg) {
    	Message.longBottom(msg);
    }
	
	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
        	testURL = imageData.text.trim();
        	if (testURL.substring(0, 4) == "http") {
            	QRBase.saveOne(saveSuccess, imageData.text, getCurrentDate(), "link");
        	    $cordovaInAppBrowser.open(imageData.text, "_self");		
        	} else {
            	QRBase.saveOne(saveSuccess, imageData.text, getCurrentDate(), "texte");
        		var myPopup = $ionicPopup.show({subTitle: imageData.text, buttons: [{text: 'OK'}] });
        	}
        }, function(error) {
        	Message.erreur(error, "QRCtrl.js scanBarcode");
        });
    };
    
    function getCurrentDate() {
		var dateObj = new Date();
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var month = monthNames[dateObj.getMonth()];
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		newdate = day + " " + month + " " + year;
		return newdate;
    }
});