$("#contactForm").submit(function(event){
    // cancels the form submission
    event.preventDefault();
    submitForm();
});
function submitForm(){

    // Initiate Variables With Form Content
    var name = $("#contactFormFullName").val();
    var email = $("#contactFormEmail").val();
    var tel = $("#contactFormTel").val();
    var message = $("#contactFormMessage").val();

    $.ajax({
        type: "POST",
        url: "mailer.php",
        data: "name=" + name + "&email=" + email + "&tel=" + tel + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            }
        }
    });
}
function formSuccess(){
    $( "#contactFormMsgSuccess" ).removeClass( "hidden-xs-up" );
}
