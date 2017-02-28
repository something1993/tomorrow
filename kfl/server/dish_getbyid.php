<?php
    header("Content-Type:Application/json");

    @$id = $_REQUEST['id'];

    if(empty($id))
    {
        echo '[]';
        return;
    }

    $conn = mysqli_connect('127.0.0.1','root','','kaifanla');
    $sql = "SET NAMES UTF8";
    $result = mysqli_query($conn,$sql);

    $sql = "SELECT name,did,price,img_sm,detail,material
        FROM kf_dish WHERE did=$id";
    $result = mysqli_query($conn,$sql);

    $output = [];
    $row = mysqli_fetch_assoc($result);
    $output[] = $row;

    echo json_encode($output);
?>