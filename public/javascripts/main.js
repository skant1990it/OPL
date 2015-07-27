/**
 * @author vikash
 */

function deleteUser(id) {
	var del = confirm("Are you confirm?");
	if (del == true) {
		$.get('/deleteuser/' + id + '');
		$.get('/list', function(data) {
			$(document).find('body').html(data);
		});
	}
}
$(document).on("click", '#add_new', function() {

	$.get('/add', function(data) {
		$(".jumbotron").html(data);
	});
});
$(document).on("click", '#list_view', function() {
	$.get('/list', function(data) {
		$(".jumbotron").html(data);
	});
});


//For admin login 

$(document).on("click", '#admin', function() {

	$.get('/login', function(data) {
		$(".modal-body").html(data);
	});
});

$(document).on("click", '#dash_admin', function() {

	$.get('/admin', function(data) {
		$(".scoreboard").html(data);

	});
});

//For playing team list
$(document).on("click", '#playing_team', function() {

	$.get('/list', function(data) {
		$(".scoreboard").html(data);
	});
});
//For playing team list
$(document).on("click", '#add_team', function() {

	$.get('/addTeam', function(data) {
		console.log(data);
	$(".modal-body").html(data);
	});
});
//For select playing 11 player for team 1
$(document).on("change", '#playing_team_A_select', function() {
	var id = $(this).val();
	var second_team = $('#playing_team_B_select').val();
	if(second_team == id) {
		alert("This team is already selected for Today match");
		return false;
	} 
	else {
		$.get('/teamPlayer/' + id, function(data) {
			$(document).find('#player_list_A').html(data);
		});
	}
});
//For select playing 11 player for team 2
$(document).on("change", '#playing_team_B_select', function() {
	var first_team = $('#playing_team_A_select').val();
	var id = $(this).val();
	if(first_team == id) {
		alert("This team is already selected for Today match");
		return false;
	} 
	else {
		$.get('/teamPlayer/' + id, function(data) {
			$(document).find('#player_list_B').html(data);
		});
	}
});

//For match setting
$(document).on("click", '#match_setting', function() {
	$.get('/setting', function(data) {
		$(".scoreboard").html(data);
	});
});
//Save match setting details
$(document).on("click", '.setting_save', function() {
	$('.setting_update').show();
	var data = $('#match_setting_form').serialize();
	$.ajax({
		url: "/savesetting",
		data: data,
		method: "POST",
		success: function(result){
			console.log("kllkjlj");
		}
	});
	$(".match_setting_text").attr('disabled','disabled');
	$("#setting_update").css('display','block');
	$("#setting_save").attr('disabled','disabled');
});

$(document).on("click", '#setting_update', function() {
	$("#update_setting_btn").css('display','block');
	$("#setting_save").hide();
	$(".match_setting_text").attr('disabled',false);

});

//For match setting	
$(document).on("click", '#new_match', function() {
	$.get('/newmatch', function(data) {
		$(".scoreboard").html(data);
	});
});






