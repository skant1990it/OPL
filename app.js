
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require("body-parser");
//var app = module.exports = express.createServer();
//var app = module.exports = express();
var adduser = require('./controller/addcontroller');
var adminuser = require('./controller/admincontroller');
var favicon = require('serve-favicon');
var expressValidator = require('express-validator');
var gapi = require('./lib/gapi');
var path = require('path');
var multer = require('multer');
// var flash = require('connect-flash');
var session = require('express-session');
var cookieSession = require('cookie-session');
/* 
 * 
 * test*/
var app = module.exports = express.createServer(),
io = require('socket.io').listen(app),
parser = new require('xml2json'),
fs = require('fs');



/**/
//var csv = require('ya-csv');
// Configuration
app.use(session({
		secret: 'qwerty'
}));
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
});
app.use(function(req, res, next) { 
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'); 
	next(); 
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

app.get('/',  function(req, res) {
	if(req.session.email){
			res.render('admin/dashboard', {
			title : '',
			validAdmin : 'Yes',
		});
	}else{
		var title = 'Learning node';	
		res.redirect('/index');
	}
	
});


/* Configure the multer. */
//team info
//app.get('/teaminfo', adminuser.teamInfo);

// used to fetch home page data
app.get('/index', adduser.fetchHomePageDataForYear);
app.post('/fetchSelectedTournamentMatches', adduser.fetchSelectedTournamentMatches);
app.post('/fetchMatchDetails', adduser.fetchMatchDetails);
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
app.get('/startMatch/*', adminuser.startMatch);

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

app.get('/scoreboard/*',adminuser.fetchPlayerForMatch);
//Add news feed
app.get('/newsFeed',adminuser.newsFeed);
//for admin module

//edit match setting
app.get('/editSetting',adminuser.editSetting);
app.get('/scoreboard',adminuser.fetchPlayerForMatch);

app.get('/login',adminuser.login);

app.post('/admin',adminuser.loginuser);


app.post('/addRuns',adminuser.addRuns);

app.get('/logout',function(req,res) {
	if(req.session.email){
		req.session.destroy(function(){});	
	}
	res.redirect('/');
});

app.post('/getOverRecord',adminuser.getOverRecord);


app.post('/fetchMatchDetails',adminuser.fetchMatchDetails);
app.post('/setStartingPlayer',adminuser.setStartingPlayer);

app.get('/dashboard',adminuser.dashBoard);
function handler(req, res) {
	console.log("in handler");
  fs.readFile( 'views/pages/currentScore.ejs', function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading client.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}


//creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {
// watching the xml file
fs.watchFile('views/admin/example.xml', function(curr, prev) {
  // on file change we can read the new xml
  fs.readFile('views/admin/example.xml', function(err, data) {
    if (err) throw err;
    // parsing the new xml data and converting them into json file
    var json = parser.toJson(data);
    // send the new data to the client
    console.log(json);
    socket.volatile.emit('notification', json);
  });
});

});

var et = require('elementtree');
var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;
//var xml2js = require('xml2js');
//var xmlbuilder = require('xmlbuilder');
//var parser = new xml2js.Parser();
function readXmlFile(req){
	console.log(req);
//	console.log(Object.keys(req));
	var dataNew, etreeNew;
	dataNew = fs.readFileSync('views/admin/example.xml').toString();
	etreeNew = et.parse(dataNew);
	iframeTag = subElement(etreeNew._root, "ballId"+req.ball+"");
	var key;
	for (key in req) {
	    if (req.hasOwnProperty(key)) {
	        var value= req[key];
	        key = subElement(iframeTag, key);
	    	key.text = value;
	    }
	}    
	etree = new ElementTree(etreeNew._root);
	xml = etree.write({'xml_declaration': false});
	fs.writeFile("views/admin/example.xml",  xml, function(error) {
	    if (error) {
	      console.log(error);
	    } else {
	      console.log("The file was saved!");
	    }
	  });
}

app.post('/example', function(req, res) {
	console.log(req.body);
	 var  xml = readXmlFile(req.body);
	 console.log(xml);
    res.send(xml);     
})

app.get('/currentScore', function (req, res) {
		handler(req,res);
    
});
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


app.listen(3018, function() {
	console.log("Express server listening on port %d in %s mode",
			app.address().port, app.settings.env);
});
