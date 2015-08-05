var model = require('../model/addmodel');
//var connection = require('../connection');
var path = require('path');	
var fs = require('fs');
exports.addAsPlayer = function(req, res) {
	res.render('pages/add', {
		title : '',
		errors: '',
	})
};
exports.adddata = function(req, res) {
	console.log(req.files);
	req.assert('f_name', 'Name is required').notEmpty();      
	req.assert('l_name', 'Name is required').notEmpty();      
	req.assert('phone', 'Phone is required').notEmpty();   
	req.assert('email', 'Email is required').notEmpty();
    req.assert('email', 'A valid email is required').isEmail();  
    req.assert('address', 'Address is required').notEmpty();
    
    var errors = req.validationErrors();  
    if( !errors){   //No errors were found.  Passed Validation!
        res.render('pages/add', { 
        	title : 'Add New User',
                errors: '',
        }); 
        var tempPath = req.files.userPhoto.path,
        targetPath = path.resolve('./uploads/'+req.files.userPhoto.name);
    if (path.extname(req.files.userPhoto.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
        
        
        model.adddata(req.body,res,req.files);
    }
    else {   //Display errors to user
        res.render('pages/add', { 
            errors: errors,
            title : 'Add New User',
        });
    }
	
};
exports.list = function(req, res) {
	model.listdata(req,res);
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