let mongodb = require('./db.js');

function Comment(comment) {
  	this.suggestionId = comment.suggestionId;
    this.person = comment.person;
    this.content = comment.content;
    this.commentId = comment.commentId;
    this.type = comment.type
}

module.exports = Comment;

Comment.prototype.save = (callback) => {
	let comment = {
	    suggestionId: this.suggestionId,
        person: this.person,
        content: this.content,
        commentId: this.commentId,
        time: new Date().getTime(),
        type: this.type
    };
    
	mongodb.open( (err, db) => {
	    if (err) {
	      return callback(err);
	    }
	    db.collection('comments', (err, collection) => {
	      if (err) {
	       mongodb.close();
	       return callback(err);
	      }
	      collection.insert(comment, {
	        safe:true
	      }, (err) => {
	        mongodb.close();
	        if (err) {
	          return callback(err);
	        }
	        callback(null, comment);
	      });
	    });
	});
}

Comment.getAll = (callback) => {
	mongodb.open( (err, db) => {
		if (err) {
			mongodb.close();
			return callback(err);
		}
    db.collection('comments', (err, collection) => {
        if (err) {
          mongodb.close();
          return callback(err);
        }
        collection.find({}).sort({
			time: 1
		}).toArray( (err, comments) => {
       		 mongodb.close();
    	    if (err) {
     	   	    return callback(err);
   		    }
            callback(null, comments);
     	    });
  	    });
    });
}

Comment.findSome = (suggestionId, callback) => {
  mongodb.open( (err, db) => {
    if (err) {
      mongodb.close();
      return callback(err);
    } 
    db.collection('comments', (err, collection) => {
      if (err) {  
        mongodb.close();
        return callback(err);
      }
      collection.find({
        suggestionId: suggestionId
      }).sort({
        time: 1
      }).toArray( (err, comments) => {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, comments);
      })
    });
  })
}