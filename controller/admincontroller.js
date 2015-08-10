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

//for strike barsman setting
exports.startMatch = function(req, res) {
	model.startMatch(req.body,res);
};