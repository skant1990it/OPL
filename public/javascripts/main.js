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
           			$(this).append($(ui.draggable).first().clone().attr('droped',1).draggable({
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
           		$(this).append($(ui.draggable).clone().attr('droped',0).draggable({
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
		//console.log(data);
	//$(".modal-body").html(data);
		
	});
});

function removeDroppableAccept() {
	$(this).droppable('option', 'accept', ui.draggable);
}

function addDroppableAccept() {
	$(this).droppable('option', 'accept', '.draggable');
}
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






