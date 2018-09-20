var express = require('express');
var router = express.Router();
var db = require("../config/db");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express66666' });
});

/**
 * 查询列表页
 */
router.get("/users",function(req,res,next){
    db.query("select * from user",function(err,rows){
        if(err){
            res.render("users.ejs",{title:"用户列表",datas:[]});
        }else {
            res.render("users.ejs",{title:"用户列表",datas:rows});
        }
        console.log("query666:",rows);
    });
});

/**
 * 添加数据
 */
router.get("/add",function(req,res,next){
    console.log('add666');
    res.render("add.ejs",{add:'add'});
});

router.post("/users/add",function(req,res,next){
    var name = req.body.name;
    var age = req.body.age;
    db.query("insert into user(name,age,id) values('"+name+"','"+ age +"','10')",function(err,rows){
        if(err){
            res.send("新增失败"+err);
        }else {
            res.redirect("/users");
        }
    });
});

/**
 * 删除用户
 */
router.get("/del/:id",function(req,res){
    var id = req.params.id;
    db.query("delete from user where id ='"+id+"'" ,function(err,rows){
        if(err){
            res.send("删除失败"+err);
        }else {
            console.log('删除成功');
            res.redirect("/users");
        }
    });
});

/**
 * 修改
 */
router.get("/update/:id",function(req,res,next){
    var id = req.params.id.slice(1,req.params.id.length);
    // console.log('id::',req.params.id.length);

    var sql = "select * from user where id ='"+id+"'";
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改页面跳转失败");
        }else {
            res.render("update.ejs",{datas:rows});
        }
    });
});

router.post("/update",function(req,res,next){
    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age;
    var sql = `update user set name = '${name}' , age = ${age} where id = '${id}'`;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改失败 " + err);
        }else {
            res.redirect("/users");
        }
    });
});

/**
 * 查询指定记录
 */
router.post('/users/search',function (req,res,next) {
    var name = req.body.s_name;
    var age = req.body.s_age;
    var sql = `select name from user where name = '${name}' or age = ${age}`;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("查询失败 " + err);
        }else {
            // res.redirect("/users");
            console.log('查询成功：',rows);
        }
    });
})

module.exports = router;
