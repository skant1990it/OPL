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
	$.get('/teamlist', function(data) {
		$(".scoreboard").html(data);
	});

});
//For playing team list
$(document).on("click", '#add_team', function() {

	$.get('/addTeam', function(data) {
	$(".modal-body").html(data);
	});
});
//For select playing 11 player for team 1
$(document).on("change", '#team_A_select', function() {
	$('#team1_name').val($('#team_A_select option:selected').text());
	$('#play_team1_name').val($('#team_A_select option:selected').text());
	var id = $(this).children(":selected").attr("id");

	$.get('/teamPlayer/' + id, function(data) {
		$(document).find('#player_list_A').html(data);
		console.log(data);
	});

});
//For select playing 11 player for team 2
$(document).on("change", '#team_B_select', function() {
	
	$('#team2_name').val($('#team_B_select option:selected').text());
	$('#play_team2_name').val($('#team_B_select option:selected').text());
	var id = $(this).children(":selected").attr("id");
	$.get('/teamPlayer/' + id, function(data) {
		$(document).find('#player_list_B').html(data);
	});

});

//For playing 11 setting
$(document).on("click", '#playing_11_div111', function() {

	alert("helo");
});

//For match setting
$(document).on("click", '#setting_save', function() {
	//$('#team_match_setting_div').css('display','block');
	$(".match_setting_text").attr('disabled','disabled');
	$("#setting_save").attr('disabled','disabled');
	
	
	var id=$("#match_id").val();
	if(id!='undefined'){
		$("#play_team1_name").val($("#team1_name").val());
		$("#play_team2_name").val($("#team2_name").val());
	}
	
	
});
//Save match setting details
$(document).on("click", '.setting_save', function() {
	var total_over = $('#total_over').val();
	var over_limit = $('#over_limit').val();
	$.ajax({
		url: "/savesetting",
		data: {
			team1_name:$('#team_A_select :selected').attr("id"),
			team2_name:$('#team_B_select :selected').attr("id"),
			total_over:total_over,
			over_limit:over_limit,
			match_id :$('#match_id').val(),
			
		},
		method: "POST",
		success: function(result){
			console.log("saved");
		}
	});

//$.get('/setting', function(data) {
//		$("#matchsetting").html(data);
//	});

	$("#setting_update").css('display','block');
});

$(document).on("click", '#setting_update', function() {
	$(".match_setting_text").attr('disabled',false);
	$("#setting_save").attr('disabled',false);
});

//For match setting	
$(document).on("click", '.playercheck', function() {
//	$.get('/newmatch', function(data) {
//		$(".scoreboard").html(data);
//	});
	alert($('input[name="player"]:checked').attr('id'));
	
});




