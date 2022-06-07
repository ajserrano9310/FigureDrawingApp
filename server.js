
const express = require("express");
const path = require("path");
const app = express();
var array = []; 

app.get("/", function (req, res) {
  res.sendFile(path.resolve("views/index.html"));
});

app.get("/gesture", function (req, res) {
  res.sendFile(path.resolve("views/gestureView.html"));
});

app.get("/own-set", function (req, res) {
  res.sendFile(path.resolve("views/practice-nofiles.html"));
});

//var MongoClient = require("mongodb").MongoClient;
//var url = "mongodb://localhost:27017/db-images";

const {MongoClient, ServerApiVersion} = require('mongodb');
const url = 'connection string';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function getBooks(queryParam){

  console.log("the query was", queryParam);

  try{
    await client.connect();

    const db = client.db("data");
    const collection = db.collection("imageRepo");

    const query = {type:queryParam}; 
    const cursor = collection.find(query); 

    if((await cursor.count()) === 0){
      console.log("No documents found!");
    }

    await cursor.forEach(item => array.push(item.url)); 

  }finally{
    await client.close();
  }
}



/**
 * Ajax call
 */

app.get("/getImages", (req, res) => {

  getBooks(req.query.type).catch(console.dir);
  res.send(array);
  
  /*
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("images");
    var query = {type:req.query.type}; 
    dbo.collection("repo").find(query).toArray(function (err, result) {
        if (err){
          console.log("there was an error with the db call"); 
          throw err;
        } 

        res.send(result)
        db.close();
      });
  });
  */
});


app.use(express.static("styles"));
app.use(express.static("scripts"));
app.use(express.static("Resources"));

const server = app.listen(8000, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});

