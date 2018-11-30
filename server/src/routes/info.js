const Spanner=require('./until')
const connection=require('../mysql')
const formidable = require('formidable')
var spanner=new Spanner(connection)
async function getMes(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        try{
            var mes=await spanner.query({
                tableName:'mes',
                rules:`where toWho in (${fields.id},"all")`
            })
            res.json(mes)
        }catch(e){
            res.json(e)
        }
    });
    try{
        var mes=await spanner.query({
            tableName:'mes',
            rules:`where toWho in (${fields.id},"all")`
        })
        res.json(mes)
    }catch(e){
        res.json(e)
    }
}
async function addMes(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.nickName, fields.avatarUrl, fields.toWho, fields.content,fields.writeTime];
        await spanner.insert({
            tableName:'love',
            fields:['nickName','avatarUrl','toWho',
            'content','writeTime'],
            values:params
        })
        res.json('success')
    });
}
async function getMyLove(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        try{
            var love=await spanner.query({
                tableName:'love',
                rules:`where openid=${fields.id}`
            })
            res.json(love)
        }catch(e){
            res.json(e)
        }
    });
}
async function getMyAppoint(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        try{
            var appoint=await spanner.query({
                tableName:'appoint',
                rules:`where openid=${fields.id}`
            })
            res.json(appoint)
        }catch(e){
            res.json(e)
        }
    });
}
module.exports=[{
    method:"post",
    path:'/api/getMes',
    handler:getMes
},{
    method:"post",
    path:'/api/addMes',
    handler:addMes
},{
    method:"post",
    path:'/api/getMyLove',
    handler:getMyLove
},{
    method:"post",
    path:'/api/getMyAppoint',
    handler:getMyAppoint
}]