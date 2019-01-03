var formatInscription = function(inscription) {
	var formatedInscription = inscription.replace(/\.|\n|\-|\/|\"|\'|\\|\||\s|\,/g, '');
	return formatedInscription;
}

var countFormattedLetters = function(inscription) {
	var letterCount = formatInscription(inscription).length;
	return letterCount;
}

var createAlert = function(alertId, alertName, alertMessage) {
	var divId = '#' + alertId;
	if ( !$( divId ).length ) {
		return '<div class="alert alert-warning alert-dismissible fade show mt-3" role="alert" id="'
		+ alertId +
		'"><strong>'
		+ alertName +
		'</strong> '
		+ alertMessage +
		'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
	} else {
		return;
	}
}

var updatePrice = function(divId, totalPrice) {
	$(divId).text("£ " + totalPrice.toFixed(2));
}

var getMemorialData = function(dataOption) {
	return $('#selectMemorial').find(":selected").data(dataOption);
}

var updatePrices = function() {

	var memorialPrice = 0;
	var carvingPrice = 0;
	var designChoice = $("input[name='designChoice']:checked").val();
	var userInscription = $('#inscriptionTextarea').val();
	var letterCount = countFormattedLetters(userInscription);
	var paintedLetterPrice = 1.71;
	var goldLetterPrice = 2.05;
	var leadLetterPrice = 7.75;
	var letteringPrice = 0;
	var letteringChoice = $("input[name='letteringType']:checked").val();

	if ( getMemorialData("place-holder") ) {
		memorialPrice = 0;
		carvingPrice = 0;	
	} else {
		switch(designChoice){
			case "incDesign":
				memorialPrice = getMemorialData("price-ex");
				carvingPrice = getMemorialData("price-carv");
				break;
			case "exDesign":
				memorialPrice = getMemorialData("price-ex");
				carvingPrice = 0;
				break;
			case "N/A":
				memorialPrice = getMemorialData("price-inc");
				carvingPrice = 0;
				break;
			default:
				memorialPrice = 0;
				carvingPrice = 0;
				return;
		}
	}

	switch(letteringChoice){
		case "painted":
			letteringPrice = paintedLetterPrice * letterCount;
			break;
		case "gold":
			letteringPrice = goldLetterPrice * letterCount;
			break;
		case "lead":
			letteringPrice = leadLetterPrice * letterCount;
			break;
		default:
			return;
	}

	var totlaMemorialPrice = parseInt(memorialPrice);
	var totlaCarvingPrice = parseInt(carvingPrice);
	var totalPrice = parseInt(memorialPrice) + parseInt(carvingPrice) + letteringPrice;

	updatePrice('#memPrice', totlaMemorialPrice);
	updatePrice('#carvPrice', totlaCarvingPrice);
	updatePrice("#letPrice", letteringPrice);
	updatePrice("#totalPrice", totalPrice);
}



// ** Count letters and display **
// When the user in typing or pastes an inscription into the textarea
// update the small counter box in the top right of the textarea with
// the number of letters...
$('#inscriptionTextarea').keyup( function() {
	
	var userInscription = $(this).val();
    var letterCount = countFormattedLetters(userInscription);
    $('#letterCount').text(letterCount);
   
});

// ** Calculate The Price **
// When the #calculatePrice button is clicked, check for valid info and 
// calculate accordingly providing feedback when information is missing...
$('#calculatePrice').click( function() {

	// Grab the required fields
	var userInscription = $('#inscriptionTextarea').val();
	var selectedMemorialHasPrice = $('#selectMemorial').find(":selected").data("price-inc");

	// Check none of the fields required are empty, if they are provide
	// an alert, if one is not empty then run the calculator
	if ( !userInscription && !selectedMemorialHasPrice ) {

		$('#emptyFormAlertBanner').prepend(
			createAlert(
				"alertPriceCalculator",
				"Please Choose a Memorial or Enter Your Proposed Inscription!",
				"To use the price calculator you must choose a memorial or enter an inscription."
			)
		); 

	} else {

		if ( selectedMemorialHasPrice && !userInscription ) {

			// Alert inscription but calculate memorial
			$('#inscription').prepend(
				createAlert(
					"alertLettering",
					"You Can Also Calculate Your Inscription!",
					"If you would like to fully calculate the cost of your chosen memorial, you can enter your inscription here and chose a lettering style."
				)
			);

			updatePrices();

		} else if ( !selectedMemorialHasPrice && userInscription ) {

			// Alert memorial but calculate inscription
			$('#memorial').prepend(
				createAlert(
					"alertMemorial",
					"Please Select a Memorial!",
					"All our prices for memorials seen on the site are listed, simply select the name of the stone and the carving option."
				)
			);

			updatePrices();

		} else {

			updatePrices();

		}


	}
});

// ** Update Image **
// Update the placeholder image when a memorial is chosen from the dropdown,
// if there is no memorial selected or a placeholder option is selected, this
// will default back to the placeholder...
$('#selectMemorial').change( function() {

	// Set the placeholder image path
	var placeholderImgPath = '/images/new-memorials/new-memorial-placeholder.png';

	// Get the selected memorial image path
	var selectedMemorialImgPath = $(this).find(":selected").data("img-path");

	// Check if the path is empty
	if ( selectedMemorialImgPath ) {
		// Update image
		$('#selectedMemorialImg').attr( 'src', selectedMemorialImgPath );
	} else {
		// Stick with or return to placeholder
		$('#selectedMemorialImg').attr( 'src', placeholderImgPath );
	}

});