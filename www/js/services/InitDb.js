services.factory('InitDb', function($cordovaSQLite, $rootScope, DEV, Message, QRBase) {

	var self = this;
	
	self.init = function() {
		$rootScope.finishPopulate = false;
		$rootScope.db = window.cordova ? $cordovaSQLite.openDB("DB") : $rootScope.db = window.openDatabase("DB", "1.0", "DB", -1);
		initData();
	}
	
	/**
	 * Crée les tables.
	 */
	function initData() {
		
		var query = "CREATE TABLE IF NOT EXISTS QR " +
					"(id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"text VARCHAR, " +
					"date VARCHAR, " +
					"type VARCHAR);";

	    $cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
	    	Message.log("Tables créees");
	    	if (DEV) {
	    		createExemples();
	    	}
		}, function (err) {
			Message.erreur(err, "InitDb.js Create table QR");
		});
	}
	
	/**
	 * Crée
	 */
	function createExemples() {
		QRBase.saveOne(function(){}, "Hello!", "texte");
		QRBase.saveOne(function(){}, "http://google.fr", "link");	
		QRBase.saveOne(function(){}, "This is an exemple!", "texte");
		QRBase.saveOne(function(){}, "http://facebook.fr", "link");
		
	}
	
	return self;
});