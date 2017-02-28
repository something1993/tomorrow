<?php
	header('Content-Type:application/json');
	$name=$_REQUEST['name'];
	$count = [
		'total_count'=>0,//总抽奖次数
		'used_count'=>0,//已经使用的抽奖次数
		'left_count'=>0//剩余的抽奖次数
	];  
	$conn=mysqli_connect('127.0.0.1','root','','jd',3306);
	mysqli_query($conn,'SET NAMES UTF8');
	$sql="SELECT SUM(price) FROM jd_orders WHERE user_name='$name'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$count['total_count']=floor(($row['SUM(price)'])/100);
	$count['left_count']=$count['total_count']-$count['used_count'];
	echo json_encode($count);
?>
