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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});


//{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}

// your first API endpoint...
app.get(["/api/:date", "/api"], function (req, res) {
    let newDate = req.params.date ? req.params.date : new Date();
    if (!!Number(newDate)) {
        let utc = new Date(Number(newDate) );
        res.json({"unix": newDate, "utc": utc.toUTCString()}
        );
    } else {
        try {
            let date = new Date(newDate);
            if (isNaN(date)) throw  "Invalid Date";
            let unix = Math.floor(date.getTime())
            res.json({"unix": unix, "utc": date.toUTCString()}
            );
        } catch (e) {
            console.log(e);
            res.json({error: e})
        }
    }

});


// listen for requests :)
var listener = app.listen(63752, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
