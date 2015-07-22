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

/*function load_home(){ 
 document.getElementById("content").innerHTML='<object type="text/html" data="home.html" ></object>';
 }*/

$(document).on("click", '.abc', function() {	
	var userId = $(this).attr('id');
	$.get('/edituser/' + userId  ,function( data ) {
		$(".modal-body").html(data);
	});
});

//For admin login 

$(document).on("click", '#admin', function() {

	$.get('/login', function(data) {
//		$(".jumbotron").html(data);
		$(".modal-body").html(data);
	});
});

$(document).on("click", '#dash_admin', function() {

	$.get('/admin', function(data) {
		$(".abc").html(data);
	});
});