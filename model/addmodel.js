var connection = require('../connection');
exports.listPlayer = function(req,res) {

	var queryString = 'SELECT * FROM player';
	
	connection.query(queryString, function(err, rows, fields) {
		console.log(rows);
		res.render('pages/list', {
			title : rows
		});
		 
	});
};

exports.listdataapi = function(req,res) {

	var queryString = 'SELECT * FROM user';
	
	connection.query(queryString, function(err, rows, fields) {
		res.send(rows);
		 
	});
};

exports.addplayerdata = function(req,res,reqImg) {

	var queryString = "INSERT INTO player (first_name,last_name,oss_id,phone,email,address) values ('"+ req.f_name +"','"+ req.l_name +"','"+ req.oss_id +"','"+ req.phone +"','"+ req.email +"','"+ req.address +"');";
	
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




