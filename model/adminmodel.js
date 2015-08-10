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
exports.listTeam = function(req,res) {
	
	
//	var myDate = new Date();
//	var matchDate = (myDate.getFullYear())+ '-' +(myDate.getMonth()+1)+ '-' +(myDate.getDate()) ;
//	
	var match_info_query = connection.query('SELECT * FROM match_info order by id desc limit 1');
	var playerid1 = [];
	var playerid2 = [];
	var team = [];
	var count = '';
	var team1_name = '';
	var team2_name = '';
	match_info_query .on('result', function(row) {
	 if(row=='' ){
			count = "null";
		}else{
			count = row;
		}
	  }).on('end', function() {
	 	var team1_player_query = connection.query("SELECT * FROM player where team_id = '"+ count.first_team +"'");
		team1_player_query .on('result', function(row) {
			  playerid1.push({"id":row.id,"name":row.first_name});
			  });
		
		var team2_player_query = connection.query("SELECT * FROM player where team_id = '"+ count.second_team +"'");
		team2_player_query .on('result', function(row) {
			  playerid2.push({"id":row.id,"name":row.first_name});
			 
			  });
		
		var team1_query = connection.query("SELECT team_name FROM team where id = '"+ count.first_team +"'");
		team1_query.on('result', function(row) {
			team1_name = row.team_name;
			  });
		
		var team2_query = connection.query("SELECT team_name FROM team where id = '"+ count.second_team +"'");
		team2_query.on('result', function(row) {
			team2_name = row.team_name;
			  });
		
		var team_query = connection.query("SELECT * FROM team");
		team_query .on('result', function(row) {
		team.push(row);
			}).on('end',function(){
			  res.render('admin/showSetting', {
					team : team, 
					matchId : count,
					newMatch : 'Yes',
					playerlist1 : playerid1,
					playerlist2 : playerid2,
					team1_name : team1_name,
					team2_name : team2_name
			});
		 });
		
		  // all rows have been received 
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
    var assigned_user_array = [];
    var title_array = [];
	connection.query(queryPlayer, function(err, rowsp, fields) {
		for(var i=0; i < rowsp.length; i++) {
			if(rowsp[i].team_id == 0) {
				user_array.push(rowsp[i].id);
				user_array.push(rowsp[i].first_name);
			}
			else {
				assigned_user_array.push(rowsp[i].team_id);
				assigned_user_array.push(rowsp[i].id);
				assigned_user_array.push(rowsp[i].first_name);
			}
		}
		
	});
	
	connection.query(queryTeam, function(err, rowst, fields) {
		for(var i=0; i < rowst.length; i++) {
			title_array.push(rowst[i].id );
			title_array.push(rowst[i].team_name );
		}
	});
	setTimeout(function(){
		res.render('admin/addTeam', {
			player: user_array,
			team: title_array,
			assigned_player: assigned_user_array
		});
	},1000);
};
/**
 * call for add team member
 */
exports.addTeamData = function(req,res,reqImg) {
	//var queryString = "INSERT INTO user (first_name,last_name,phone,email,address,image) values ('"+ req.f_name +"','"+ req.l_name +"','"+ req.phone +"','"+ req.email +"','"+ req.address +"','"+ reqImg.userPhoto.name +"');";
	
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
	
	connection.query(queryString, function(err, rows, fields) {
		console.log(rows);
		res.render('admin/playerList', {
			player : rows,
			id : data,
			errors : ''
		});
//		res.send(rows);
	});
};

//get match setting data
exports.getmatchSetting = function(req,res) {
	var myDate = new Date();
	var matchDate = (myDate.getFullYear())+ '-' +(myDate.getMonth()+1)+ '-' +(myDate.getDate()) ;
	var queryString = 'SELECT * FROM match_info where match_date  = "'+ matchDate +'" order by id desc limit 1';
	connection.query(queryString, function(err, rows, fields) {
	console.log("r"+rows[0].id);
			res.render('admin/matchInfo', {
				matchId : rows,
				newMatch : 'Yes'
			});
	});
};
//save and update match setting
exports.saveMacthSetting = function(req,res) {
//	var myDate = " NOW();
//	console.log(myDate);
//	var matchDate = (myDate.getFullYear())+ '-' +(myDate.getMonth()+1)+ '-' +(myDate.getDate()) ;
	var uniqueId = '';
	var uuid = "select uuid() as record_id";
	connection.query(uuid, function(err, rows, fields) {
//		console.log("uid"+rows[0]['record_id']);
//		uniqueId.push(rows[0]['record_id']);
		uniqueId = rows[0]['record_id'];
	}).on('end',function(){
		  console.log("bbbbb"+uniqueId.record_id);
		  if(!req.match_id) {
				console.log("insert"+uniqueId);
				var queryString = "INSERT INTO match_info (id,first_team,second_team,total_over,over_limit,match_date) " +
						"values ('"+ uniqueId +"','"+ req.team1_name +"','"+ req.team2_name +"','"+ req.total_over +"','"+ req.over_limit +"',NOW());";
			}
			else {
				console.log("update");
				var queryString = "UPDATE match_info SET total_over ='"+ req.total_over +"' ,over_limit='"+ req.over_limit +"' ,first_team='"+ req.team1_name +"',second_team='"+ req.team2_name +"' where id = '"+ req.match_id +"'";
				console.log(queryString);
			}
			
			connection.query(queryString, function(err, rows, fields) {
				res.send(rows);
			});
	 });
	

};
//getmatchIdgetmatchSetting
exports.getmatchId = function(req,res) {
	var queryString = 'SELECT id FROM match_info order by id desc limit 1';
	connection.query(queryString, function(err, rows, fields) {
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
		res.send(req);
	});
	
};
exports.getTeamName = function(req,res) {
	var queryStringTeam = 'SELECT * FROM team';
	
	connection.query(queryStringTeam, function(err, rows, fields) {
		res.render('admin/playingTeam', {
			team : rows,
			matchId : '',
			newMatch : 'Yes'
		});
});
};
/**
 * fetch the player data for add team view
 */
exports.fetchPlayer = function(req,res) {

	var queryPlayer = 'SELECT * FROM player WHERE first_name like "%'+req.player_name+'%" and team_id = 0';
    var user_array = [];
	var abc = connection.query(queryPlayer, function(err, rowsp, fields) {
		for(var i=0; i < rowsp.length; i++) {
			user_array.push(rowsp[i].id);
			user_array.push(rowsp[i].first_name);
		}
		res.send(JSON.stringify(user_array));
	});
};

exports.assignPlayerToTeam = function(data,res) {
	var queryString = "UPDATE player SET team_id ='"+ data.team_id +"' where id = '"+ data.player_id +"'";
	connection.query(queryString);
};
//for playing 11 team select
exports.playing11Team = function(data,res) {
	console.log("modeldata"+data.player11_id[0]);
	for(var i =0; i <=data.player11_id.length; i++) {
		var queryString = "UPDATE player SET match_id ='"+ data.match_id +"' where id = '"+ data.player11_id[i] +"'";
		connection.query(queryString, function(err, rows, fields) {
			res.send(rows);
		});
	}
};


exports.startMatch = function(req,res) {
	var queryString = 'SELECT id FROM match_info order by id desc limit 1';
	connection.query(queryString, function(err, rows, fields) {
		console.log(rows[0].id);
		res.render('admin/startMatch', {
			matchId : rows[0].id
		})
	});
};