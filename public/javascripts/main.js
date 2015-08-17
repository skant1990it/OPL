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
$(document).on("click", '#add_new_player', function() {
	$.get('/addAsPlayer', function(data) {
		$(".modal-body").html(data);
	});
	$.get('/list', function(data) {
		$(".jumbotron").html(data);
	});
});

$(document).on("click", '#playeradd', function() {
	var formData = $('#form_id').serializeArray();
	$.ajax({
		url: "/addPlayerData",
		data: formData,
		method: "POST",
		success: function(result){
			console.log(result);
			console.log("errlng"+result.length);
			if(result.length < 10) {
				for(i = 0; i < result.length; i ++) {
					$("."+result[i].param).html(result[i].msg);
				}
			}
			else {
				$('#myModal').modal('toggle');
			}
		}
	});
	$.get('/list', function(data) {
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
	$.get('/startMatch', function(data) {
//		$(".start_match_title").text("hello");over-details
		$(".over-details").hide();
		$(".toss-Match").hide();
		$(".start-Match").html(data);

	});
	
	$.get('/scoreboard', function(data) {
		$(".scoreboard").html(data);

	});
});

//For playing team list
$(document).on("click", '#match_setting', function() {
	$.get('/teamlist', function(data) {
		$(".scoreboard").html(data);
	});

});
//for adding teammember to a team
$(document).on("click", '#add_team', function() {

	$.get('/addTeam', function(data) {
		$(".scoreboard").html(data);
		$( ".draggable" ).draggable({
			revert: 'invalid',
			helper : 'clone',
			opacity: 0.7,
			start : function(event, ui) {
			    ui.helper.width($(this).width());
			    console.log(event.clientX);
			    console.log($(event.target).offset().left);
			    console.log(event.clientY);
			    console.log($(event.target).offset().top);
                $(ui.helper).css("margin-left", event.clientX - $(event.target).offset().left);
                $(ui.helper).css("margin-top", event.clientY - $(event.target).offset().top);
			}
		});
		$( ".droppable" ).droppable({
			hoverClass: "highlight",
			drop: function(ev, ui) {
				//(ui.helper).remove(); //destroy clone
           		
           		if($(this).children('.draggable').length == 0){
           			$(ui.draggable).remove();
           			$(this).append($(ui.draggable).first().clone().attr('droped',1).css({"marginTop": "auto","marginRight": "auto","marginBottom": "auto","marginLeft": "auto"}).draggable({
	           			revert: 'invalid',
						helper : 'clone',
						opacity: 0.7,
						start : function(event, ui) {
						    ui.helper.width($(this).width());
			                $(ui.helper).css("margin-left", event.clientX - $(event.target).offset().left);
			                $(ui.helper).css("margin-top", event.clientY - $(event.target).offset().top);
						}
	           		}));
					var playerId = $(ui.draggable).attr("id");
					var teamId = 0;
					teamId = $(this).parent().attr("id").split("_")[1];
					$.ajax({
						url: "/assignPlayerToTeam",
						data: {
							player_id: playerId,
							team_id: teamId,
						},
						method: "POST",
						success: function(result){
							console.log("kllkjlj");
						}
					});
           		}
           		
			},
		});
		$( ".playerdroppable" ).droppable({
			drop: function(ev, ui) {
				(ui.helper).remove(); //destroy clone
           		$(ui.draggable).remove();
           		$(this).append($(ui.draggable).clone().attr('droped',0).css({"marginTop": "5%","marginRight": "auto","marginBottom": "auto","marginLeft": "auto"}).draggable({
           			revert: 'invalid',
					helper : 'clone',
					opacity: 0.7,
					start : function(event, ui) {
					    ui.helper.width($(this).width());
		                $(ui.helper).css("margin-left", event.clientX - $(event.target).offset().left);
		                $(ui.helper).css("margin-top", event.clientY - $(event.target).offset().top);
					}
           		}));
				var playerId = $(ui.draggable).attr("id");
				var teamId = 0;
				$.ajax({
					url: "/assignPlayerToTeam",
					data: {
						player_id: playerId,
						team_id: teamId,
					},
					method: "POST",
					success: function(result){
						console.log("kllkjlj");
					}
				});
			},
		});
	});
});

function removeDroppableAccept() {
	$(this).droppable('option', 'accept', ui.draggable);
}

function addDroppableAccept() {
	$(this).droppable('option', 'accept', '.draggable');
}
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

//For match setting
$(document).on("click", '#setting_save', function() {
	
	
});


//Save match setting details
$(document).on("click", '.setting_save', function() {
	var team1 = $('#team_A_select :selected').val();
	var team2 = $('#team_B_select :selected').val();
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
			$('.team_info').attr('disabled','disabled');
			$("#setting_save").attr('disabled','disabled');
			$(".match_setting_text").attr('disabled','disabled');
			$("#setting_save").attr('disabled','disabled');
		}
	});
});

