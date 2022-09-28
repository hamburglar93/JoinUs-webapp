// REQUIRING EXPRESS FRAMEWORK, MYSQL
var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({extended: true}));


//SETTING EJS TEMPLATE FOR HTML FORMATTING, SETTING THE BODYPARSER
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));



//MYSQL CONNECTION TO JOIN US DATABASE
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	database : 'join_us'
});


// HOME PAGE - SETS THE FUNCTION FOR # OF USERS AND PULLS THE COUNT SQL QUERY
app.get("/", function(req, res){
	// Find count of users in DB
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(err, results){
		if (err) throw err;
		var count = results[0].count;
		res.render("home", {data: count});
		// res.send("We have " + count + " users already signed up. Join the team!");
	});
});


app.post("/register", function(req, res){
	var person = {
		email: req.body.email
	};
	connection.query('INSERT INTO users SET ?', person, function(err, results){
		if(err) throw (err);
		res.redirect("/");
	});
});




//JOKE PAGE
app.get("/joke", function(req, res){
	res.send("Why did the mushroom get invited to the party? BECAUSE HE IS A FUNGI! HAHAHHAAHAHAHAHAH");
});



//LUCKY NUMBER PAGE
app.get("/random_num", function(req, res){
	var num = Math.floor(Math.random()*10) +1;
	res.send("Your Lucky Number is " + num);
});


// LETS US KNOW SERVER IS UP AND RUNNING
app.listen(8080, function(){
	console.log("Server Running on Port 8080");
});


