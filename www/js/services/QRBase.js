services.factory('QRBase', function($cordovaSQLite, $rootScope, $http, DEV, Message) {

	var self = this;
	self.callback = null;
	
	self.saveOne = function(callback, text, type) {
	    var query = "INSERT INTO QR(text, date, type) VALUES (?, ?, ?); ";
		
	    var date = getCurrentDate();
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
	
	self.getOne = function(callback, id) {
	    var query = "SELECT * FROM QR WHERE id = ?";
		
		$cordovaSQLite.execute($rootScope.db, query, [id]).then(function(res) {
			var arrayResult = [];
			var i;
			for (i = 0; i < res.rows.length; i++) {
				arrayResult.push(res.rows.item(i));
			}
			callback(arrayResult[0]);
		}, function (err) {
			if (DEV) {
				console.error(err);
			}
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
	
    function getCurrentDate() {
		var dateObj = new Date();
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var month = monthNames[dateObj.getMonth()];
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		newdate = day + " " + month + " " + year;
		return newdate;
    }
	
	return self;
});