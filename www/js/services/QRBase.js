services.factory('QRBase', function($cordovaSQLite, $rootScope, $http, DEV, Message) {

	var self = this;
	self.callback = null;
	
	self.saveOne = function(callback, text, date, type) {
	    var query = "INSERT INTO QR (text, date, type) VALUES (?, ?, ?); ";
		
		$cordovaSQLite.execute($rootScope.db, query, [text, date, type]).then(function(res) {
			callback("QR Code added to the history !");
		}, function (err) {
			Message.erreur(err, "QRBase.js saveOne");
		});
	}
	
	self.deleteOne = function(callback, id) {
		var query = "DELETE FROM QR WHERE id = '" + id + "';";
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			callback("QR Code removed from history.");
		}, function (err) {
			Message.erreur(err, "QRBase.js deleteOne");
		});
	}
	
	self.deleteAll = function(callback) {
		var query = "DELETE FROM QR;";
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			callback("History removed.");
		}, function (err) {
			Message.erreur(err, "QRBase.js deleteAll");
		});
	}
	
	self.getAll = function(callback) {
	    var query = "SELECT * FROM QR;";
		
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			var arrayResult = [];
			var i;
			for (i = 0; i < res.rows.length; i++) {
				arrayResult.push(res.rows.item(i));
			}
			callback(arrayResult);
		}, function (err) {
			if (DEV) {
				console.error(err);
			}
		});
	}
	
	return self;
});