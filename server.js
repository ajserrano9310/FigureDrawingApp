
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

const {MongoClient, ServerApiVersion} = require('mongodb');
const url = "mongodb+srv://ajserrano93:1093ajss@cluster0.gxkkw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function getBooks(queryParam, res){

  console.log("the query was", queryParam);

  try{
    await client.connect();

    const db = client.db("data");
    const collection = db.collection("imageRepo");

    const query = {type:queryParam}; 
    var cursor = await collection.find(query).toArray();

    res.send(cursor);

  }finally{
    await client.close();
  }
}


app.get("/getImages", (req, res) => {

  getBooks(req.query.type, res).catch(console.dir);

});


app.use(express.static("styles"));
app.use(express.static("scripts"));
app.use(express.static("Resources"));

const server = app.listen(8000, function () {
  let host = server.address().address;
  let port = server.address().port;

});

