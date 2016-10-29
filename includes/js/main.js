$(document).ready(function() {
	// when document loads autocomplete is possible
	let prevTime = Date.now()
	$('#name').keyup( function( ) {
		// After pressing a key, the following will be carried out to do autocomplete!

		// some constants
 		var time = Date.now()
 		var txt = $(this).val()
		// set up function to do AJAX request
 		function doAjax () {
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
 			prevTime = time
 		} else {
 			// else, send request in 3 second time
 			setTimeout( doAjax, 300)
 			prevTime = time
 		}
	})
})