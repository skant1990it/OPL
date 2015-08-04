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

//get match setting data
exports.getmatchSetting = function(req,res) {
	var myDate = new Date();
	var matchDate = (myDate.getFullYear())+ '-' +(myDate.getMonth()+1)+ '-' +(myDate.getDate()) ;
	var queryString = 'SELECT * FROM match_info where match_date  = "'+ matchDate +'" order by id desc limit 1';
	console.log(queryString);
	connection.query(queryString, function(err, rows, fields) {
		if(!rows[0]) {
			res.render('admin/matchInfo', {
				matchId : '',
				newMatch : 'Yes'
			});
		}
		else {
			res.render('admin/matchInfo', {
				matchId : rows,
				newMatch : 'No'
			});
		}
	});
};
//save and update match setting
exports.saveMacthSetting = function(req,res) {
	var myDate = new Date();
	var matchDate = (myDate.getFullYear())+ '-' +(myDate.getMonth()+1)+ '-' +(myDate.getDate()) ;
	if(!req.match_id) {
		var queryString = "INSERT INTO match_info (total_over,over_limit,match_date) values ('"+ req.total_over +"','"+ req.over_limit +"','"+ matchDate +"');";
	}
	else {
		var queryString = "UPDATE match_info SET total_over ='"+ req.total_over +"' ,over_limit='"+ req.over_limit +"' where id = '"+ req.match_id +"'";
	}
	connection.query(queryString, function(err, rows, fields) {
	});
};
//getmatchIdgetmatchSetting
exports.getmatchId = function(req,res) {
	var queryString = 'SELECT id FROM match_info order by id desc limit 1';
	connection.query(queryString, function(err, rows, fields) {
		console.log(rows);
		res.render('admin/matchInfo', {
			matchId : rows
		});
	});
};



exports.addRuns = function(req,res) {
	var extraColumnName="",extraValue=0;
	if(req.extraruns=='0'){
			var queryString = "INSERT into ball " +
			  "(over_id,run,score,batsman_id,ball_id)" +
			  " values ('"+req.over+"','"+req.gainedruns+"','"+req.gainedruns+"','"+req.batsman_id+"','"+req.ball+"' )";
		}else{
			var score ;
			if(req.extratype == "wicket"){
				score = '0';
			}else{
				score =  parseInt(req.gainedruns)+1;
			}
			var queryString = "INSERT into ball " +
			  "(over_id,"+req.extratype+",run,score,batsman_id,ball_id)" +
			  " values ('"+req.over+"','1' ,'"+req.gainedruns+"','"+score+"','"+req.batsman_id+"','"+req.ball+"'  )";
		}

	connection.query(queryString, function(err, rows, fields) {
		
	});
	res.send(req);
};
