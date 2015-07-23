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
		}
	}
	 
});

var overcount=0;
var ballcount=0;
$(document).on('click', 'input[type="button"][class*="ball"]', function() {
	
	  var check_ball = $(this).attr('checkclass');	 
	  var checkedRun=[];
	  $("input:checkbox[class*='overball'][checkclass="+check_ball+"]:checked ,input:radio[class*='overball'][checkclass="+check_ball+"]:checked").each(function(){
		  checkedRun.push($(this).val());
		});
	  if ( $.inArray('9', checkedRun)!=-1  || $.inArray('10', checkedRun)!=-1) {
		 // console.log($("input:checkbox[class*='overball'][checkclass="+check_ball+"]"));
		    $("input:checkbox[class*='overball'][checkclass="+check_ball+"]").prop('checked',false);
		    $("input:radio[class*='overball'][checkclass="+check_ball+"]").prop('checked',false);
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
		  var check_over = $('input[type="button"][class*="over_btn"]').attr('id');
		  $("#"+check_over).css("background-color", "red");
		  var nextover=$('input[type="button"][class*="over_btn"]').next().attr('id');
		  $("#"+nextover).css("background-color", "rgb(123, 123, 211)");
		  $("input:checkbox[class*='overball']").prop('checked',false);
		    $("input:radio[class*='overball']").prop('checked',false);
	  }
});
