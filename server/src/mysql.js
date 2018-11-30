const mysql=require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '19950403',
    database: 'cAuth'
});
module.exports=connection