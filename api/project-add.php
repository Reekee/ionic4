<?php
    include_once('config/autoload.php');

    $project_name = @$REQUEST->project_name;
    $project_detail = @$REQUEST->project_detail;
    $project_date = @$REQUEST->project_date;
    $project_amount = @$REQUEST->project_amount;
    $user_id = @$REQUEST->user_id;
    $project_id = $DATABASE->QueryMaxId("project", "project_id");
    $date = date("Y-m-d h:i:s");
    $sql = "
        Insert into project (
            `project_id`, 
            `project_name`, 
            `project_detail`, 
            `project_date`, 
            `project_amount`, 
            `project_image`, 
            `user_id`, 
            `date`
        ) values (
            '".$project_id."', 
            '".$project_name."', 
            '".$project_detail."', 
            '".$project_date."', 
            '".$project_amount."', 
            '', 
            '".$user_id."', 
            '".$date."'
        )
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