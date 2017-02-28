<?php
    header("Content-Type:Application/json");

//did=1&name=kk&sex=1&phone=188&address=bj
    $output = [];
    @$id = $_REQUEST['did'];
    @$name = $_REQUEST['name'];
    @$sex = $_REQUEST['sex'];
    @$phone = $_REQUEST['phone'];
    @$address = $_REQUEST['address'];
    $time = time()*1000;

    if(empty($id) || empty($name) ||
        empty($sex) ||  empty($phone) ||  empty($address))
    {
        echo '[]';
        return;
    }

    $conn = mysqli_connect('127.0.0.1','root','','kaifanla');
    $sql = "SET NAMES UTF8";
    $result = mysqli_query($conn,$sql);

    $sql = "INSERT INTO kf_order VALUES(NULL,'$phone','$name','$sex'
            ,'$time','$address','$id')";
    $result = mysqli_query($conn,$sql);

    $arr = [];
    if($result)
    {
        $arr['did'] =  mysqli_insert_id($conn);
        $arr['msg'] = 'succ';
    }
    else
    {
        $arr['reason'] = 'SQLÖ´ÐÐÊ§°Ü';
        $arr['msg'] = 'error';
    }

    $output[] = $arr;
    echo json_encode($output);

?>