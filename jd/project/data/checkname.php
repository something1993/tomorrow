<?php
	header('Content-Type:application/json');
	$output=['status'=>0,'msg'=>''];
	$name=$_REQUEST['name'];
	$pwd=$_REQUEST['pwd'];
	$conn=mysqli_connect('127.0.0.1','root','','jd',3306);
	mysqli_query($conn,'SET NAMES UTF8');
	$sql="SELECT user_id FROM jd_users WHERE user_name='$name' AND user_pwd='$pwd'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);

	if($row){
		$output['status']=intval($row['user_id']);
		//把字符串转化为整数
		$output['msg']=$name;
	}else{
		$output['status']=-404;
		$output['msg']='用户名或密码错误';
	}
	echo json_encode($output);
?>