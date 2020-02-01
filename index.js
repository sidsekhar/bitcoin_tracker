const express = require('express');
const body_parser = require('body-parser');
const request = require('request');

const app = express();
app.use(body_parser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+'/index.html');
});

app.post("/",function(req,res){
  // console.log(req.body.crypto);

  var cry = req.body.crypto;
  var fia = req.body.Fiat;
  var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"
  var finalUrl = baseUrl + cry + fia;



  request(finalUrl,function(error,response,body){
    var data = JSON.parse(body);
    var last = data.last;
    var curDate = data.display_timestamp;
    res.write("<p> The current date is"+curDate);
    res.write("<p> The current price of"+cry+"is"+last+fia+"</p>");
    
  });
});

app.listen(3000,function(){
  console.log("Listening and running on port 3000");
});
