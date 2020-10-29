
<?php

$enlace =  mysql_connect('localhost', 'root', 'root');
if (!$enlace) {
    echo('No pudo conectarse: ' . mysql_error());
}

$bd_seleccionada = mysql_select_db('jesus', $enlace);
if (!$bd_seleccionada) {
    echo ('No se puede usar usuario: ' . mysql_error());
}

$numCuenta = 198745;

$consulta = sprintf("SELECT Materia.nombre AS materia,Materia.idMateria as idMateria, Grupo.nombre AS grupo,Salon.nombre AS salon,idTimeslot 
FROM Alumno RIGHT JOIN Grupo_has_Alumno ON idAlumno=Alumno_idAlumno LEFT JOIN Grupo 
ON idGrupo = Grupo_has_Alumno.Grupo_idGrupo LEFT JOIN Materia ON idMateria = Materia_idMateria LEFT JOIN Empleado 
ON idEmpleado=Empleado_idEmpleado LEFT JOIN Salon_has_Timeslot ON idGrupo = Salon_has_Timeslot.Grupo_idGrupo 
LEFT JOIN Timeslot ON idTimeslot = Timeslot_idTimeslot LEFT JOIN Salon ON idSalon = Salon_idSalon 
WHERE Alumno.cuenta='%s'",mysql_real_escape_string($numCuenta));

mysql_query("SET CHARACTER SET utf8 ");
$resultado = mysql_query($consulta);

// Comprobar el resultado
if (!$resultado) {
    $mensaje  = 'Consulta no válida: ' . mysql_error() . "\n";
    $mensaje .= 'Consulta completa: ' . $consulta;
    die($mensaje);
}
$groups=array();
while ($fila = mysql_fetch_assoc($resultado)) {

$temp = array(
	array(
		'nombreMateria' => $fila['materia'],
		'idMateria' => $fila['idMateria'],
		utf8_encode('idMateriallll') => $fila['idMateria'],
		'grupo' => $fila['grupo'],
		'infoHorario' => array(
			array('idHr' => $fila['idTimeslot'],'salon' => $fila['salon'])
		),
	)
);

	$groups=array_merge($groups,$temp);

}

echo json_encode($groups);


// Liberar los recursos asociados con el conjunto de resultados
mysql_free_result($resultado);
mysql_close(); 


?>