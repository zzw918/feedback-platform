let mongodb = require('./db.js');

function Suggestion(suggestion) {
  	this.productType = suggestion.productType;
    this.questionType = suggestion.questionType;
    this.title = suggestion.title;
    this.content = suggestion.content;
    this.username = suggestion.username;
    this.status = suggestion.status;
    this.suggestionId = suggestion.suggestionId;
}

module.exports = Suggestion;

Suggestion.prototype.save = (callback) => {
	let suggestion = {
		productType: this.productType,
		questionType: this.questionType,
		title: this.title,
		content: this.content,
		username: this.username,
		status: this.status,
		time: new Date().getTime(),
		suggestionId: this.suggestionId
	};
    
	mongodb.open( (err, db) => {
	    if (err) {
	      return callback(err);
	    }
	    db.collection('suggestions', (err, collection) => {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(suggestion, {
				safe:true
			}, (err) => {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, suggestion);
			});
	    });
	});
}

Suggestion.getSome = (username, callback) => {
	mongodb.open(function (err, db) {
    if (err) {
		mongodb.close();
		return callback(err);
    }
    db.collection('suggestions', (err, collection) => {
		if (err) {
			mongodb.close();
			return callback(err);
		}
		collection.find({
			username: username
		}).sort({
			time: -1
		}).toArray(function (err, suggestions) {
			mongodb.close();
			if (err) {
				return callback(err);
			}
			callback(null, suggestions);
		});
    });
  });
}

Suggestion.getAll = (callback) => {
	mongodb.open((err, db) => {
		if (err) {
			mongodb.close();
			return callback(err);
		}
		db.collection('suggestions', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.find({}).sort({
				time: -1
			}).toArray(function (err, suggestions) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, suggestions);
			});
		});
	});
}




