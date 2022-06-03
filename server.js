
const express = require("express");
const path = require("path");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.resolve("views/index.html"));
});

app.get("/gesture", function (req, res) {
  res.sendFile(path.resolve("views/gestureView.html"));
});

app.get("/own-set", function (req, res) {
  res.sendFile(path.resolve("views/practice-nofiles.html"));
});

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/db-images";

/**
 * Ajax call
 */
app.get("/getImages", (req, res) => {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("db-images");
    dbo
      .collection("repo")
      .find({})
      .toArray(function (err, result) {
        if (err){
          console.log("there was an error with the db call"); 
          throw err;
        } 
        console.log("db call was a success");
        res.send(result)
        db.close();
      });
  });
});


app.use(express.static("styles"));
app.use(express.static("scripts"));
app.use(express.static("Resources"));

const server = app.listen(8000, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});

