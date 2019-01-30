<?php
    include_once "../conf/database.php";
    if(isset($_GET)){
        
        $db = new Database();
        $conn = $db->getConn();

        $sql="SELECT id,nombre FROM departamentos";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        while($row = $stmt->fetch()){
            echo "<option value=".$row["id"].">".$row["nombre"]."</option>";
        }
    }
?>