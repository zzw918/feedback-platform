"use strict";
let express = require('express');
// 这里的router不仅适合用于使用jade渲染的博客系统，也适用于api的使用。
let router = express.Router();

// 获取独立的id
let uuidv1 = require('uuid/v1');

// 获取model文件
let Manager = require("../model/manager.js");
let User = require("../model/users.js");
let Product = require('../model/product');
let Suggestion = require('../model/suggestion');
let Comment = require('../model/comment');

module.exports = router;

/* 对客户端的返回数据封装
 * @param [code] (number) code为返回的状态码
 * @param [message] (string) message为返回的信息
 * @param [data] (any) data是可选的，为返回给前端的数据
 */
// 注意： retrunJson中的res为node处理接口的回调函数中的res，这个是必须的。
function returnJson(res, code, message, data) {
    let response = {
        code: code,
        message: message
    };
    if (typeof data !== 'undefined') {
        response.data = data;
    }
    res.json(response);
}

router.post('/register', (req, res) => {
    let userName = req.body.username,
        password = req.body.password,
        passwordAgain = req.body.passwordAgain,
        type = req.body.type;
    if (type == 1) {
        if (password == passwordAgain) {
            let managerId = uuidv1();
            let newUser = new Manager({
                name: userName,
                password: password,
                type: req.body.type,
                managerId: managerId
            });

            Manager.find(userName, (err, user) => {
                if (err) {
                    returnJson(res, 5001, '服务器错误，注册失败');
                } else {
                    if (user !== null) {
                        returnJson(res, 4003, "此用户已经注册！");
                    } else {
                        // 如果符合条件，就注册该用户，将数据保存在数据库。
                        newUser.save( (err, user) => {
                            if (err) {
                                // 服务器端错误，失败返回状态码500
                                returnJson(res, 500, "用户注册失败！");
                            } else {
                                // user数据较简单，直接传递user即可，如果复杂，我们可以考虑使用对象形式传递更多数据。
                                returnJson(res, 200, "用户注册成功！", user);
                            }
                        });
                    }
                }
            });
        } else {
            returnJson(res, 4001, "用户两次输入密码不一致！");
        }
    } else if( type == 2) {
         if (password == passwordAgain) {
            let userId = uuidv1();
            let newUser = new User({
                name: userName,
                password: password,
                type: req.body.type,
                userId: userId
            });

            User.find(userName, (err, user) => {
                if (err) {
                    returnJson(res, 5001, '服务器错误，注册失败');
                } else {
                    if (user !== null) {
                        returnJson(res, 4003, "此用户已经注册！");
                    } else {
                        // 如果符合条件，就注册该用户，将数据保存在数据库。
                        newUser.save( (err, user) => {
                            if (err) {
                                // 服务器端错误，失败返回状态码500
                                returnJson(res, 500, "用户注册失败！");
                            } else {
                                // user数据较简单，直接传递user即可，如果复杂，我们可以考虑使用对象形式传递更多数据。
                                returnJson(res, 200, "用户注册成功！", user);
                            }
                        });
                    }
                }
            });
        } else {
            returnJson(res, 4001, "用户两次输入密码不一致！");
        }
    }
});

router.post('/login', (req, res) => {
	let userName = req.body.userName,
        password = req.body.password,
        type = req.body.type;
    if (type == 1) {
        Manager.find(userName , (err, user) => {
            if (err) {
                returnJson(res, 5001, "服务器错误，登录失败");
            } else {
                if (user == null) {
                    returnJson(res, 2001, '用户未注册');
                } else {
                    if (password === user.password) {
                        returnJson(res, 200, "登录成功！", user);
                    } else {
                        returnJson(res, 4002, "密码输入有误！");
                    }
                }
            }
        });
    } else if (type == 2) {
        User.find(userName , (err, user) => {
            if (err) {
                returnJson(res, 5001, "服务器错误，登录失败");
            } else {
                if (user == null) {
                    returnJson(res, 2001, '用户未注册');
                } else {
                    if (password === user.password) {
                        returnJson(res, 200, "登录成功！", user);
                    } else {
                        returnJson(res, 4002, "密码输入有误！");
                    }
                }
            }
        });
    }
});

router.post('/addNewProduct', (req, res) => {
    let person = req.body.person,
        productName = req.body.product;
    Product.find(productName, (err, product) => {
        if (err) {
			returnJson(res, 5001, "服务器错误，创建失败");
        } else {
            if (product != null) {
                returnJson(res, 4008, '该商品已经被创建,不可重复创建！');
            } else {
                let newProduct = new Product({
                    name: productName,
                    person: person,
                    productId: uuidv1(),
                    time: new Date().getTime()
                });
                newProduct.save((err, product) => {
                    if (err) {
                        returnJson(res, 500, '创建商品失败！');
                    } else {
                        returnJson(res, 200, '创建商品成功！', product);
                    }
                });
            }
        }
    });    
});

router.get('/getAllProduct', (req, res) => {
    Product.getAll((err, products) => {
        if (err) {
            returnJson(res, 500, '获取所有产品失败！');
        } else {
            returnJson(res, 200, '获取所有商品成功', products);
        }
    });
});

router.post('/submitSug', (req, res) => {
    let suggestion = {
        productType: req.body.productType,
        questionType: req.body.questionType,
        title: req.body.title,
        content: req.body.content,
        username: req.body.username,
        status: req.body.status,
        suggestionId: uuidv1()
    }
    let newSug = new Suggestion(suggestion);
    newSug.save( (err, suggestion) => {
        if (err) {
            returnJson(res, 500, '提交失败！');
        } else {
            returnJson(res, 200, '提交成功！')
        }
    });
});


router.post('/subComment', (req, res) => {
    let comment = {
        suggestionId: req.body.suggestionId,
        person: req.body.person,
        content: req.body.content,
        commentId: uuidv1(),
        type: req.body.type
    }
    let newCom = new Comment(comment);
    newCom.save( (err, comment) => {
        if (err) {
            returnJson(res, 500, '提交失败！');
        } else {
            returnJson(res, 200, '提交成功！')
        }
    });
});


router.get('/getAllSuggestion', (req, res) => {
    Suggestion.getAll( (err, suggestions) => {
        if (err) {
            returnJson(res, 500, '获取所有建议失败！');
        } else {
            returnJson(res, 200, '获取所有建议成功', suggestions);
        }
    });
});

router.post('/getSomSuggestion', (req, res) => {
    let username = req.body.username;
    Suggestion.getSome(username, (err, suggestions) => {
        if (err) {
            returnJson(res, 500, '获取部分建议失败！');
        } else {
            returnJson(res, 200, '获取部分建议成功', suggestions);
        }
    });
});

router.post('/getSomeComments', (req, res) => {
    let suggestionId = req.body.suggestionId;
    Comment.findSome(suggestionId, (err, comments) => {
        if (err) {
            returnJson(res, 500, '获取部分评论失败！');
        } else {
            returnJson(res, 200, '获取部分评论成功！',comments);
        }
    });
});