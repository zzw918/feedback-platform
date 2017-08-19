let mongodb = require('./db.js');

function User(user) {
  	this.name = user.name;
    this.password = user.password;
    this.userId = user.userId;
    this.type = user.type;
}

module.exports = User;

User.prototype.save = (callback) => {
	let user = {
		name: this.name,
		password: this.password,
		managerId: this.userId,
		type: this.type
	};
    
	mongodb.open( (err, db) => {
	    if (err) {
			return callback(err);
	    }
	    db.collection('users', (err, collection) => {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(user, {
				safe:true
			// 注意： 下面回调函数的第二个参数是一个插入成功的提示，不是user。
			}, (err) => {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				// 注册成功，则回调null错误，user数据，前端选择性使用。
				callback(null, user);
			});
	    });
	  });
}

// 步骤：首先尝试连接数据库，接着开始打user集合。 两者失败都会报错，成功都会返回数据库或者集合。
// 注意： 因为不需要new一个实例，所以直接在构造函数上定义函数
User.find = (userName, callback) => {
	mongodb.open( (err, db) => {
		if (err) {
			return callback(err);
		}
		db.collection('users', (err, collection) => {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne({
				name: userName
			}, (err, user) => {
				mongodb.close();
				if (err) {
					callback(err);
				}
				// mongodb端查询数据时如果没有内部错误，就一定是可以查到的，要么为null，要么为user数据。
				callback(null, user);
			});
		});
	});
}