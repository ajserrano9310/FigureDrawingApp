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

const server = app.listen(8000, function () {
    let host = server.address().address
    let port = server.address().port
    // Starting the Server at the port 3000
})



