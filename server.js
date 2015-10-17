var express = require("express");
var app = express();
var bodyparser = require('body-parser');
var port = process.env.PORT || 3001;


var Adjective = require('./lib/adjective.js');
var Noun = require('./lib/noun.js');
var Verb = require('./lib/verb.js');

var getRandomWord = require('./lib/getrandomword.js');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/app/'));



var adjective = new Adjective();


var verb = new Verb();

var noun = new Noun();

function postWord (word, wordObject) {
  if (wordObject.hasOwnProperty(word)) {
    return {msg: 'We already have your awesome word, ' + word + ', in our list.'};
  }

  wordObject[word] = true;
  console.log(wordObject);

  return {msg: 'Thanks for submitting ' + word + '!'};
};

app.get("/", function (req,res){
   res.sendFile("index.html");
});

app.get("/verb", function (req,res){
  res.json(getRandomWord(verb));
});

app.get("/noun", function (req,res){
  res.json(getRandomWord(noun));
});

app.get("/adjective", function (req,res){
  res.json(getRandomWord(adjective));
});


app.post("/adjective", function (req,res){
  var word = postWord(req.body.word, adjective);
  res.json(word);
});

app.post("/verb", function (req,res){
  var word = postWord(req.body.word, verb);
  res.json(word);
});

app.post("/noun", function (req,res){
  var word = postWord(req.body.word, noun);
  res.json(word);
});


app.listen(port, function(){
  console.log('server started on port' + port);
});
