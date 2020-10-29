/* global Backbone, App */

App.views.LoginView = Backbone.View.extend({
    /*
     *  Funcion: initialize
     *      Funcion encargada de incializar la vista.
     */
    initialize: function () {
        console.log('Initializing Login View');
    },
    
    /*
     *  Eventos: events
     *      Posibles eventos que se pueden presentar en la pagina
     *      ligadas a sus respectivas funciones.
     */
    events: {
        "click #loginButton": "login",
        "keydown #numCuenta": "notNumber"
    },
    
    /*
     *  Funcion: render
     *      Funcion encargada de mostrar la vista.
     */
    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    /*
     *  Funcion: notNumber
     *      Funcion encargada de validar que se introduscan
     *      solamente valores validos.
     *
     *      Entradas:   Event
     */
    notNumber: function(e) {
        /* Permite: retroceso, suprimir, tabulador, escape, enter y . */
        if ($.inArray(e.keyCode, [8, 9, 27, 13, 110, 190]) !== -1 ||
             /* Permite: Ctrl+A */
            (e.keyCode == 65 && e.ctrlKey === true) ||
             /* Permite: Ctrl+C */
            (e.keyCode == 67 && e.ctrlKey === true) ||
             /* Permite: Ctrl+X */
            (e.keyCode == 88 && e.ctrlKey === true) ||
             /* Permite: Inicio, Fin, Izquierda, Derecha */
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 /* Sin reaccion, permite que se introduscan */
                 return;
        }
        /* Verifica que sea un numero y detiene el evento */
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    },

    /*
     *  Funcion: login
     *      Funcion encargada de enviar los valores recibidos
     *      en los input de la pagina y recibir el JSON que
     *      contiene el token para la sesión.
     *
     *      Entradas:   Event
     */
    login:function (event) {
        event.preventDefault(); /* No permite que este boton entregue la forma */
        $('.alert-error').hide(); /* Esconde los errores en una nueva entrega */
        var url = '../login/archivo.json'; /* Referencia, necesita editarse al respectivo del login */
        console.log('Loggin in... ');
        
        
        if ($('#numCuenta').val()==="" || $('#digitVerif').val() ==="" || $('#pswd').val()==="" || $('#numCuenta').val().length < 6) {
            
            $('#error').slideDown();
        } else {
            /*
             * var key = this.makeKey();
             * var numCuenta = this.encrypt(key, $('#numCuenta').val());
             * var digitVerif = this.encrypt(key, $('#digitVerif').val());
             * var password = this.encrypt(key, $('#pswd').val());
             */
            var numCuenta = $('#numCuenta').val();
            var digitVerif = $('#digitVerif').val();
            var password = $('#pswd').val();
                        
            var formValues = {
                /* key: key, */
                numCuenta: numCuenta,
                digitVerif: digitVerif,
                password: password
            };
                        
            $.ajax({
                url:url,
                /*type:'POST',*/
                dataType:"json",
                data: formValues,
                success:function (data) {
                   
                   console.log(["Login request details: ", data]);

                   if(data.login) {  /* Si se presentan errores, mostrar los mensajes de error */
                        alert("Usuario o contraseña invalida.");
                   } else { /* Si no, mandar a la pagina principal */
                        sessionStorage.setItem("token", data.token);
                        window.location.replace('../main');
                   }
                }
            });
        }
    },
    
    /*
     *  Funcion: makeKey
     *      Funcion encargada de crear la llave con la que se lleva a cabo
     *      la encripcion de los datos antes de que se envien.
     *
     *      Salidas:    String
     */
    makeKey: function()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUV+WX-Y.Za,bc.d8ef9g?hijklmnopq!rs!tuvwxyz0123456789";

        for( var i=0; i < 16; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },
    
    /*
     *  Funcion: encrypt
     *      Funcion encargada de encriptar los datos a enviar. Utiliza la llave
     *      generada en la funcion makeKey para realizar esta encripcion.
     *
     *      Entradas:   key, str
     *      Salidas:    String
     */
    encrypt:
/*
 * RC4 symmetric cipher encryption/decryption
 *
 * @license Public Domain
 * @param string key - secret key for encryption/decryption
 * @param string str - string to be encrypted/decrypted
 * @return string
 */
function (key, str) {
	var s = [], j = 0, x, res = '';
	for (var i = 0; i < 256; i++) {
		s[i] = i;
	}
	for (i = 0; i < 256; i++) {
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
	}
	i = 0;
	j = 0;
	for (var y = 0; y < str.length; y++) {
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
	}
	return res;
    }
    
    
});


//
//<?php
//
///*
// * RC4 symmetric cipher encryption/decryption
// *
// * @license Public Domain
// * @param string key - secret key for encryption/decryption
// * @param string str - string to be encrypted/decrypted
// * @return string
// */
//function rc4($key, $str) {
//	$s = array();
//	for ($i = 0; $i < 256; $i++) {
//		$s[$i] = $i;
//	}
//	$j = 0;
//	for ($i = 0; $i < 256; $i++) {
//		$j = ($j + $s[$i] + ord($key[$i % strlen($key)])) % 256;
//		$x = $s[$i];
//		$s[$i] = $s[$j];
//		$s[$j] = $x;
//	}
//	$i = 0;
//	$j = 0;
//	$res = '';
//	for ($y = 0; $y < strlen($str); $y++) {
//		$i = ($i + 1) % 256;
//		$j = ($j + $s[$i]) % 256;
//		$x = $s[$i];
//		$s[$i] = $s[$j];
//		$s[$j] = $x;
//		$res .= $str[$y] ^ chr($s[($s[$i] + $s[$j]) % 256]);
//	}
//	return $res;
//}
//
//?>