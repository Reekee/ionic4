<?php
    include_once('config/autoload.php');
    
    $project_id = @$REQUEST->project_id;
    $project_name = @$REQUEST->project_name;
    $project_detail = @$REQUEST->project_detail;
    $project_date = @$REQUEST->project_date;
    $project_amount = @$REQUEST->project_amount;
    $user_id = @$REQUEST->user_id;
    $date = date("Y-m-d h:i:s");
    $sql = "
        update project set
            `project_name`='".$project_name."',
            `project_detail`='".$project_detail."', 
            `project_date`='".$project_date."', 
            `project_amount`='".$project_amount."', 
            `project_image`='', 
            `user_id`='".$user_id."', 
            `date`='".$date."'
        Where project_id='".$project_id."'
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