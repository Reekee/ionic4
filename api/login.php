<?php
    include_once('config/autoload.php');

    $username = @$REQUEST->username;
    $password = @$REQUEST->password;
    //echo "Hello";

    $sql = "
            SELECT * 
            FROM user 
            WHERE username='".$username."' 
                AND password='".$password."' 
    ";

    $rs = $DATABASE->QueryObj($sql);
    if( sizeof($rs)==1 ) {
        echo json_encode(array(
            "status"=>true,
            "user"=>$rs[0]
        ));
    } else {
        echo json_encode(array(
            "status"=>false
        ));
    }
