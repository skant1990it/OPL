/**
 * @author vikash
 */
var model = require('../model/adminmodel');
//var connection = require('../connection');
var path = require('path');	
var fs = require('fs');

exports.playerList = function(req, res) {
	model.listdata(req,res);
};

exports.teamList = function(req, res) {
	model.listTeam(req,res);
};

exports.login = function(req, res) {
	res.render('admin/login', {
		title : '',
		errors: '',
	})
};

exports.loginuser = function(req, res) {
    req.assert('email', 'A valid email is required').isEmail();  
    req.assert('password', 'Password is required').notEmpty();
    
    var errors = req.validationErrors();  
    console.log(errors);
    if( !errors){   //No errors were found.  Passed Validation! 
        model.login(req.body,res);
    }
    else {   //Display errors to user
    	model.loginErr(req.body,res,errors);
    }
  
};

exports.teamAdd = function(req, res) {
	model.listAllPlayer(req,res);
		
};
exports.teamAddData = function(req, res) { 
    model.addTeamData(req.body,res);
};

exports.teamName = function(req, res) { 
    model.getTeamName(req.body,res);
};
exports.teamPlayer = function(req, res) {
	model.teamPlayer(req.params,res);
};

exports.addRuns = function(req, res) {
	console.log(req.body);
		model.addRuns(req.body,res);
};

exports.matchSetting = function(req, res) {
	model.getmatchSetting(req.params,res);
//	res.render('admin/matchInfo', {
//		matchId : ''
//	})
};
//save match setting  
exports.saveMacthSetting = function(req, res) {
    model.saveMacthSetting(req.body,res);
};
//get match Id
exports.getmatchId = function(req, res) {
	model.getmatchId(req.params,res);
};

//new match setting form
exports.newMatch = function(req, res) {
	res.render('admin/matchInfo', {
		matchId : '',
		newMatch : 'Yes'
	})
};

exports.fetchPlayer = function(req, res) {
    model.fetchPlayer(req.body,res);
};

exports.assignPlayerToTeam = function(req, res) {
    model.assignPlayerToTeam(req.body,res);
};
//for playing 11 team select
exports.playing11 = function(req, res) {
    model.playing11Team(req.body,res);
};

exports.getOverRecord = function(req, res) {
	model.getOverRecord(req.body,res);
};

exports.tournamentSetting = function(req, res) {
	model.tournamentSetting(req.params,res);
};

exports.fetchSelectedYearData = function(req, res) {
	model.fetchSelectedYearData(req.body,res);
};

exports.saveTournamentData = function(req, res) {
	req.assert('tournament_name', 'Invalid Tournament Name').notEmpty();
	req.assert('no_of_teams', 'Invalid No Of Teams').notEmpty().isInt();
	req.assert('max_number_of_players', 'Invalid Max No Of Players').notEmpty().isInt();
	var errors = req.validationErrors();
	
	if( !errors){
		model.saveTournamentData(req.body,res);
	}
    else {
    	errors[errors.length] = {isError : 1};
    	res.send(errors);
    }
};

exports.saveTeamData = function(req, res) {
	//Object.keys(req.body).length;  # to find object length
	for(var i = 0; i < req.body.total_rows; i ++) {
		req.assert('team_name_'+i, 'Invalid Team Name').notEmpty();
		req.assert('captain_'+i, 'Invalid Captain').notEmpty();
	}
	var errors = req.validationErrors();
	if(!errors){
		model.saveTeamData(req.body,res,req.files);
	}
	else {
		res.send(errors);
	}
};

//for strike barsman setting
exports.startMatch = function(req, res) {
	model.startMatch(req.body,res);
};

exports.fetchMatchDetails = function(req, res) {
	model.fetchMatchDetails(req.body,res);

};
//for toss of match setting 
exports.tossMatch = function(req, res) {
	model.tossMatch(req.body,res);
};
exports.tossUpdateData = function(req, res) {
	model.tossUpdateData(req.body,res);
};
exports.fetchPlayerForMatch = function(req,res){
	model.fetchPlayerForMatchModel(req.params,res);
};

