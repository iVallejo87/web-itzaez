<?php
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$subject = $_POST['subject'];
$timetable = $_POST['timetable'];
$message = $_POST['message'];
$body = "<strong>Nombre:</strong> $name \n<br/>" . "<strong>Teléfono:</strong> $phone \n<br/>" . "<strong>Correo:</strong> $email \n<br/>" . "<strong>Asunto:</strong> $subject \n<br/>" . "<strong>Horario de contacto:</strong> $timetable \n<br/>" . "<strong>Mensaje:</strong> $message";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->CharSet = 'UTF-8';
    $mail->SMTPDebug = SMTP::DEBUG_SERVER; // Enable verbose debug output
    $mail->isSMTP(); // Send using SMTP
    $mail->Host  = 'vm02.digitalserver.org'; // Set the SMTP server to send through
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->SMTPSecure = "tls";
    $mail->Username = 'config-mail@cajaitzaez.mx'; // SMTP username
    $mail->Password = '1q2w3e4r-!@'; // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port = 587; // TCP port to connect to

    //Recipients
    $mail->setFrom('config-mail@cajaitzaez.mx', $name);
    $mail->addAddress('contacto_itzaez@cajaitzaez.mx'); // Add a recipient
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    // Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->WordWrap = 50; 
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Contacto desde sitio cajaitzaez.mx';
    $mail->Body = $body;
    
    $mail->send();
    echo 'El mesaje se envió correctamente';
} catch (Exception $e) {
    echo "El mesaje no se envió por: {$mail->ErrorInfo}";
}