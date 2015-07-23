/**
 * @author vikash
 */

var connection = require('../connection');
/**
 * Call for fetch admin details from DB and validate admin
 */
exports.login = function(req,res) {
var queryString = 'SELECT * FROM admin';

connection.query(queryString, function(err, rows, fields) {

	if(req.email == rows[0].username && req.password == rows[0].password) {
		console.log("valid user");
		res.render('admin/dashboard', {
			title : rows,
			validAdmin : 'Yes'
		});
	}
	else {
		console.log("Invalid user");
		res.render('pages/index', {
			title : rows,
			validAdmin : 'No'
		});
	}
	});
	
};
/**
 * call after validation failed in admin login
 */
exports.loginErr = function(req,res,errors){
	res.render('pages/index', {
		title : errors,
		validAdmin : 'No'
	});
};
/**
 * Call for list of all player
 */
exports.listdata = function(req,res) {

	var queryString = 'SELECT * FROM player';
	
	connection.query(queryString, function(err, rows, fields) {
		res.render('admin/playingTeam', {
			team : rows
		});
		 
	});
};

/**
 * Call for list of all team
 */
exports.listdata = function(req,res) {

	var queryString = 'SELECT * FROM team';
	
	connection.query(queryString, function(err, rows, fields) {
		res.render('admin/playingTeam', {
			team : rows
		});
		 
	});
};
/**
 * Call for list all team and player on add team (Admin panel)
 */
exports.listAllPlayer = function(req,res) {

	var queryPlayer = 'SELECT * FROM player';
	var queryTeam = 'SELECT * FROM team';
	var result = {};
    var user_array = [];
    var title_array = [];
	connection.query(queryPlayer, function(err, rowsp, fields) {
		for(var i=0; i < rowsp.length; i++) {
			user_array.push( rowsp[i].first_name  );
		}
		
	});
	
	connection.query(queryTeam, function(err, rowst, fields) {
		for(var i=0; i < rowst.length; i++) {
			title_array.push(rowst[i].team_name );
		}
	});
	setTimeout(function(){
		res.render('admin/addTeam', {
			player : user_array,
			team :title_array
		});
	},1000);
};
/**
 * call for add team member
 */
exports.addTeamData = function(req,res,reqImg) {
	console.log(req);
	//var queryString = "INSERT INTO user (first_name,last_name,phone,email,address,image) values ('"+ req.f_name +"','"+ req.l_name +"','"+ req.phone +"','"+ req.email +"','"+ req.address +"','"+ reqImg.userPhoto.name +"');";
	
	console.log(queryString);
	connection.query(queryString, function(err, rows, fields) {
		res.redirect("pages/list");
//		return exports.listdata(req,res);
	});
};
/**
 * call for fetch team member(player list for particular team)
 */
exports.teamPlayer = function(data,res) {
	
	var queryString  = "SELECT * from player WHERE team_id = '"+ data +"'";
	
	console.log(queryString);
	connection.query(queryString, function(err, rows, fields) {
		console.log(rows);
		res.render('admin/playerList', {
			player : rows,
			id : data,
			errors : ''
		});
	});
};
