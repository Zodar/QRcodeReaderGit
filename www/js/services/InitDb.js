services.factory('InitDb', function($cordovaSQLite, $rootScope, DEV, Message) {

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
		}, function (err) {
			Message.erreur(err, "InitDb.js Create table QR");
		});
	}
	
	return self;
});