controllers.controller('HistoryCtrl', function($scope, QRBase, DEV, Message, $ionicLoading, $ionicPopup, $cordovaInAppBrowser, $cordovaSocialSharing) {
	
	var selectPopUp;
	
	$scope.$on('$ionicView.enter', function(e) {
		$ionicLoading.show({template: 'Loading...'});
		setTimeout(init, 500);
		if (!DEV) {
		    adbuddiz.showAd();		
		}
	});
	
	function init() {
		QRBase.getAll(history);
	}	
	
	/**
	 * Liste les QR reçu depuis la base de données.
	 */
	function history(result) {
		$ionicLoading.hide();

		if (!result.length) {
			Message.longBottom("There are no QR in history");
		} else {
			$scope.listeQR = result;
		}
	}
	
	
	$scope.select_an_option = function(item) {
		selectPopUp = $ionicPopup.show({title: 'Settings',
			scope: $scope,
			template: "" +
					"<button class='col col-offset-10 col-80 button button-small button-assertive ion-trash-b' ng-click='deleteOne(" + item.id + ")' >" +
							" Remove </button>" +
					"<button class='col col-offset-10 col-80 button button-small button-positive ion-android-globe' ng-click='go(" + item.id + ");'>" +
							" Open in Browser </button>" +
					"<button class='col col-offset-10 col-80 button button-small button-calm ion-document' ng-click='go_text(" + item.id + ");'>" +
							" Open as Text </button>" +
					"<button class='col col-offset-10 col-80 button button-small button-balanced ion-paper-airplane' ng-click='share(" + item.id + ");'>" +
							" Share </button>",
			buttons: [{text: 'Cancel'}]
		});
	}
	
	$scope.share = function(id) {
		QRBase.getOne(function(result) {
			$cordovaSocialSharing.share(result.text, "https://play.google.com/store/apps/details?id=com.zodar.qr").then(function(result) {
				Message.shortCenter("QR shared");
			}, function(err) {
				Message.erreur(err, "HistoryCtrl.js share");
			});
		}, id);
	}
	
	$scope.go = function(id) {
		selectPopUp.close();
		QRBase.getOne(function(result) {
			$cordovaInAppBrowser.open(result.text, "_self");
		}, id);
	}
	
	$scope.go_text = function(id) {
		selectPopUp.close();
		QRBase.getOne(function(result) {
			var myPopup = $ionicPopup.show({subTitle: result.text, buttons: [{text: 'OK'}] });		
		}, id);
	}
		
	$scope.deleteOne = function(id) {
		selectPopUp.close();
		$ionicPopup.show({title: 'DELETE',
			subTitle: 'You gonna remove this QR, Are you sure ?',
			buttons: [{text: '<b>Remove</b>', type: 'button-assertive',
				onTap: function(e) {
					$scope.itemToDelete = id;
					QRBase.deleteOne(deleteOneSuccess, id);
				}
			}, {text: 'Cancel'}]
		});
	};
	
	function deleteOneSuccess(msg) {
		Message.shortCenter(msg);
		$("#his_" + $scope.itemToDelete).remove();
	}
	
	$scope.deleteAll = function() {
		$ionicPopup.show({title: 'DELETE',
			subTitle: 'You gonna remove ALL QR Codes, Are you sure ?',
			buttons: [{text: '<b>Remove</b>', type: 'button-assertive',
				onTap: function(e) {
					QRBase.deleteAll(deleteAllQR);
				}
			}, {text: 'Cancel'}]
		});
	}
	
	function deleteAllQR(msg) {
		Message.longBottom(msg);
		$scope.listeQR = null;
	}
	
});