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
		$(".start-Match").html(data);

	});
	
	$.get('/admin', function(data) {
		$(".scoreboard").html(data);

	});
});

//For playing team list
$(document).on("click", '#match_setting', function() {
	$.get('/teamlist', function(data) {
		$(".scoreboard").html(data);
	});

});
//For playing team list
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

	$("#setting_update").css('display','block');
});

$(document).on("click", '#setting_update', function() {
	$(".match_setting_text").attr('disabled',false);
	$("#setting_save").attr('disabled',false);
});

//For match setting	
$(document).on("click", '#match_player_save1', function() {
	var match_id = $("#match_id").val();
	var checkedPlayer1=[];
	$('input[name="player1"]:checked').each(function(){
		checkedPlayer1.push($(this).attr('id'));
	});
	console.log(checkedPlayer1);

	$.ajax({
		url: "/playing11",
		data: {
			"player11_id" : checkedPlayer1,
			"match_id" : match_id,
		},
		method: "POST",
		success: function(result){
			console.log("playing 11 added");
		}
	});
});

$(document).on("click", '#match_player_save2', function() {
	var checkedPlayer2=[];
	var match_id = $("#match_id").val();
	$('input[name="player2"]:checked').each(function(){
		checkedPlayer2.push($(this).attr('id'));
	});
	console.log(checkedPlayer2);
	$.ajax({
		url: "/playing11",
		data: {
			"player11_id" : checkedPlayer2,
			"match_id" : match_id,
		},
		method: "POST",
		success: function(result){
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




