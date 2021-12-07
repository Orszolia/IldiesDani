<?php
// Check for empty fields
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['phone']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$plus_names = $_POST['plus_names'];
$plus_names_imp = implode(", ", $plus_names);
$email = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
$coming = strip_tags(htmlspecialchars($_POST['coming']));
$room = strip_tags(htmlspecialchars($_POST['room']));
$room_for = strip_tags(htmlspecialchars($_POST['room_for']));

// Create the email and send the message
$to = "z.ildiko.93@gmail.com"; // Add your email address in between the "" replacing yourname@yourdomain.com - This is where the form will send a message to.
$subject = " $name válasza: $coming";
$body = "Visszajelzés érkezett az esküvői meghívóra:\n\n".
"Név: $name\n\nKísérői: $plus_names_imp\n\nEmail: $email\n\nTelefonszám: $phone\n\nVálasza: $coming\n\nSzállás és shuttle igény: $room $room_for fő számára\n\nÜzenete:\n$message";
$header = "From: noreply@fruzsizoli.hu\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$header .= "Reply-To: $email";	

if(!mail($to, $subject, $body, $header))
  http_response_code(500);
?>