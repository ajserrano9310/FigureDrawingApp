
const express = require("express");
const path = require("path");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.resolve("views/index.html"));
});

app.get("/gesture", function (req, res) {
  res.sendFile(path.resolve("views/gestureView.html"));
});

app.use(express.static("styles"));
app.use(express.static("scripts"));

/*
const {MongoClient} = require('mongodb'); 


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParses: true
}); 

const db = mongoose.connection; 
db.on('error', error => console.error(error)); 
db.once('open', () => console.log('connected')); 


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main(){
    
    const client = new MongoClient(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }); 

    try{
        await client.connect(); 

        await listDatabases(client); 
    }
    catch (e){
        console.error(e);
    }finally{
        await client.close();
    }
}

main().catch(console.error)
*/

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/db-images";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("db-images");
  dbo.createCollection("image-repo", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
/*
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("db-images");


    //var myobj = { name: "Company Inc", address: "Highway 37" };

    var imageURLS = [
        {id: 1, gender: "female", url: "https://i.ibb.co/VtQWxdx/the-killer-elite-3-by-mjranum-stock-d1fllr0-fullview.jpg"}, 
        {id: 2, gender: "female", url: "https://i.ibb.co/HHB874n/14910.jpg"},
        {id: 3, gender: "female", url: "https://i.ibb.co/8Y51HwM/this-will-hardly-hurt-2-by-mjranum-stock-d321gkz-fullview.jpg"}
    ]
    
    dbo.collection("image-repo").insertMany(imageURLS, function(err, res) {
      if (err) throw err;
      console.log(imageURLS + "documents inserted");
      db.close();
    });
  });

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("db-images");
  dbo.collection("image-repo").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
*/

const server = app.listen(8000, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});
