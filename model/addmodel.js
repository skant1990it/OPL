var connection = require('../connection');
exports.listPlayer = function(req,res) {

	var queryString = 'SELECT * FROM player';
	
	connection.query(queryString, function(err, rows, fields) {
//		console.log(rows);
		res.render('pages/list', {
			title : rows
		});
		 
	});
};


exports.addAsPlayer = function(req,res) {
	var email = [];
	var queryString = connection.query("SELECT * FROM player");
	queryString.on('result', function(rows) {
		//console.log(rows.email);
		email.push(rows.email);
	}).on('end',function(){
		res.render('pages/add', {
			title : 'Add New Player',
			errors: '',
			values:'',
			email: email,
		})
	});
};

exports.listdataapi = function(req,res) {

	var queryString = 'SELECT * FROM user';
	
	connection.query(queryString, function(err, rows, fields) {
		res.send(rows);
		 
	});
};

exports.addplayerdata = function(req,res,reqImg) {

	var queryString = "INSERT INTO player (first_name,last_name,oss_id,phone,email,address,team_id) values ('"+ req.f_name +"','"+ req.l_name +"','"+ req.oss_id +"','"+ req.phone +"','"+ req.email +"','"+ req.address +"','0');";
	
	console.log(queryString);
	var playerListstring = "SELECT * FROm Player";
	connection.query(queryString, function(err, rows, fields) {
		res.render('pages/list', {
			title : rows
		});

	});
	
};

exports.editdata = function(data,res) {
	
	var queryString  = "SELECT * from user WHERE id = '"+ data +"'";
	
	console.log(queryString);
	connection.query(queryString, function(err, rows, fields) {
		console.log(rows);
		res.render('pages/add', {
			title : rows,
			id : data,
			errors : ''
		});
	});
};

exports.updatedata = function(data,res,req) {
	
	var queryString  = "UPDATE user set first_name  = '"+ data.f_name +"',last_name = '"+ data.l_name +"',phone = '"+ data.phone +"',email = '"+ data.email +"',address = '"+ data.address +"'  WHERE id = "+ data.id +"";
	
	console.log(queryString);
	connection.query(queryString, function(err, rows, fields) {
		console.log(rows);
		res.redirect("pages/list");
	});
};
exports.deletedata = function(data,res,req) {
	
	var queryString  = "DELETE  from user WHERE id = '"+ data +"'";
	
	console.log(queryString);
	connection.query(queryString, function(err, rows, fields) {
		console.log(rows);
		res.redirect("pages/list");
		//return exports.listdata(req,res);
	});
};

exports.fetchHomePageDataForYear = function(data,res) {
	var teamArray = new Array();
	var matchData = new Array();
	var tournamentData = new Array();
	var distinctYear = new Array();
	var year = new Date().getFullYear();
	if(typeof data.tournament_year != "undefined") {
		year = data.tournament_year;
	}
	var teamSql = "SELECT te.id, te.team_name FROM tournament as t LEFT JOIN team as te ON te.tournament_id = t.id WHERE t.tournament_year = ?";
	var teamObj = connection.query(teamSql , [year]);
	teamObj.on('result', function(rows) {
		teamArray[rows.id] = rows.team_name;
	}).on('end',function(){
		var matchSql = "SELECT mi.id,t.tournament_name, t.tournament_year,mi.first_team,mi.second_team FROM team as te INNER JOIN match_info as mi ON te.id = mi.first_team RIGHT JOIN tournament as t ON te.tournament_id = t.id";
		console.log(matchSql);
		var matchObj = connection.query(matchSql);
		matchObj.on('result', function(rows) {
			if(rows.tournament_year == year) {
				matchData.push({
					first_team: teamArray[rows.first_team],
					second_team: teamArray[rows.second_team],
					match_id: rows.id,
					tournament_name: rows.tournament_name +" - "+rows.tournament_year,
					tournament_year: rows.tournament_year,
				});
			}
			else {
				if(distinctYear.indexOf(rows.tournament_year) == -1) {
					tournamentData.push({
						match_id: rows.id,
						tournament_name: rows.tournament_name +" - "+rows.tournament_year,
						tournament_year: rows.tournament_year,
					});
					distinctYear.push(rows.tournament_year);
				}
				
			}
		}).on('end',function(){
			if(typeof data.tournament_year != "undefined") {
				res.send(matchData);
			}
			else {
				console.log(tournamentData);
				res.render('pages/index', {
					matchList : matchData,
					tournamentData : tournamentData,
				});
			}
			
		});
	});
};
exports.fetchMatchDetails = function(req, res) {
	var teamData = new Array();
	var teamSql = "SELECT  mi.first_team as first_team_id, mi.second_team as second_team_id,mi.opt_for, mi.toss_won, t1.team_name AS first_team, t2.team_name AS second_team FROM match_info AS mi INNER JOIN team as t1 ON mi.first_team = t1.id INNER JOIN team as t2 ON mi.second_team = t2.id  WHERE mi.id = ?";
	var teamObj = connection.query(teamSql , [req.match_id]);
	teamObj.on('result', function(rows) {
		if(rows.first_team_id == rows.toss_won) {
			if(rows.opt_for == 'bat') {
				teamData.push(rows.first_team);
				teamData.push(rows.second_team);
			}
			else {
				teamData.push(rows.second_team);
				teamData.push(rows.first_team);
			}
			
		}
		else if(rows.second_team_id == rows.toss_won) {
			if(rows.opt_for == 'bat') {
				teamData.push(rows.second_team);
				teamData.push(rows.first_team);
			}
			else {
				teamData.push(rows.first_team);
				teamData.push(rows.second_team);
			}
		}
		
	}).on('end',function(){
		console.log(teamData);
		res.render('pages/scoreboardTemplate', {
			teamData : teamData,
		});
	});
   	
};

