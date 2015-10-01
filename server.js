var express = require("express");
var app = express();

var port = process.env.PORT || 3001;








var Adjective = function() {
 this.Hungry = true;
 this.Crazy = true;
 this.PMSing = true;
 this.Lazy = true;
 this.Amazing = true;
};

var adjective = new Adjective();

function getRandomWord (object) {
 var propArray = Object.keys(object);
  var randomProp = propArray[Math.floor(Math.random() * propArray.length)];
  return {word: randomProp};
}


app.get("/", function (req,res){
  res.send("Hello Universe yes");
});

app.get("/adjective", function (req,res){
  res.json(getRandomWord(adjective));
});



app.listen(port, function(){
  console.log('server started on port' + port);
});
