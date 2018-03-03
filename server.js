const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv').config();

//missing import body parser 
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//moving the api call to the back end so that I can protect the api key
app.post('/movies', function(req,res){
    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.MY_MOVIE_KEY}&s=${req.body.params}`).then(function(response){
    res.send(response.data)
  }); 
})

//missing closing parenthesis
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function (req, res) {
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
  ///missing closing parenthesis
});

app.post('/favorites', function (req, res) {
  //I do not get this data in my response
  // if(!req.body.name || !req.body.oid){
  //   res.send("Error");
  //return
  //missing curly brace at the end of the if statment
  // }
  var data = JSON.parse(fs.readFileSync('./data.json'));
  //checking if the movie is already in favorites
  for (let i = 0; i < data.length; i++) {
    if (data[i]["imdbID"] == req.body.imdbID) {
      return res.send("duplicate title");
    }
  }
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.listen(process.env.PORT || 5000);

