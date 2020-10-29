/* global App, Backbone, _ */

App.views.InscripcionHorarioInfoGruposView = Backbone.View.extend({
    initialize: function () {
        console.log('Initializing Inscripcion Horario Info Grupos View');
        _.bindAll(this, 'quitarMateria');
        
        this.collection = new App.collections.InscripcionHorarioInfoGruposCollection();
    },
    events: {
        "click .btn-quitar": "quitarMateria"
    },
    data:{},
    render: function () {
        this.delegateEvents();
        
        $(this.el).html(this.template({
            collection: this.collection.toJSON()
        }));
        return this;
    },
    quitarMateria: function (event) {
        var $this = $(event.currentTarget);
        var idGrupo = $this.attr("id");
        var idMateria = this.data.idMateria;
        //TODO ajax crud
        $.ajax({
            url: "../algo/que/no/existe.php",
            dataType: "json",
            type:"POST",
            data: {
                "idMateria": idMateria,
                "idGrupo": idGrupo,
                "token": window.sessionStorage.getItem('token')
            },
            success: function () {
                App.events.trigger('MateriasHorario:refreshHorario', event);
            },
            error: function () {
                
            }   
        });
    }   
});