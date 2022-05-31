
/*
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
*/
const express = require('express');
const path = require('path'); 
const app = express(); 

app.get('/', function(req, res){
    res.sendFile(path.resolve('views/index.html')); 
}); 

app.get('/gesture', function(req, res){
    res.sendFile(path.resolve('views/gestureView.html')); 
}); 

app.use(express.static('styles')); 
app.use(express.static('scripts')); 

const {MongoClient} = require('mongodb'); 

/*
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParses: true
}); 

const db = mongoose.connection; 
db.on('error', error => console.error(error)); 
db.once('open', () => console.log('connected')); 
*/

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


const server = app.listen(8000, function () {
    let host = server.address().address
    let port = server.address().port
    // Starting the Server at the port 3000
})



