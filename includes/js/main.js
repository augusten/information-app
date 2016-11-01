$(document).ready(function() {
	// when document loads autocomplete is possible
	let prevTime = 0
	$('#name').keyup( function( ) {
		// After pressing a key, the following will be carried out to do autocomplete!

		// some constants
 		var time = Date.now()
 		var txt = $(this).val()
		// set up function to do AJAX request
 		function doAjax () {
 			console.log(time)
			// function to send request to backe-end
			$.ajax({
				type: 'POST',
				url: "/givethisback",
				data: {inputData: txt},
				success: 
					function ( ddata, status ) {
						// function performs autocomplete
						$('#datalist').empty()
							for (var i = ddata.length - 1; i >= 0; i--) {
								$('#datalist').append('<option value="' + ddata[i] + '"></option>')
							}					
					}
			})
		}
 		if (( time - prevTime ) >= 300 ) {
 			// bandwith optimization part
 			// if 3 miliseconds passes between key presses, then send 
 			// backed request at once.
 			doAjax()
 			prevTime = Date.now()
 		}
	})
})