


var arrayOfUrls = []; 

const express = require("express");
const path = require("path");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.resolve("views/index.html"));
});

app.get("/gesture", function (req, res) {
  res.sendFile(path.resolve("views/gestureView.html"));
});

app.post('/getImages', async function(req, res){
  
  console.log('Ajax call succeded'); 
  var namesS = ['Tony soprano', 'Carmela Soprano', 'Meadow Soprano', 'AJ Soprano']; 

  var array = getImagesFromDB(); 
  console.log(array); 

  //res.send(arrayOfUrls);


  return 'something'; 
})
app.use(express.static("styles"));
app.use(express.static("scripts"));

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/db-images";


const server = app.listen(8000, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});

async function saveImagesLocally(result) {

  arrayOfUrls = result; 
  console.log(arrayOfUrls);

}


function getImagesFromDB(){
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("db-images");
    dbo
      .collection("repo")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log("during client call:" +  result.length);  
        saveImagesLocally(result); 
        db.close();
        return result; 
      });
  });
}