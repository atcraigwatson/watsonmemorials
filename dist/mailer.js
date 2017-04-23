$(document).ready( function() {

    //$('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {

        e.preventDefault();

        $.ajax({

            type: "POST",
            url: "mailer.php",
            data: $(this).serialize()

        }).done( function (data) {

            var messageAlert = 'alert-' + data.type;
            var messageText = data.message;

            var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            if (messageAlert && messageText) {

                $('#contact-form').find('.messages').html(alertBox);
                $('#contact-form')[0].reset();

            }
        })
    })
});
