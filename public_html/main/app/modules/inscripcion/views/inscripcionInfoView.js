/* global Backbone, App, _ */

App.views.InscripcionInfoView = Backbone.View.extend({
    
    initialize: function () {
        console.log('Initializing Inscripcion Info View');
        
        var _this = this;
        
        _(function () {
            _this.setInfo();
        }).defer();
    },
    
    events: {
    },
    
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    setInfo: function () {
        $('.nombreUsuario').html(window.sessionStorage.getItem('nombre'));
        $('.nombreCarrera').html(window.sessionStorage.getItem('carrera'));
        $('.semestreActual').html(window.sessionStorage.getItem('semestre'));
    }

}); 