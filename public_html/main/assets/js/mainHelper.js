/* global App, Backbone */

var waitForFinalEvent = (function () {
    var timers = {};

    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

$(".content-wrapper").on('click', function (event) {
    App.events.trigger('header:closeSideMenu', event);
});

$(function () {
    $('body').swipe({
        allowPageScroll: "auto",
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == "left") {
                App.events.trigger('header:closeSideMenu', event);

            }
        }
    });
});



$(window).resize(function (event) {
    waitForFinalEvent(function () {
        App.events.trigger('header:fix', event);
    }, 500, "window:resize-fix");
});


Backbone.history.on("all", function (route, router) {

    var path = Backbone.history.getFragment();
    var arrayPath = [];
    /*
     * Equivalente de ruta para cada página dentro del menu
     */
    var routes = [];
    for (var route in App.router.routes) {
        routes.push(route);
    }

    var titles = {};
    titles[routes[0]] = "Principal";
    titles[routes[1]] = "Historia";
    titles[routes[2]] = "Horario";
    titles[routes[3]] = "Inscripción";
    titles[routes[4]] = "Materias";
    titles[routes[5]] = "Perfil";

    $("#pathBar").empty();
    $("#pathBar").append('<li><i class="fa fa-dashboard"></i> Inicio</a></li> ');

    if (!App.router.routes.hasOwnProperty(path)) {
        $("#pageTitle").text('Página no encontrada');
        $("#pathBar").append('<li>Página no encontrada');
    } else if (path == "") {
        $("#pageTitle").text(titles[path]);
        $("#pathBar").append('<li>' + titles[path] + '</li> ');
    } else {
        $("#pageTitle").text(titles[path]);
        arrayPath = path.split("/");
        for (var i = 0; i < arrayPath.length; i++) {
            var word = arrayPath[i].split("_");
            arrayPath[i] = "";

            for (var j = 0; j < word.length; ++j) {
                word[j] = word[j].charAt(0).toUpperCase() + word[j].slice(1);
                arrayPath[i] = arrayPath[i] + " " + word[j];
            }

            $("#pathBar").append('<li>' + arrayPath[i] + '</li> ');
        }
    }

    App.events.trigger('header:closeSideMenu');
});

$(document).ajaxComplete(function(event,request, settings){
    //console.log("Ajax done! " + JSON.stringify(request.responseJSON));
});