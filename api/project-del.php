<?php
    include_once('config/autoload.php');

    $project_id = @$REQUEST->project_id;
    
    $sql = "
        Delete from project 
        Where `project_id`= '".$project_id."'
    ";
    if( $DATABASE->Query($sql) ) {
        echo json_encode(array(
            "status"=>true,
        ));
    } else {
        echo json_encode(array(
            "status"=>false,
            "message"=>"ติดต่อฐานข้อมูลไม่ได้"
        ));
    }