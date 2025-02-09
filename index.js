// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/:timestamp", function (req, res) {
  const dateRegex = /[0-9]{13}/;

  const inDate = dateRegex.test(req.params.timestamp) == true ? (new Date(parseInt(req.params.timestamp))) :(new Date(req.params.timestamp));

  if(inDate.toString() == 'Invalid Date'){
    res.json({ error : "Invalid Date" });
  }
  else {
    res.json({unix: inDate.getTime(), utc: inDate.toUTCString()});
  }
  
});

app.get("/api", function (req, res) {
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
