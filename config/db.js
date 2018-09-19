var mysql = require("mysql");
var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"testdb",
    insecureAuth: true
});

function query(sql,options,callback){
    pool.getConnection(function(err,conn){
        if(err){
            console.log('connection err:',err);
            // callback(err,null,null);
        }else{
            // console.log('connection success:',conn);
            conn.query(sql,options,function(err,results,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err,results,fields);
            });
        }
    });
}

exports.query = query;


