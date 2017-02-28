<?php
	header('Content-Type:application/json');
	$name=$_REQUEST['name'];
	$date=$_REQUEST['date'];
	$level=$_REQUEST['num'];
	$conn=mysqli_connect('127.0.0.1','root','','jd',3306);
	mysqli_query($conn,'SET NAMES UTF8');
	$sql="INSERT INTO jd_lottery VALUES(NULL,'$name','$date','$level')";
	$result=mysqli_query($conn,$sql);
	/*if($result){
		echo "alert('成功')";
	}else{echo "alert('失败')";}*/
?>
