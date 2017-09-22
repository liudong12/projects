<?php
//echo "<script language=\"JavaScript\">alert(\"hello\");</script>";
//echo "<script>alert('hello2');</script>";
session_start();

$errors = array(); // array to hold validation errors
$data   = array(); // array to pass back data

//sleep(1);
usleep(1000000);

if($_SERVER['REQUEST_METHOD'] === 'POST') {//从contact.js 传来的数据
    $name    = stripslashes(trim($_POST['name']));
    $email   = stripslashes(trim($_POST['email']));
  $tel = stripslashes(trim($_POST['tel']));
    $message = stripslashes(trim($_POST['message']));
    $code = stripslashes(trim($_POST['code']));
	
if (empty($name)) {
       
	      $errors['name'] = 'Name is required.';
    }
if (empty($email)) {
        $errors['email'] = 'email is required.';
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Email is invalid.';
    }
	  if (empty($tel)) {
        $errors['tel'] = 'tel is required.';
    }
	   if (empty($message)) {
        $errors['message'] = 'message is required.';
    }


if(empty($_SESSION['6_letters_code'] ) ||
	  strcasecmp($_SESSION['6_letters_code'], $_POST['code']) != 0)
	{
		
		
	//Note: the captcha code is compared case insensitively.
	//if you want case sensitive match, update the check above to
	// strcmp()
	
//	echo "<span class='status-not-available'> Code Not Match.</span>";
//echo "<span class='status-not-available'> Code Not Match.</span>";

//$data['success'] = false;
$errors['code'] = 'Code Not Match';

	}
	
	
	if (!empty($errors)) {
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        $data['success'] = true;
        $data['message'] = 'looks good';
    }
	echo json_encode($data);
	}
	
//require_once("dbcontroller.php");
//$db_handle = new DBController();
//
//
//if(!empty($_POST["username"])) {
//$result = mysql_query("SELECT count(*) FROM users WHERE userName='" . $_POST["username"] . "'");
//$row = mysql_fetch_row($result);
//$user_count = $row[0];
//if($user_count>0) {
//    echo "<span class='status-not-available'> Username Not Available.</span>";
//}else{
//    echo "<span class='status-available'> Username Available.</span>";
//}
//}

?>