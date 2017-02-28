<?php
	header('Content-Type:application/json');
	$output=[];
	$output[]=['name'=>'1月','value'=>2000];
	$output[]=['name'=>'2月','value'=>3000];
	$output[]=['name'=>'3月','value'=>4000];
	$output[]=['name'=>'4月','value'=>1500];
	$output[]=['name'=>'5月','value'=>5000];
	$output[]=['name'=>'6月','value'=>8000];
	$output[]=['name'=>'7月','value'=>6500];
	$output[]=['name'=>'8月','value'=>3500];
	$output[]=['name'=>'9月','value'=>4500];
	$output[]=['name'=>'10月','value'=>5000];
	$output[]=['name'=>'11月','value'=>6000];
	$output[]=['name'=>'12月','value'=>7000];
	echo json_encode($output);
?>