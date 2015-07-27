/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var bodyParser = require("body-parser");
var app = module.exports = express.createServer();
var adduser = require('./controller/addcontroller');
var adminuser = require('./controller/admincontroller');
var favicon = require('serve-favicon');
var expressValidator = require('express-validator');
var  gapi = require('./lib/gapi');
var path = require('path');

//var csv = require('ya-csv');
// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	app.use(expressValidator());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
	app.use(express.static(__dirname + '/uploads'));
	app.use(express.bodyParser({uploadDir:'/uploads'}));

});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// Routes
app.get('/', function(req, res) {
	var title = 'Learning node';
	res.render('pages/index', {
		title : title,
		url: gapi.url
	});
});



/* Configure the multer. */



//Player list
app.get('/list', adminuser.playerList);
//Team list
app.get('/teamlist', adminuser.teamList);
//Team add
app.get('/addTeam', adminuser.teamAdd);
app.post('/addTeam', adminuser.teamAddData);
//add team player
app.get('/teamPlayer/*', adminuser.teamPlayer);

app.get('/edituser/*', adduser.edit);
app.get('/deleteuser/*', adduser.deletedata);
app.post('/updatedata', adduser.updatedata);
app.get('/listapi', adduser.listapi);


//for admin module

app.get('/admin', function(req, res) {
	var title = 'Admin Panel';
	res.render('admin/index', {
		title : title,
		url: gapi.url
	});
});
app.get('/login',adminuser.login);

app.post('/admin',adminuser.loginuser);

app.post('/addRuns',adminuser.addRuns);


app.post('/upload/group', function(req, res) {
    console.log('File name is ' + req.files.groupfile.name);
    console.log('File size is ' + req.files.groupfile.size);
    console.log('File size is ' + req.files.groupfile.path);
    var reader = csv.createCsvFileReader(req.files.groupfile.path, {
                                            'separator': ',',
                                            'quote': '"',
                                            'escape': '"',   
                                            'comment': ''
                                         });
    reader.addListener('data', function(data) {
            console.log(data);
    });
});


app.listen(3000, function() {
	console.log("Express server listening on port %d in %s mode",
			app.address().port, app.settings.env);
});
