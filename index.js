const express =require('express');
//let Parser = require('rss-parser');
const cors = require('cors');
const bodyParser = require("body-parser");
//var fs = require('fs');
const app = express();

const mongoose = require('mongoose');
//const { ObjectId } = require('mongodb');
//const { sensitiveHeaders } = require('http2');

mongoose.connect("mongodb://localhost:27017/qappdb");

const feedSchema = new mongoose.Schema ({
  idk:String, pub:String,  topic:[String] , palm:[String], title:String,    _id:String,    pubdate:Date,    creator:String,    desc:String, image:String, godf:String, userf:String, algof:String});
const feed = mongoose.model('feeds26',feedSchema);
const query = { godf: {"$exists" : true, "$eq" : ""}, pub: {"$not": {"$regex": "^Youtube-"}}};
//const query = { godf: { "$exists": true } };
 
  app.get("/",cors(),function(req,res) {
    //const start = performance.now();
    feed.find(query).sort({ palm: 1 }).then(token => {return token}).then(recd => {res.send(recd); console.log(recd);});
    
    //const end = performance.now();
    //const inSeconds = (end - start) / 1000;
    //console.log(inSeconds);
        
  });

app.listen(8080, function(){
  console.log("Listening");
});

//////////////////////////////Update the feedback

app.use(cors());
app.use(express.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({extended:true}));
  
  app.post("/api",cors(),function(req,res) {
    console.log("Post received");
    sender(req.body);
    res.send("");
  });

  async function sender(upd) {
    const filter = { _id : upd.id};
    const update = {godf: upd.msg};
    //const start = performance.now();
    let doc = await feed.findOneAndUpdate(filter, update, {new:true});
    //const end = performance.now();
    //const inSeconds = (end - start) / 1000;
    //console.log(inSeconds);
  }
/*
  (async () => {
    console.time('sender');
    await sender();
    console.timeEnd('sender');
  })();
*/
