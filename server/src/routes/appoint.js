const Spanner=require('./until')
const connection=require('../mysql')
const formidable = require('formidable')
var spanner=new Spanner(connection)
async function getAppoint(req,res){
    try{
        var appoint=await spanner.query({
            tableName:'appoint',
            rules:`where publish=1`
        })
        res.json(appoint)
    }catch(e){
        res.json(e)
    }
}
async function writeAppoint(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.openid,fields.nickName, fields.avatarUrl, fields.theme, fields.want,
            fields.detail, fields.appointTime, fields.appointLocation,fields.writeTime];
        await spanner.insert({
            tableName:'appoint',
            fields:['openid','nickName','avatarUrl','theme','want',
            'detail','appointTime','appointLocation','writeTime'],
            values:params
        })
        res.json('success')
    });
}
module.exports=[{
    method:"get",
    path:'/api/getAppoint',
    handler:getAppoint
},{
    method:"post",
    path:'/api/writeAppoint',
    handler:writeAppoint
}]