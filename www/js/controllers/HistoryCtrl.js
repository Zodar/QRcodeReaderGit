controllers.controller('HistoryCtrl', function($scope, QRBase, Message, $ionicLoading, $ionicPopup, $cordovaInAppBrowser) {
	
	$scope.$on('$ionicView.enter', function(e) {
		$ionicLoading.show({template: 'Loading...'});
		setTimeout(init, 500);
	    adbuddiz.showAd();
	});
	
	function init() {
		QRBase.getAll(history);
	}
	
	$scope.go = function(text) {
		$cordovaInAppBrowser.open(text, "_self");
	}
	
	$scope.deleteAll = function() {
		$ionicPopup.show({title: 'DELETE',
			subTitle: 'You gonna remove all QR, Are you sure ?',
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
	
//	$scope.deleteOne = function(prenom) {
//		var index;
//		$ionicPopup.show({title: 'Suppression',
//			subTitle: 'Voulez vous supprimer ' + prenom.prenom + ' de vos favoris ?',
//			buttons: [{text: '<b>Supprimer</b>', type: 'button-positive',
//				onTap: function(e) {
//					FavorisBase.deleteOne(deleteOneSuccess, prenom);
//					angular.forEach($scope.listFavoris, function(value, key) {
//						if (value.prenom == prenom.prenom) {
//							index = $scope.listFavoris.indexOf(value);
//							if (index > -1) {
//								$scope.listFavoris.splice(index, 1);
//							}
//						} 
//					});
//				}
//			}, {text: 'Annuler'}]
//		});
//	}
	
//	function deleteOneSuccess(message) {
//		Message.shortCenter(message);
//	}
		
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
	
});