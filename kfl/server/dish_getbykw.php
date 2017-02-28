<?php
    header("Content-Type:Application/json");

    @$kw = $_REQUEST['kw'];

    if(empty($kw))
    {
        echo '[]';
        return;
    }
    //var_dump($kw);

    $conn = mysqli_connect('127.0.0.1','root','','kaifanla');
    $sql = "SET NAMES UTF8";
    $result = mysqli_query($conn,$sql);

    $sql = "SELECT name,price,img_sm,detail,material
        FROM kf_dish WHERE name LIKE '%$kw%' OR material LIKE '%$kw%' ";
    $result = mysqli_query($conn,$sql);

    $output = [];

    while(true)
    {
        $row = mysqli_fetch_assoc($result);
        if(!$row)
        {
            break;
        }
        $output[] = $row;
    }

    echo json_encode($output);
?>