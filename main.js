$(document).ready(function() {
	let currDate = 0
	function doAjaxNow () {
		let txt = $('#name').val()
		$.ajax({
			type: 'POST',
			url: "/givethisback",
			data: {inputData: txt},
			success: 
					function ( data, status ) {
						if ( (Date.now() - currDate) >= 2000 ) {
							$('#name').autocomplete({
							source: data,
							minLength: 1
							})
							currDate = Date.now()
						}
						doAjaxNow()
					}
			})
	}

	doAjaxNow()

	//- $('#name').keyup( function( ) {
	//- 	var txt = $(this).val()
	//- 	function doAjax () {
	//- 		$.ajax({
	//- 			type: 'POST',
	//- 			url: "/givethisback",
	//- 			data: {inputData: txt},
	//- 			success: 
	//- 				function ( data, status ) {
	//- 					//- console.log(Date.now())
	//- 					//- console.log(currDate)
	//- 					if ( (Date.now() - currDate) >= 300 ) {
	//- 						$('#name').autocomplete({
	//- 						source: data,
	//- 						minLength: 1
	//- 						})
	//- 						currDate = Date.now()
	//- 						console.log(currDate)
	//- 					}
	//- 				setTimeout( doAjax (), 5000)
	//- 				}
	//- 		})
	//- 	}
	//- 	setTimeout( doAjax (), 5000)
	//- })
})