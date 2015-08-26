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
				teamData.push(rows.first_team_id);
				teamData.push(rows.second_team);
				teamData.push(rows.second_team_id);
			}
			else {
				teamData.push(rows.second_team);
				teamData.push(rows.second_team_id);
				teamData.push(rows.first_team);
				teamData.push(rows.first_team_id);
			}
		}
		else if(rows.second_team_id == rows.toss_won) {
			if(rows.opt_for == 'bat') {
				teamData.push(rows.second_team);
				teamData.push(rows.second_team_id);
				teamData.push(rows.first_team);
				teamData.push(rows.first_team_id);
			}
			else {
				teamData.push(rows.first_team);
				teamData.push(rows.first_team_id);
				teamData.push(rows.second_team);
				teamData.push(rows.second_team_id);
			}
		}
	}).on('end',function(){
		var batsmanData = new Array();
 		var matchDataSql = "SELECT CONCAT(IFNULL(p.first_name,'') , ' ' ,IFNULL(p.last_name,'')) as player_name, p.id player_id, sum(b.run) total_runs, count(b.id) as total_balls, SUM(IF(b.run=6,1,0)) sixes , SUM(IF(b.run=4,1,0)) fours , TRUNCATE(sum(b.run)/COUNT(b.id)*100,2) strike_rate, p.team_id FROM player as p LEFT JOIN ball AS b ON p.id = b.batsman_id WHERE p.match_id = ? GROUP BY b.batsman_id ORDER BY over_id IS NULL ASC , over_id ASC";
		var matchDataObj = connection.query(matchDataSql , [req.match_id]);
		matchDataObj.on('result', function(rows) {
			batsmanData.push({
				"player_id"  : rows.player_id,
				"total_runs" : rows.total_runs?rows.total_runs:'',
				"player_name": rows.player_name,
				"total_balls": rows.total_balls?rows.total_balls:'',
				"sixes"	: rows.total_runs?rows.sixes:'',
				"fours" : rows.total_runs?rows.fours:'',
				"strike_rate" : rows.total_runs?rows.strike_rate:'',
				"team_id" : rows.team_id,			
			});
		}).on('end',function(){
			var bowlerData = new Array();
			var matchDataSql = "SELECT CONCAT(IFNULL(p.first_name,'') , ' ' ,IFNULL(p.last_name,'')) player_name, p.id player_id, count(distinct b.over_id) overs,sum(b.run) runs,sum(b.wicket) wickets, sum(b.wide) wide, sum(b.noball) noball, TRUNCATE((sum(b.run)/COUNT(distinct b.over_id)),2) economy, p.team_id FROM player as p INNER JOIN ball AS b ON p.id = b.bowler_id WHERE p.match_id = ? GROUP BY b.bowler_id ORDER BY over_id IS NULL ASC , over_id ASC"
			var matchDataObj = connection.query(matchDataSql , [req.match_id]);
			matchDataObj.on('result', function(rows) {
				bowlerData.push({
					"player_id"  : rows.player_id,
					"overs" : rows.overs?rows.overs:0,
					"player_name": rows.player_name,
					"maiden": rows.maiden?rows.maiden:0,
					"runs"	: rows.runs?rows.runs:0,
					"wickets" : rows.wickets?rows.wickets:0,
					"economy" : rows.economy?rows.economy:0,
					"wide" : rows.wide?rows.wide:0,
					"noball" : rows.noball?rows.noball:0,		
					"team_id" : rows.team_id,		
				});
			}).on('end',function(){
				console.log(batsmanData);
				res.render('pages/scoreboardTemplate', {
					teamData : teamData,
					batsmanData : batsmanData,
					bowlerData : bowlerData,
				});
			});
		});	
		
	});
   	
};

