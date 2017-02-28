<?php
	header('Content-Type:application/javascript');
	$fn=$_REQUEST['fn'];

	$output=[
		'r'=>10,
		'rd'=>10,
		'rdd'=>10,
		'data'=>[100,200,300]
	];
	$json=json_encode($output);

	echo  $fn.'('.$json.')';
?>