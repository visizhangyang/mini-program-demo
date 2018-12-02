const express = require('express')
const routes=require('./routes/route')

var app = express()
routes.forEach(function(route){
    app[route.method](route.path,route.handler)
})
app.listen(4000)