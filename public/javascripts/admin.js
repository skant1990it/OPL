/**
 * @author jyotikumari
 */


$(document).on('click', 'input[type="button"][class="player_btn bowler"]', function() {
	 $('input[type="button"][class="player_btn bowler green"]').removeClass('green');
	 $(this).addClass('green');
});

var count=0;
$(document).on('click', 'input[type="button"][class*="player_btn batsman"]', function() {
	var batId= $(this).attr('id');
	if($(this).hasClass('green')){
		$("#"+batId).removeClass('green');
		count--;
	}else{
		if(count<2){
			$("#"+batId).addClass('green');
			count++;
			alert("Only 2 batsman can be selected");
		}
	}
	 
});

var overcount=0;
var ballcount=0;
$(document).on('click', 'input[type="button"][class*="ball"]', function() {
	
	  var check_ball = $(this).attr('checkclass');	 
	  var checkedRun=[];
	  var check_over;
	  $("input:checkbox[class*='overball'][checkclass="+check_ball+"]:checked ,input:radio[class*='overball'][checkclass="+check_ball+"]:checked").each(function(){
		  checkedRun.push($(this).val());
		 });
	  if ( $.inArray('9', checkedRun)!=-1  || $.inArray('10', checkedRun)!=-1) {
		    $("input:checkbox[class*='overball'][checkclass="+check_ball+"]").prop('checked',false);
		    $("input:radio[class*='overball'][checkclass="+check_ball+"]").prop('checked',false);
		  var currentTr= $("input:checkbox[class*='overball'][checkclass="+check_ball+"]").parents('tr').attr('id');
		  var newrow=$("<tr class="+currentTr+"><td></td>");
		  for(var i=1; i <=10; i++) { 
			  	if(i<=7){ 
		  newrow.append("<td><input type='radio'  name='runScored1' class='overball ball1' checkclass='1' value= "+i+" id="+i+"></td>");
		     } else{
		     newrow.append("<td><input type='checkbox'  class='overball ball1' checkclass='1' value=" + i+ " id="+i+ "></td>");
		     }
		      } 
		  newrow.append("<td><input type='button' value='OK' class ='ball1' checkclass='1' id='ball1'></td></tr>");
		 
		newrow.insertAfter($(this).parents('tr').closest( "tr" ) );
		  /*  var table = $('table[name="score_table"]');
		    var tr = $('tr[class=currentRow]');
		    var tdRadio = $('<input />', {'class' : 'overball ball1', 'type': 'radio'});
		    var tdCheckBox = $('<input />', {'class' : 'overball ball1', 'type' : 'checkbox'});
		    var tdAction = $('<button />', {'class' : 'ball1', html:'OK'});

		    newRow(table,tr,[tdRadio,tdCheckBox,tdAction]);
		    */
		    
		}else if($.inArray('8', checkedRun)==0){
			ballcount++;
			$("input:checkbox[class*='overball']:checked").parents('tr').next('tr').find('input[type=radio]').show();
			$("input:checkbox[class*='overball']:checked").parents('tr').next('tr').find('input[type=checkbox]').show();
			$("input:checkbox[class*='overball']:checked").parents('tr').next('tr').find('input[type=button]').show();
		}else{
			ballcount++;
			//console.log($("input:radio[class*='overball']:checked").parents('tr').next('tr'));
			$("input:radio[class*='overball']:checked").parents('tr').next('tr').find('input[type=radio]').show();
			$("input:radio[class*='overball']:checked").parents('tr').next('tr').find('input[type=checkbox]').show();
			$("input:radio[class*='overball']:checked").parents('tr').next('tr').find('input[type=button]').show();
		}
	  if(ballcount==6){
		  overcount++;
		  check_over = $('input[type="button"][class*="over_btn"]').attr('id');
		  $("#"+check_over).css("background-color", "red");
		  var nextover=$('input[type="button"][class*="over_btn"]').next().attr('id');
		  $("#"+nextover).css("background-color", "rgb(123, 123, 211)");
		  $("input:checkbox[class*='overball']").prop('checked',false);
		    $("input:radio[class*='overball']").prop('checked',false);
	  }
	 
});

