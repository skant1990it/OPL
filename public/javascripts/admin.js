/**
 * @author jyotikumari
 */

var bowlerId;
var batsmanId;
var battingPlayer = [];
$(document).on('click', 'input[type="button"][class="player_btn bowler"]', function() {
	 $('input[type="button"][class="player_btn bowler green"]').removeClass('green');
	 $(this).addClass('green');
	 bowlerId = $(this).attr('data');
});

var count=0;
$(document).on('click', 'input[type="button"][class*="player_btn batsman"]', function() {
	 batsmanId= $(this).attr('data');
	if($(this).hasClass('green')){
		$("#bat"+batsmanId).removeClass('green');
		count--;
	}else{
		if(count<2){
			$("#bat"+batsmanId).addClass('green');
			count++;
			battingPlayer.push(batsmanId);
		}else{
			alert("Only 2 can be selected");
		}
	}
	 
});


//select either no or wide ball
$(document).on('change', 'input[type="checkbox"][group="extra[]"]', function() {
	$(this).parents('tr').find('input[group="' + $(this).attr('group') + '"]').not($(this)).prop('checked', false);
});


var overcount=1;
var ballcount=1,nextballcount=1,batsman1,batsman2;
$(document).on('click', 'input[type="button"][class*="ball"]', function() {
	
	var over =  $('input[type="button"][class*="over_btn active"]').attr('id');
	console.log(over);
	var check_ball = $(this).attr('checkclass');	 
	var checkedRun=[];
	var check_over,radiocount=1;
	var gainedruns;
	var extraruns,extraType="";  
	$(this).parents('tr').find('input[type="radio"],[type="checkbox"],[type="button"]').prop("disabled",true);
	
	  if($('input[type="radio"][name="radio'+over+"_"+check_ball+'_'+nextballcount+'"]:checked').val() == '7'){
		  gainedruns=0;
	  }else{
		  gainedruns=$('input[type="radio"][name="radio'+over+"_"+check_ball+'_'+nextballcount+'"]:checked').val();
	  }
	  
		$(this).parents('tr').find("input:checkbox[class*='overball'][checkclass="+check_ball+"][name='check"+over+"_"+check_ball+"']:checked").each(function(){
			checkedRun.push($(this).val());
		});
	  if(checkedRun.length == '0' ){
		  extraruns='0';
	  }
	  else{
		  extraruns='1';
			  if($.inArray('9', checkedRun)>=0){
			  extraType ="wide";
		  }else if($.inArray('10', checkedRun)>=0){
			  extraType="noball";
		  }else{
			  extraType="wicket";
		  }
	}
	  
	  for( i = 0, l = battingPlayer.length; i < l; i++ ) {
		  batsman1 = battingPlayer[0];
		  batsman2 = battingPlayer[1];
		 
		  }

	  batsman_active = $('input[type="button"][class*="player_btn batsman active"]').attr('data');
		$.ajax({
		url: "/addRuns",
		data: {
			"over":overcount,
			"ball":check_ball,
			"extraruns":extraruns,
			"extratype":extraType,
			"gainedruns":gainedruns,
			"bowler":bowlerId,
			"batsman_id":batsman_active,
		
		},
		
		method: "POST",
		success: function(result){
		},
		error: function(err) {
			console.log(err);
		}
	});
	  
			
		if ( $.inArray('9', checkedRun)>=0  || $.inArray('10', checkedRun)>=0) {
		radiocount++;
		nextballcount++;
	var currentRow = $("input:checkbox[class*='overball'][checkclass="+check_ball+"][name='check"+over+"_"+check_ball+"']").parents('tr');
	  var currentTr= currentRow.attr('id');
	  var newrow=$("<tr class="+currentTr+" id='"+check_ball+"_"+nextballcount+"'><td></td>");
	  for(var i=1; i <=10; i++) { 
		  if(i<=7){ 
			  newrow.append("<td><input type='radio'  name='radio"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1'" +" checkclass="+check_ball+" value= "+i+" id="+i+" checked="+(i=='7' ? "true":"false")+"></td>");
		  } 
		  else{
			  newrow.append("<td><input type='checkbox' name='check"+over+"_"+check_ball+"' class='overball ball1' checkclass="+check_ball+" value=" + i+ " id="+i+ " " +
			  		" group="+(i=='8' ? "wicket[]":"extra[]")+"></td>");
	     }
	  } 
	  newrow.append("<td><input type='button' value='OK' class ='ball1' checkclass='"+check_ball+"' id='ball1'></td></tr>");
	  newrow.insertAfter($(this).parents('tr').closest( "tr" ) );
	  flag = 1;
	}
	else if($.inArray('8', checkedRun)>=0){
		ballcount++;
		check_ball++;
		var currentTr= $("input:checkbox[class*='overball'][checkclass="+check_ball+"][name='check"+over+"_"+check_ball+"']").parents('tr').attr('id');
		  var newrow=$("<tr class="+currentTr+" id='"+check_ball+"_"+nextballcount+"'><td>"+check_ball+"</td>");
		  for(var i=1; i <=10; i++) { 
			  if(i<=7){ 
				  newrow.append("<td><input type='radio'  name='radio"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1'" +" checkclass="+check_ball+" value= "+i+" id="+i+" checked="+(i=='7' ? "true":"false")+"></td>");
			  } 
			  else{
				  newrow.append("<td><input type='checkbox' name='check"+over+"_"+check_ball+"' class='overball ball1' checkclass="+check_ball+" value=" + i+ " id="+i+ 
						  "group="+(i=='8' ? "wicket[]":"extra[]")+"></td>");
		     }
		  } 
		  newrow.append("<td><input type='button' value='OK' class ='ball1' checkclass='"+check_ball+"' id='ball1'></td></tr>");
		  newrow.insertAfter($(this).parents('tr').closest( "tr" ) );
	}
	else{
		if(checkedRun.length == '0'){
			ballcount++;
		}
		nextballcount = 1;
		check_ball++;
		  
		if(check_ball < 7){
			var currentTr= $("input:checkbox[class*='overball'][checkclass="+check_ball+"][name='check"+over+"_"+check_ball+"']").parents('tr').attr('id');
			  var newrow=$("<tr class="+currentTr+" id='"+over+"_"+check_ball+"_"+nextballcount+"'><td>"+check_ball+"</td>");
			  for(var i=1; i <=10; i++) { 
				  if(i<=7){ 
					  newrow.append("<td><input type='radio'  name='radio"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1'" +" checkclass="+check_ball+" value= "+i+" id="+i+" checked="+(i=='7' ? "true":"false")+"></td>");
				  } 
				  else{
					  newrow.append("<td><input type='checkbox' name='check"+over+"_"+check_ball+"' class='overball ball1' checkclass="+check_ball+" value=" + i+ " id="+i+ 
							  "group="+(i=='8' ? "wicket[]":"extra[]")+"></td>");
			     }
			  } 
			  newrow.append("<td><input type='button' value='OK' class ='ball1' checkclass='"+check_ball+"' id='ball1'></td></tr>");
			  newrow.insertAfter($(this).parents('tr').closest( "tr" ) );
		}
		
	
	}
	
	  if(ballcount==7){
		  overcount++;
		  check_over = $('input[type="button"][class*="over_btn active"]').attr('id');
		  var completed_over =  $("input[type='button'][name='over"+check_over+"']");
		  completed_over.removeClass('active');
		  completed_over.addClass('completed');
		  var nextover=$('input[type="button"][class*="over_btn completed"][name="over'+check_over+'"]').next().attr('id');
		  $("#"+nextover).addClass('active');
		  $("input:checkbox[class*='overball']").prop('checked',false);
		  $("input:radio[class*='overball']").prop('checked',false);
		  $("table#score_table").find("tr:gt(1)").remove();
		  $("table#score_table").find("tr:gt(0)").find('input[type="radio"][id="7"]').prop('checked',true);
		 $("table#score_table").find("tr:eq(1)").find('input[type="radio"]').attr('name',"radio"+nextover+"_1_1");
		 $("table#score_table").find("tr:eq(1)").find('input[type="checkbox"]').attr('name',"check"+nextover+"_1");
		 $("table#score_table").find("tr:eq(1)").find('input[type="radio"],[type="checkbox"],[type="button"]').prop('disabled',false);
			  ballcount=1;
	  }
	 
	 
});


$(document).on('click', 'input[type="button"][class*="over_btn completed"]', function() {
	var overId =($(this).attr('id'));
	var matchId = $("#match_id").val();
	var teamId = $("#team_id").val();
	$.ajax({
		url: "/getOverRecord",
		data: {
			overId : overId,
			matchId : matchId,
			teamId : teamId,
		},
		method: "GET",
		success: function(result){
			console.log("saved");
		}
	});
});