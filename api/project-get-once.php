<?php
    include_once('config/autoload.php');

    $project_id = @$REQUEST->project_id;

    $sql = "SELECT * 
        FROM project 
        Where project_id='".$project_id."'
        ORDER BY project_id DESC";

    $rs = $DATABASE->QueryObj($sql);
    if( sizeof($rs)==1 ) {
        echo json_encode(array(
            "status"=>true,
            "data"=>$rs[0]
        ));
    } else {
        echo json_encode(array(
            "status"=>false,
            "message"=>"ไม่พบข้อมูลโครงการ"
        ));
    }
    
