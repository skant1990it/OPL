var model = require('../model/addmodel');
//var connection = require('../connection');
var path = require('path');	
var fs = require('fs');
exports.addAsPlayer = function(req, res) {
//	model.fetchplayer(req.body,res);
	res.render('pages/add', {
		title : 'Add New Player',
		errors: '',
		values:''
	})
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
    if( !errors){   //No errors were found.  Passed Validation!
        res.render('pages/add', { 
        	title : 'Add New Player',
                errors: '',
                values:''
        }); 
       
        model.addplayerdata(req.body,res);
    }
    else {   //Display errors to user
        res.render('pages/add', { 
            errors: errors,
            values:req.body,
            title : 'Add New User',
        });
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