/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require("body-parser");
var app = module.exports = express.createServer();
var adduser = require('./controller/addcontroller');
var adminuser = require('./controller/admincontroller');
var favicon = require('serve-favicon');
var expressValidator = require('express-validator');
var  gapi = require('./lib/gapi');
var path = require('path');
var multer = require('multer');
var flash = require('connect-flash');
var session = require('express-session');
var cookieSession = require('cookie-session');
//var csv = require('ya-csv');
// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	app.use(expressValidator());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
	app.use(express.static(__dirname + '/uploads'));
	app.use(express.bodyParser({uploadDir:'/uploads'}));
	app.use(flash());
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
	var session = req.session;
	console.log(session);
	var title = 'Learning node';
	res.render('pages/index', {
		title : title,
		url: gapi.url
	});
});


/* Configure the multer. */
//team info
//app.get('/teaminfo', adminuser.teamInfo);

//Player list
app.get('/list', adduser.playerList);
//Team list
app.get('/teamlist', adminuser.teamList);
app.get('/teamname', adminuser.teamName);
//Team add
app.get('/addTeam', adminuser.teamAdd);
app.post('/addTeambbbb', adminuser.teamAddData);
//add team player
app.get('/teamPlayer/*', adminuser.teamPlayer);
//match setting
app.get('/setting', adminuser.matchSetting);
//save and update Match Setting
app.post('/savesetting', adminuser.saveMacthSetting);
//get match id
app.get('/getMatchId', adminuser.getmatchId);
//new match setting
app.get('/newmatch', adminuser.newMatch);

//for playing 11 player setting
app.post('/playing11', adminuser.playing11);

//for strike batsman setting 
app.get('/startMatch', adminuser.startMatch);

//for add as player form in add ciontroller
app.get('/addAsPlayer',adduser.addAsPlayer);
//for player data add
app.post('/addPlayerData',adduser.addPlayerData);
//toss match 
app.get('/tossMatch',adminuser.tossMatch);
app.post('/tossUpdateData',adminuser.tossUpdateData);

app.get('/deleteuser/*', adduser.deletedata);
app.post('/updatedata', adduser.updatedata);
//fetch player data for display and selection on add team view
app.post('/fetchPlayer', adminuser.fetchPlayer);
//assign player to a team
app.post('/assignPlayerToTeam', adminuser.assignPlayerToTeam);
//manage tournament setting
app.get('/tournamentSetting', adminuser.tournamentSetting);
//fetch the data for the selected month
app.post('/fetchSelectedYearData', adminuser.fetchSelectedYearData);
app.post('/saveTournamentData', adminuser.saveTournamentData);
app.post('/saveTeamData', adminuser.saveTeamData);

app.get('/scoreboard',adminuser.fetchPlayerForMatch);

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


app.post('/getOverRecord',adminuser.getOverRecord);


app.post('/fetchMatchDetails',adminuser.fetchMatchDetails);
app.post('/setStartingPlayer',adminuser.setStartingPlayer);


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

app.listen(3004, function() {
	console.log("Express server listening on port %d in %s mode",
			app.address().port, app.settings.env);
});
