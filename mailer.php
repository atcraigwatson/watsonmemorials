<?php

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $name = $_POST["contactFormFullName"];
        $email = $_POST["contactFormEmail"];
        $tel = $_POST["contactFormTel"];
        $message = $_POST["contactFormMessage"];

        $EmailTo = "contact@watsonmemorials.co.uk";
        $Subject = "New Message Received";

        // prepare email body text
        $Body .= "Name: ";
        $Body .= $name;
        $Body .= "\n";

        $Body .= "Email: ";
        $Body .= $email;
        $Body .= "\n";

        $Body .= "Tel: ";
        $Body .= $tel;
        $Body .= "\n";

        $Body .= "Message: ";
        $Body .= $message;
        $Body .= "\n";

        // send email
        $success = mail($EmailTo, $Subject, $Body, "From:".$email);

        // redirect to success page
        if ($success){
           echo "success";
        }else{
            echo "invalid";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
