<?php
    include_once('config/autoload.php');

    $sql = "SELECT * FROM project ORDER BY project_id DESC";

    $rs = $DATABASE->QueryObj($sql);
    echo json_encode(array(
        "status"=>true,
        "data"=>$rs
    ));
