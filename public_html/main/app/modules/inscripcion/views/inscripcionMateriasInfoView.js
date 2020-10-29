/* global App, Backbone, _ */

App.views.InscripcionMateriasInfoView = Backbone.View.extend({
    initialize: function () {
        console.log('Initializing Inscripcion Materias Info View');
        _.bindAll(this, 'inscribirMateria');
        
        this.collection = new App.collections.InscripcionMateriasInfoCollection();
        
    },
    events: {
        "click .btn-inscribir": "inscribirMateria"
    },
    data:{},
    render: function () {
        this.delegateEvents();
        $(this.el).html(this.template({
            collection: this.collection.toJSON()
        }));
        return this;
    },
    inscribirMateria: function (event) {
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
        console.log(idMateria + " " + idGrupo);
    }   
});