$(document).on("click", '#new_team_match', function() {
	$('.team_info').attr('disabled',false);
	$(".match_setting_text").attr('disabled',false);
	$("#setting_save").attr('disabled',false);
	$('#match_id').val('');
});

//For match setting	
$(document).on("click", '#match_player_save1', function() {
	var checkedPlayer1=[];
	$('input[name="player1"]:checked').each(function(){
		checkedPlayer1.push($(this).attr('id'));
	});
	console.log(checkedPlayer1);

	$.ajax({
		url: "/playing11",
		data: {
			"player11_id" : checkedPlayer1,
			"team_id" : $('#team1_id_value').val(),
		},
		method: "POST",
		success: function(result){
			console.log("playing 11 added");
		}
	});
});

$(document).on("click", '#match_player_save2', function() {
	var checkedPlayer2=[];
	$('input[name="player2"]:checked').each(function(){
		checkedPlayer2.push($(this).attr('id'));
	});
	console.log(checkedPlayer2);
	$.ajax({
		url: "/playing11",
		data: {
			"player11_id" : checkedPlayer2,
			"team_id" : $('#team2_id_value').val(),
		},
		method: "POST",
		success: function(result){
			console.log("playeradd1"+result);
			console.log("playing 11 added");
		}
	});
});
	
$(document).on("keyup", '#search_box', function() {
	//$('.setting_update').show();
	var playerName = $('#search_box').val();
	$.ajax({
		url: "/fetchPlayer",
		data: {
			"player_name" : playerName,
		},
		method: "POST",
		success: function(result){
			var data = jQuery.parseJSON(result);
			$('div[droped=0]').remove();
			for(var i = 0; i < data.length ; i += 2) {
				$("#filtered_data").prepend('<div droped="0" class="draggable" style="color:black;border:1px solid black;width:75%;margin:11.5%" id="'+data[i]+'" >'+data[i+1]+'</div>');
			}
			$( ".draggable" ).draggable({
				revert: 'invalid',
				helper : 'clone',
				opacity: 0.7,
				start : function(event, ui) {
				    ui.helper.width($(this).width());
	                $(ui.helper).css("margin-left", event.clientX - $(event.target).offset().left);
	                $(ui.helper).css("margin-top", event.clientY - $(event.target).offset().top);
				}
			});
		}
	});
});

$(document).on("click", '.toss_btn', function() {
	$.get('/tossMatch', function(data) {
		$(".modal-header").hide();
		$(".start-Match").hide();
		$(".toss-Match").css('display','inline-block');
		$(".modal-footer").hide();
//		$(".start_match_title").text("Match Toss");
		$(".toss-Match").html(data);
	});
});


