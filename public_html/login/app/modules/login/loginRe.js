/* global Backbone, App */


App.views.LoginView = Backbone.View.extend({
    
    initialize: function () {
        console.log('Initializing Login View');
        
    },
    
    events: {
        "click #loginButton": "login",
        "keydown #numCuenta": "notNumber"
    },
    
    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    notNumber: function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    },

    
    login:function (event) {
        event.preventDefault(); // Don't let this button submit the form
        $('.alert-error').hide(); // Hide any errors on a new submit
        var url = '../api/login';
        console.log('Loggin in... ');
        
        
        if ($('#numCuenta').val()==="" || $('#digitVerif').val() ==="" || $('#pswd').val()==="" || $('#numCuenta').val().length < 6) {
            
            $('#error').slideDown();
        } else {
            var key = this.makeKey();
            var numCuenta = this.encrypt(key, $('#numCuenta').val());
            var digitVerif = this.encrypt(key, $('#digitVerif').val());
            var password = this.encrypt(key, $('#pswd').val());
            
            alert(numCuenta + "--" + digitVerif + "--" + password);
            
            var formValues = {
                key: key,
                numCuenta: numCuenta,
                digitVerif: digitVerif,
                password: password
            };
            
            alert(JSON.stringify(formValues));
            
            
            //$.ajax({
            //    url:url,
            //    type:'POST',
            //    dataType:"json",
            //    data: formValues,
            //    success:function (data) {
            //        console.log(["Login request details: ", data]);
            //       
            //        if(data.error) {  // If there is an error, show the error messages
            //            $('.alert-error').text(data.error.text).show();
            //        }
            //        else { // If not, send them back to the home page
            //            window.location.replace('#');
            //        }
            //    }
        //});
        }
    },
    
    makeKey: function()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUV+WX-Y.Za,bc.d8ef9g?hijklmnopq!rs!tuvwxyz0123456789";

        for( var i=0; i < 16; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },
    
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