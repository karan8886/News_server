const express =require('express');
//let Parser = require('rss-parser');
const cors = require('cors');
const bodyParser = require("body-parser");
var fs = require('fs');
const app = express();

const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { sensitiveHeaders } = require('http2');

mongoose.connect("mongodb://localhost:27017/qappdb");

const feedSchema = new mongoose.Schema ({
  idk:String, pub:String,  topic:[String] , title:String,    _id:String,    pubdate:Date,    creator:String,    desc:String, image:String, godf:String, userf:String, algof:String});
const feed = mongoose.model('feeds26',feedSchema);
//const query = { godf: {"$exists" : true, "$eq" : ""}};
const query = { godf: {"$exists" : true, "$eq" : ""}, pub: {"$not": {"$regex": "^Youtube-"}}};

 async function disp() {
  const psfeed = await feed.find(query);
  return feed.find(query).then(token => {return token});
 }
  app.get("/",cors(),function(req,res) {
    //async () => {
    //const psfeed = feed.find(query);
    //const start = performance.now();
    feed.find(query).then(token => {return token}).then(recd => {res.send(recd); console.log(recd);});
    
    //let doc = await feed.findOneAndUpdate(filter, update, {new:true});
    //const end = performance.now();
    //const inSeconds = (end - start) / 1000;
    //console.log(inSeconds);
    
    //feed.find(query).then(token => {psfeed = token}).then(recd => {res.send(psfeed)});
    //res.send(psfeed);
    //console.log(resp);
    //res.send(resp);
    console.log("Inside GET call");
    //console.log(psfeed[0].title);
  //}
  });
//}
//disp();

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
    //  console.log(req.body);
  });

  async function sender(upd) {
    //console.log("sender called");
    const filter = { _id : upd.id};
    const update = {godf: upd.msg};
    //const filter = { pub: "project syndicate" };
    //const update = { godf: "test2" };
    //const start = performance.now();
    let doc = await feed.findOneAndUpdate(filter, update, {new:true});
    //const end = performance.now();
    //const inSeconds = (end - start) / 1000;
    //console.log(inSeconds);
    //disp();
    //console.log(doc.godf);
  }
/*
  (async () => {
    console.time('sender');
    await sender();
    console.timeEnd('sender');
  })();
*/
/*
  async function t() {
  const filter = { pub: "project syndicate" };
  const update = { godf: "" };
  //const filter = { pub: "project syndicate" };
  //const update = { godf: "test2" };
  let doc = await feed.updateMany(filter, update);
};
*/
//t();
