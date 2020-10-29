<?php

//header('Contet-type: text/html; charset=ISO-8859-1');
//
//set_include_path("usr/share/nginx/php/pfinal");
//
//$test = DataAgent::arrayPost();

$test['nomCla'] = utf8_decode($_REQUEST['nomCla']);
$test['carrera'] = utf8_decode($_REQUEST['carrera']);
$test['semestre'] = utf8_decode($_REQUEST['semestre']);
$test['incReflexiones'] = utf8_decode($_REQUEST['incReflexiones']);
$test['reflexion'] = utf8_decode($_REQUEST['reflexion']);
$test['varOptativa'] = utf8_decode($_REQUEST['varOptativa']);

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
    $consulta = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE Carrera.Nombre LIKE '%$carrera%' && TipoMateria_idTipoMateria = 4 && Departamento.nombre IS NOT NULL;";
} else {
    if ($test['nomCla'] != "") {
        if ((int) $test['nomCla'] == 0) {
            $tmp = $test['nomCla'];
            $nomCla = "Materia.nombre LIKE '%$tmp%'";
        } else {
            $tmp = $test['nomCla'];
            $nomCla = "Materia.clave LIKE '%$tmp%'";
        }
        if ($test['carrera'] != "") {

            $carrera = $test['carrera'];
            if ($test['semestre'] != "") {
                $semestre = $test['semestre'];

                $consulta = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE Carrera.Nombre LIKE '%$carrera%'  && Departamento.nombre IS NOT NULL && Materia.horas IS NOT NULL && Materia_has_Carrera.semestreIdeal = '$semestre' && $nomCla;";
            } else {

                $consulta = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE Carrera.Nombre LIKE '%$carrera%'  && Departamento.nombre IS NOT NULL && Materia.horas IS NOT NULL && $nomCla;";
            }
        } else {

            if ($test['semestre'] != "") {
                $semestre = $test['semestre'];
                $consulta = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE  Departamento.nombre IS NOT NULL && Materia.horas IS NOT NULL && Materia_has_Carrera.semestreIdeal = '$semestre' && $nomCla;";
            } else {
                $consulta = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE  Departamento.nombre IS NOT NULL && Materia.horas IS NOT NULL && $nomCla;";
            }
        }
    } else {
        if ($test['carrera'] != "") {
            if ($test['semestre'] != "") {
                $semestre = $test['semestre'];
                $consulta = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE Carrera.Nombre LIKE '%$carrera%'  && Departamento.nombre IS NOT NULL && Materia.horas IS NOT NULL && Materia_has_Carrera.semestreIdeal = '$semestre';";
            } else {
                $consulta = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE Carrera.Nombre LIKE '%$carrera%'  && Departamento.nombre IS NOT NULL && Materia.horas IS NOT NULL;";
            }
        } else {
            if ($test['semestre'] != "") {
                $semestre = $test['semestre'];
                $consulta = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE Departamento.nombre IS NOT NULL && Materia.horas IS NOT NULL && Materia_has_Carrera.semestreIdeal = '$semestre';";
            } else {
                $consulta = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE Departamento.nombre IS NOT NULL && Materia.horas IS NOT NULL;";
            }
        }
    }
}

$resultado = mysql_query($consulta);
$data = "[";
while ($rs = mysql_fetch_assoc($resultado)) {
    if ($data != "[") {
        $data .= ",";
    }
    $data .= '{"clave":"' . $rs["clave"] . '",';
    $data .= '"nombre":"' . $rs["materia"] . '",';
    $data .= '"depto":"' . $rs["departamento"] . '",';
    $data .= '"horas":"' . $rs["horas"] . '",';
    $data .= '"creditos":"' . $rs["creditos"] . '"}';
}
$data .="]";
$queryUno = $data;


if ($test['incReflexiones']) {
    $reflexion = (int) $test['reflexion'];
    if ($test['nomCla'] != "") {
        if ((int) $test['nomCla'] == 0) {
            $tmp = $test['nomCla'];
            $nomCla = "Materia.nombre LIKE '%$tmp%'";
        } else {
            $tmp = $test['nomCla'];
            $nomCla = "Materia.clave LIKE '%$tmp%'";
        }
        $consulta2 = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE Materia.sigla LIKE 'RU$reflexion%' && $nomCla GROUP BY idMateria;";
    } else {
        $consulta2 = "SELECT Materia.clave,Materia.nombre AS materia,Departamento.nombre AS departamento,Materia.horas,Materia.creditos FROM Materia LEFT JOIN Departamento ON idDepartamento = Departamento_idDepartamento LEFT JOIN Materia_has_Carrera ON idMateria = Materia_idMateria LEFT JOIN Carrera ON idCarrera = Carrera_idCarrera WHERE Materia.sigla LIKE 'RU$reflexion%' GROUP BY idMateria;";
    }


    $resultado = mysql_query($consulta2);
    $data = "[";
    while ($rs = mysql_fetch_assoc($resultado)) {
        if ($data != "[") {
            $data .= ",";
        }
        $data .= '{"clave":"' . $rs["clave"] . '",';
        $data .= '"nombre":"' . $rs["materia"] . '",';
        $data .= '"depto":"' . $rs["departamento"] . '",';
        $data .= '"horas":"' . $rs["horas"] . '",';
        $data .= '"creditos":"' . $rs["creditos"] . '"}';
    }
    $data .="]";
    $queryDos = $data;

    if ($queryUno == '[]') {
        $final = $queryDos;
    } else {
        if($queryDos !='[]'){
            $queryDos = substr($queryDos, 1);
            $queryUno = substr($queryUno, 0, -1);
            $final = $queryUno . ',' . $queryDos;
        }
        else{
            $final = $queryUno;
        }

    }
} else {
    $final = $queryUno;
}

echo htmlentities($final, ENT_NOQUOTES | ENT_IGNORE, "ISO-8859-1");
?>