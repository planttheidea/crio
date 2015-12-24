// create express app
var express = require("express");
var app = express();
var server = require("http").createServer(app);

// defaults
process.env.HOSTNAME = process.env.NODE_ENV === "production" ? "some.nice.url" : "localhost";
process.env.PORT = 3000;
process.env.WEBPACK_PORT = 4000;

// app defaults
app.set("views", __dirname + "/test/views");
app.set("view engine", "ejs");

// direct routes
app.get("*", function(req, res) {
    res.render("index")
});

// listen
server.listen(process.env.PORT, function (err) {
    if (err) {
        console.log(err);
    }

    console.log("Listening on port " + process.env.PORT);
});