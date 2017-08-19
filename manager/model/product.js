let mongodb = require('./db.js');

function Product(product) {
  	this.name = product.name;
    this.person = product.person;
    this.productId = product.productId;
    this.time = product.time;
}

module.exports = Product;

Product.prototype.save = function (callback) {
	let product = {
	      name: this.name,
        person: this.person,
        productId: this.productId,
        time: this.time
    };
    
	mongodb.open( (err, db) => {
	    if (err) {
	        return callback(err);
	    }
	    db.collection('products', (err, collection) => {
	     	if (err) {
	      		 mongodb.close();
	    	     return callback(err);
	   	    }
	        collection.insert(product, {
	       		safe:true
	        // 注意： 下面回调函数的第二个参数是一个插入成功的提示，不是user。
	        },  (err) => {
	      	    mongodb.close();
	      	    if (err) {
	                 return callback(err);
	            }
				callback(null, product);
				});
			});
	  });
}

// 步骤：首先尝试连接数据库，接着开始打user集合。 两者失败都会报错，成功都会返回数据库或者集合。
// 注意： 因为不需要new一个实例，所以直接在构造函数上定义函数
Product.find = (productName, callback) => {
	mongodb.open( (err, db) => {
		if (err) {
			return callback(err);
		}
		db.collection('products', (err, collection) => {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne({
				name: productName
			}, (err, product) => {
				mongodb.close();
				if (err) {
					callback(err);
				}
				callback(null, product);
			});
		});
	});
}

Product.getAll = function (callback) {
	mongodb.open(function (err, db) {
    if (err) {
			mongodb.close();
      return callback(err);
    }
    db.collection('products', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.find({}).sort({
				time: -1
			}).toArray(function (err, products) {
				mongodb.close();
        if (err) {
          return callback(err);
				}
				callback(null, products);
      }); 
    });
  });
}