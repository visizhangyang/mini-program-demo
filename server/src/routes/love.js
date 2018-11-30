const Spanner=require('./until')
const connection=require('../mysql')
const formidable = require('formidable')
var spanner=new Spanner(connection)

async function getLove(req,res){
    try{
        var love=await spanner.query({
            tableName:'love',
            rules:`where publish=1`
        })
        res.json(love)
    }catch(e){
        res.json(e)
    }
}
async function writeLove(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.openid,fields.nickName, fields.gender, fields.avatarUrl, fields.toWho, fields.content,
             fields.watchCount, fields.commentCount, fields.thumpCount,fields.writeTime];
        await spanner.insert({
            tableName:'love',
            fields:['openid','nickName','gender','avatarUrl','toWho',
            'content','watchCount','commentCount','thumpCount','writeTime'],
            values:params
        })
        res.json('success')
    });
}
async function addLoveVisitor(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.nickName, fields.avatarUrl, fields.id];
        await spanner.insert({
            tableName:'love_visitor',
            fields:['nickName','avatarUrl','id'],
            values:params
        })
        res.json('success')
    });
}
async function getLoveVisitor(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.nickName, fields.avatarUrl, fields.id];
        await spanner.query({
            tableName:'love_visitor',
            fields:['distinct nickName','avatarUrl'],
            rules:`where id=${fields.id}`,
            values:[fields.id]
        })
        res.json('success')
    });
}
async function addLoveComment(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.nickName, fields.avatarUrl, fields.id, fields.content, fields.commentTime];
        await spanner.insert({
            tableName:'love_comment',
            fields:['nickName','avatarUrl','id',
            'content','commentTime'],
            values:params
        })
        res.json('success')
    });
}
async function getLoveComment(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.nickName, fields.avatarUrl, fields.id];
        var comment=await spanner.query({
            tableName:'love_comment',
            rules:`where id=${fields.id}`,
        })
        res.json(comment)
    });
}
async function addThumpCount(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.nickName, fields.avatarUrl, fields.id, fields.content, fields.commentTime];
        await spanner.update({
            tableName:'publish_love',
            fields:['thumpCount'],
            values:[fields.count],
            rules:`where id=${fields.id}`
        })
        res.json('success')
    });
}
module.exports=[
    {
        method:"get",
        path:'/api/getLove',
        handler:getLove
    },{
        method:"post",
        path:'/api/writeLove',
        handler:writeLove
    },{
        method:"post",
        path:'/api/addLoveVisitor',
        handler:addLoveVisitor
    },{
        method:"post",
        path:'/api/getLoveVisitor',
        handler:getLoveVisitor
    },{
        method:"post",
        path:'/api/addLoveComment',
        handler:addLoveComment
    },{
        method:"post",
        path:'/api/getLoveComment',
        handler:getLoveComment
    },
    {
        method:"post",
        path:'/api/getLoveComment',
        handler:addThumpCount
    }
]