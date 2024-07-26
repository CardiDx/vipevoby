<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user-name'];
$phone = $_POST['phone'];
//$service = $_POST['service'];

// if (isset($_POST['service'])){
//   $service = $_POST['service'];
// } else if (isset($_GET['service'])) {
//   $service = $_GET['service'];
// } else {
//   $service = 'chooseListing';
// }

// switch ($service) {
//   case 'unselected':
//     $service = "Тип услуги";
//     break;
//   case 'order-a-project':
//     $service = "Заказать проект";
//     break;
//   case 'order-a-tracing':
//     $service = "Заказать трассировку";
//     break;
//   case 'make-a-shield':
//     $service = "Собрать щит";
//     break;
// };

// <option value="unselected" selected>Тип услуги</option>
//            <option value="order-a-project">Заказать проект</option>
//            <option value="order-a-tracing">Заказать трассировку</option>
//            <option value="make-a-shield">Собрать щит</option>

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'sasha.volynchik.90@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'iehbr12804'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('sasha.volynchik.90@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('sasha.volynchik.90@mail.ru');     // Кому будет уходить письмо
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта VIPEVOKUATOR';
$mail->Body    = 'Имя клиента: ' .$name . ' <br> Телефон: ' .$phone. '<br>Тип услуги: ' .$service;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header("Refresh:0");
}
?>
