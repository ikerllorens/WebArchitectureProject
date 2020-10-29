<?php

header('Contet-type: text/html; charset=ISO-8859-1');
$test['varOptativa'] = true;
$test['carrera'] = utf8_decode("Comunicación");

# Connect
$enlace = mysql_connect('localhost', 'root', 'root');
if (!$enlace) {
    echo('No pudo conectarse: ' . mysql_error());
}

$bd_seleccionada = mysql_select_db('jesus', $enlace);
if (!$bd_seleccionada) {
    echo ('No se puede usar usuario: ' . mysql_error());
}


if ($test['varOptativa']) {
    $carrera = $test['carrera'];
    $consulta = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE Carrera.Nombre ='$carrera' && TipoMateria_idTipoMateria = 4 && Departamento.nombre IS NOT NULL;";
//    echo htmlentities($consulta, ENT_NOQUOTES | ENT_IGNORE,"ISO-8859-1");
//    mysql_query("SET CHARACTER SET UTF8");
    $resultado = mysql_query($consulta);
} else {
    
}
$groups = array();
// while ($fila = mysql_fetch_assoc($resultado)) {
// $temp = array(
// 	array(
// 		'clave' => $fila['clave'],
// 		'materia' => $fila['materia'],
            
// 		'departamento' => $fila['departamento'],
//                 'hora' => $fila['horas'],
//                 'creditos' => $fila['creditos']

// 	)
// );
// //        echo $array = 'óptica'.'<br>';
// //        echo $fila['materia'].'<br>';  
// 	$groups=array_merge($groups,$temp);
// //        echo($fila['materia']);

//}

$data = "[";
while ($rs = mysql_fetch_assoc($resultado)) {
    if ($data != "[") {
        $data .= ",";
    }
    $data .= '{"clave":"' . $rs["clave"] . '",';
    $data .= '"materia":"' . $rs["materia"] . '",';
    $data .= '"departamento":"' . $rs["departamento"] . '",';
    $data .= '"hora":"' . $rs["horas"] . '",';
    $data .= '"creditos":"' . $rs["creditos"] . '"}';
}
$data .="]";

echo htmlentities($data, ENT_NOQUOTES | ENT_IGNORE,"ISO-8859-1");
//$groups = utf8_encode($groups);
//echo json_encode(htmlentities($groups,ENT_NOQUOTES | ENT_IGNORE ,"ISO-8859-1"));

//echo $groups;
//echo json_last_error();

//print_r(htmlentities($groups, ENT_NOQUOTES | ENT_IGNORE,"ISO-8859-1"));

mysql_close($enlace);
// Liberar los recursos asociados con el conjunto de resultados
mysql_free_result($resultado);

?>
