/* global Backbone, App, _ */

App.views.HeaderView = Backbone.View.extend({

    /*
    * Definicion de los tamanos de pantalla dentro del proyecto
    */
    initialize: function () {
        console.log('Initializing Header View');
        _.bindAll(this, 'pushMenu', 'closeSideMenu', 'tree', 'fix', 'setActiveElem');

        
        this.options = {
            screenSizes: {
                xs: 480,
                sm: 768,
                md: 992,
                lg: 1200
            }
        };
        /* Declaracion de eventos externos*/
        this.listenTo(App.events,'header:closeSideMenu', this.closeSideMenu);
        this.listenTo(App.events,'header:pushMenu', this.pushMenu);
        this.listenTo(App.events,'header:fix', this.fix);
        
        var _this = this;
        
        _(function () {
            _this.setInfo();
        }).defer();
       
    },
    /* Declaracion de eventos locales*/
    events: {
        "click #toggleSidemenu": "pushMenu",
        "click .content-wrapper": "closeSideMenu",
        "click li a": "tree",
        "click .lista-menu": "setActiveElem",
        "swipe .sidebar-menu": "closeSideMenu"

    },
    /*
     *  Funcion: render
     *      Funcion encargada de mostrar la vista.
     */
    render: function () {
        $(this.el).html(this.template());

        var _this = this;
        _(function () {
            _this.fix();
        }).defer();

        return this;
    },
    /* 
    * Funcion encargada de mostrar el sidebar del menu, aplica y quita la clase que muestra el menu
    * Importante mencionar que el sidebar se ejecuta por medio de css, en la aplicacion de una clase
    */
    pushMenu: function (e) {
        e.preventDefault();
        var screenSizes = this.options.screenSizes;

        if ($(window).width() > (screenSizes.sm - 1)) {
            $("body").toggleClass('sidebar-collapse'); 
        }
        /* En caso de ser un dispositivo con pantalla pequeña */
        else {

            if ($("body").hasClass('sidebar-open')) {
                $("body").removeClass('sidebar-open');
                $("body").removeClass('sidebar-collapse');
            } else {
                $("body").addClass('sidebar-open');
            }
        }
    },
    
    closeSideMenu: function () {
        
        var screenSizes = this.options.screenSizes;
        /* Esconder menu si se hace click en content-wrapper en pantallas pequeñas */
        if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
            $("body").removeClass('sidebar-open');
        } 
        if ($(window).width() >= (screenSizes.sm)) { 
            $("body").addClass('sidebar-collapse');
        }
    },
    
    /*
    * Funcion utilizada para ajustar los elementos a su posicion al ser llamada
    */
    fix: function () {
        var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
        var window_height = $(window).height();
        var sidebar_height = $(".sidebar").height();

        if ($("body").hasClass("fixed")) { 
            $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
        } else {
            if (window_height >= sidebar_height) {
                $(".content-wrapper, .right-side").css('min-height', window_height - neg);
            } else {
                $(".content-wrapper, .right-side").css('min-height', sidebar_height);
            }
        }
    },

    /*
    * Funcion utilizada para animar y construir el menu cuando hay una lista treeview
    * que seria un submenu
    */
    tree: function (e) {
        var _this = this;
        var $thisElement = $(e.currentTarget);
        $thisElement.add('.sidebar');
        var checkElement = $thisElement.next();


        if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
            checkElement.slideUp('normal', function () {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
        } else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            var parent = $thisElement.parents('ul').first();
            var ul = parent.find('ul:visible').slideUp('normal');
            ul.removeClass('menu-open');

            var parent_li = $thisElement.parent("li");


            checkElement.slideDown('normal', function () {
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');

            });
        }

        if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
        }
    },

    /* 
    * Funcion que detecta el elemnto activo en el menu y lo colorea para que el usuario
    * sepa donde se encuentra
    */
    setActiveElem: function (e) {
        var $thisElement = $(e.currentTarget);
        var path = [];
        var nivel = 0;

        var $pathFinder = $thisElement;
        path.push($thisElement.text());

        $(".lista-menu").removeClass("active");
        $($thisElement).toggleClass("active");

        while ($pathFinder.attr('id') != "sidebarLeft") {
            if ($pathFinder.hasClass('treeview')) {
                ++nivel;
                htmlLine = $pathFinder.children('a');
                path.push(htmlLine.text());
            }
            $pathFinder = $pathFinder.parent();
        }

        if (nivel == 0) {
            $(".treeview-menu").slideUp('normal');
            $(".treeview-menu").removeClass('menu-open');
            $(".treeview").removeClass('active');
        }
    },

    /*
    * Obtencion y posicionamiento de la informacion basica del alumno para que la aplicacion quee 
    * personalizada con dicha informacion en el sidebar y en el dropdown menu de perfil
    */
    setInfo: function () {
        $('.nombreUsuario').html(window.sessionStorage.getItem('nombre'));
        $('.nombreCarrera').html(window.sessionStorage.getItem('carrera'));
        $('.semestreActual').html(window.sessionStorage.getItem('semestre'));

    }
});