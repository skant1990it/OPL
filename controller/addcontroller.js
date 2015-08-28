var model = require('../model/addmodel');
//var connection = require('../connection');
var path = require('path');	
var fs = require('fs');
exports.addAsPlayer = function(req, res) {
	model.addAsPlayer(req.body,res);
	
};
exports.addPlayerData = function(req, res) {

	req.assert('f_name', 'First Name is required').notEmpty();      
	req.assert('l_name', 'Last Name is required').notEmpty(); 
	req.assert('oss_id', 'OSSCube Id  is required').notEmpty();
	req.assert('phone', 'Phone is required').notEmpty();   
    req.assert('email', 'A valid email is required').isEmail();  
    req.assert('address', 'Address is required').notEmpty();

    var errors = req.validationErrors();  
    console.log(errors);
    if(errors == false){   //No errors were found.  Passed Validation!
    	  var array = req.body.email_list.split(',');
        for(var i=0 ; i<array.length; i++) {
        	if(array[i] == req.body.email) {
        		var flag = "1";
        		var obj = {};
        		obj.param='email';
        		obj.msg='Email is already registerd';
        		obj.value ='';
        		var errors = [];
        		errors.push(obj);
        		res.send(errors);
        	} 
        	else {
        		var flag = "0";
        	}
        }
        if(flag == '0') {
        	  model.addplayerdata(req.body,res);
        } 
    }
    else {   //Display errors to user
        res.send(errors);
    }
	
};
exports.playerList = function(req, res) {
	model.listPlayer(req,res);
};


exports.listapi = function(req, res) {
	model.listdataapi(req,res);
};
exports.edit = function(req, res) {
	model.editdata(req.params,res);
};
exports.updatedata = function(req, res) {
	model.updatedata(req.body,res,req);
};
exports.deletedata = function(req, res) {
	model.deletedata(req.params,res,req);
};

exports.fetchHomePageDataForYear = function(req, res) {
    console.log("hello");
    model.fetchHomePageDataForYear(req.params,res);
};
exports.fetchSelectedTournamentMatches = function(req, res) {
    model.fetchHomePageDataForYear(req.body,res);
};
exports.fetchMatchDetails = function(req, res) {
    model.fetchMatchDetails(req.body,res);
};