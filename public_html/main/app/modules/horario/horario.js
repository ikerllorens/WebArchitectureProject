/* global Backbone, App, _ */

App.views.HorarioView = Backbone.View.extend({
    /*
    * Inicializacion del modulo de Horario
    * Declaracion de la coleccion de modelos y peticion de a la base de datos
    */
    initialize: function () {
        console.log('Initializing Horario View');
        
        _.bindAll(this,'fillSchedule');
        
        this.collection = new App.collections.HorasCollection();
        var params = {
            token: window.sessionStorage.getItem('token'),
			cuenta: window.sessionStorage.getItem('cuenta')
        };
        this.collection.fetch({data: $.param(params)});
        
        this.listenTo(this.collection,"sync",this.fillSchedule);
        
    },
    
    events: {
    },
    
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
    fillSchedule: function() {
        
        
        this.collection.each(function(model,index){
            var idMateria = model.get('idMateria');
            var nombreMateria = model.get('nombreMateria');
            var grupo = model.get('grupo');
            var idhora;
            var idhorap;
            
            var infoHorario = model.get('infoHorario');
            
            $.each(infoHorario,function(index,model){
                idhora = '#hr'+(model.idHr);
                idhorap = '#phr'+(model.idHr);
                $(idhora).html(nombreMateria+
                    '<br>'+model.salon);
                $(idhorap).html('['+idMateria+'] '+grupo);
            });
            
        });
    }

});