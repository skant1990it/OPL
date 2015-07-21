/**
 * @author vikash
 */
var model = require('../model/adminmodel');
//var connection = require('../connection');
var path = require('path');	
var fs = require('fs');

exports.add = function(req, res) {
	res.render('admin/addplayer', {
		title : 'Add New User',
		errors: '',
	})
};