$(document).on("change", '#tournament_year', function() {
	var selectedYear = $('#tournament_year').val();
	$.ajax({
		url: "/fetchSelectedYearData",
		data: {
			"selected_year" : selectedYear,
		},
		method: "POST",
		success: function(result){
			$('#tournament_section2').html(result);
			var noOfRows = $('#team_info tr').length;
			console.log(noOfRows);
			var TotalRows = $("#no_of_teams").val();;
			for(var i = noOfRows - 1  ; i < TotalRows ; i ++) {
				$('#team_info tr').last().after("<tr><td><input type='text' value='' name='team_name_"+i+"' id='team_name_"+i+"'></td><td><input  type='file' value='' name='logo_"+i+"' id='logo_"+i+"'></td><td><input  type='text' value='' name='captain_"+i+"' id='captain_"+i+"'></td><td><input  type='text' value='' name='no_of_wins' disabled></td><td><input  type='text' value='' name='no_of_loss' disabled></td></tr>");
				$('#total_rows').val(parseInt($('#total_rows').val()) + 1);
			}
			if(noOfRows != 1) {
				$('#team_info tr').last().after("<tr><td colspan='5'><input type='button' value='Save' onclick='saveTeamData();'></td></tr>");
			}
		}
	});
});
function saveTournamentData() {
	$.ajax({
		url: "/saveTournamentData",
		data: $("#tournamentForm").serialize(),
		method: "POST",
		success: function(result){
			var isError = result[Object.keys(result)[Object.keys(result).length - 1]].isError;
			if(result.length > 0 && isError) {
				console.log(result);
				for(i = 0; i < result.length; i ++) {

					$("."+result[i].param).html(result[i].msg);
				}
			}
			else {
				$("#tournamentForm").find('span').html("");
				$('#tournamentForm').find('input, textarea, button, select').attr('disabled','disabled');
				$("#team_info").find("tr:gt(0)").remove();
				var noOfTeams = $("#no_of_teams").val();
				for(var i=1,j=0; i <= noOfTeams; i ++,j++) {
					$('#team_info tr').last().after("<tr><td><input type='hidden' name='team_id_"+j+"' value='"+result[i].team_id+"'><input type='hidden' name='tournament_id_"+j+"' value='"+result[i].tournament_id+"'><input type='text' size = '12' name='team_name_"+j+"' value='"+result[i].team_name+"'></td><td><input  type='file' name='logo_"+j+"' value=''></td><td><input size = '12' type='text' name='captain_"+j+"' value='"+result[i].captain_name+"'></td><td><input size = '12'  type='text' value='' disabled></td><td><input size = '12' type='text' value='' disabled></td></tr>");
				}
				$('#team_info tr').last().after("<tr><td colspan='5'><input type='button' value='Save' onclick='saveTeamData();'></td></tr>");
			}
		}
	});
}

function saveTeamData() {
	var fields_data = $("#teamForm").serialize();
	var form_data = new FormData();
	var file_data_pass = '';
	var correctFileFormat = 1;
	for (var i = 0, len=$("#no_of_teams").val(); i < len; i++) {
		if(typeof $('#logo_'+i).prop('files') != "undefined") {
			$.each($('#logo_'+i).prop("files"), function(k,v){
				var filename = v['name'];	
				var ext = filename.split('.').pop().toLowerCase();
				if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
					$('.logo_'+i).html("Upload only image files");
					correctFileFormat = 0
				}
				else {
					file_data_pass = $('#logo_'+i).prop('files')[0];
					form_data.append('logo_'+i, file_data_pass);
				}
			});
		}
	}
	if(correctFileFormat) {
		var arr = fields_data.split("&");
		for(var i = 0 , len= arr.length; i < len; i++) {
			var arr1 = arr[i].split("=");
			arr1[1] = arr1[1].replace('+', ' ');
			form_data.append( arr1[0], arr1[1]);
		}
		$.ajax({
			url : '/saveTeamData',
			cache : false,
			contentType : false,
			processData : false,
			method : 'post',
			data : form_data,
			success : function(result) {
				if(result.length > 0) {
					for(i = 0; i < result.length; i ++) {
						$("."+result[i].param).html(result[i].msg);
					}
				}
				else {
					$("#teamForm").find('span').html("");
					$('#teamForm').find('input, textarea, button, select').attr('disabled','disabled');
					$('#tournamentForm').find('input, textarea, button, select').attr('disabled','disabled');
					alert("Data Saved Successfully");
				}
			},
		});	
	}
}

$(document).on("click", '#toss_save', function() {
	var formData = $('#toss_form_id').serializeArray();
	$.ajax({
		url: "/tossUpdateData",
		data:formData,
		method: "POST",
		success: function(result){
			$('#myModal').modal('toggle');
		}
	});
});

$(document).on("click", '#tournament_setting', function() {
	$.get('/tournamentSetting', function(data) {
		$(".scoreboard").html(data);
	});

});