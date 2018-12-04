var formatInscription = function(inscription) {
	var formatedInscription = inscription.replace(/\.|\n|\-|\/|\"|\'|\\|\||\s|\,/g, '');
	return formatedInscription;
}

var countFormattedLetters = function(inscription) {
	var letterCount = formatInscription(inscription).length;
	return letterCount;
}

var createAlert = function(alertId, alertName, alertMessage) {
	return '<div class="alert alert-warning alert-dismissible fade show mt-3" role="alert" id="' + alertId + '"><strong>' + alertName + '</strong> ' + alertMessage + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
}

var updatePrice = function(divId, totalPrice) {
	$(divId).text("£ " + totalPrice.toFixed(2));
}


$('#inscriptionTextarea').keyup( function() {
	
	var userInscription = $(this).val();
    var letterCount = countFormattedLetters(userInscription);
    $('#letterCount').text(letterCount);
   
});


  
$('#calculateInscription').click( function() {
	
	var userInscription = $('#inscriptionTextarea').val();
	var letterCount = countFormattedLetters(userInscription);
	var paintedLetterPrice = 1.71;
	var goldLetterPrice = 2.05;
	var leadLetterPrice = 7.75;
	var totalLetteringPrice = 0;
	var letteringChoice = $("input[name='letteringType']:checked").val();
	
	if (letteringChoice) {
		switch(letteringChoice){
			case "painted":
				totalLetteringPrice = paintedLetterPrice * letterCount;
				break;
			case "gold":
				totalLetteringPrice = goldLetterPrice * letterCount;
				break;
			case "lead":
				totalLetteringPrice = leadLetterPrice * letterCount;
				break;
			default:
				return;
		}
		
		updatePrice("#letPrice", totalLetteringPrice);
		
	} else if ( letterCount != 0 && !$('#alertLettering').length ) {
		
		$('#letteringChoice').append(createAlert("alertLettering", "Please Choose a Lettering Style!", "The total price of the lettering can only be calculated once you have chosen a lettering style.")); 
		
	}
	
	
	var memorialPrice = 0;
	var selectedMemorial = $('#selectMemorial').find(":selected").text();
	var designChoice = $("input[name='designChoice']:checked").val();
	
	if ( selectedMemorial === "Please select a memorial" ) {
		$('#selectMemorialAlert').append(createAlert("alertMemorial", "Please Select a Memorial!", "All our prices for memorials seen on the site are listed, simply select the name of the stone and your design option."));
	}
	
	if ( designChoice ) {
		
		switch(designChoice){
			case "incDesign":
				memorialPrice = $('#selectMemorial').find(":selected").data("price-inc");
				break;
			case "exDesign":
				memorialPrice = $('#selectMemorial').find(":selected").data("price-ex");
				break;
			default:
				return;
		}
	}
	
	var totalMemorialPrice = parseInt(memorialPrice);
	$('#memPrice').text("£ " + totalMemorialPrice.toFixed(2));
	
	var totalPrice = totalLetteringPrice + totalMemorialPrice;
	$('#totalPrice').text("£ " + totalPrice.toFixed(2));

});

$('#selectMemorial').change( function() {

	// Get the img path from data-img-path on select change and update img
	var newImgPath = $(this).find(":selected").data("img-path");
	$('#selectedMemorialImg').attr( 'src', newImgPath );

});