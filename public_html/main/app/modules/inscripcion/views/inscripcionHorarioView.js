/* global Backbone, App, _ */

App.views.InscripcionHorarioView = Backbone.View.extend({
    initialize: function () {
        console.log('Initializing Inscripcion Horario View');

        _.bindAll(this, 'fillSchedule', 'refreshHorario', 'grupoInfo', 'populateGruposInfo');

        this.infoGruposView = new App.views.InscripcionHorarioInfoGruposView();

        this.collection = new App.collections.InscripcionHorasCollection();
        var params = {
            token: window.sessionStorage.getItem('token')
        };
        this.collection.fetch({data: $.param(params)});

        this.listenTo(this.collection, "sync", this.fillSchedule);
        this.listenTo(this.infoGruposView.collection, "sync", this.populateGruposInfo);

        this.listenTo(App.events, "MateriasHorario:refreshHorario", this.refreshHorario);
    },
    events: {
        "click .infoGrupoModal": "grupoInfo"
    },
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    fillSchedule: function () {

        this.collection.each(function (model, index) {
            var idMateria = model.get('idMateria');
            var nombreMateria = model.get('nombreMateria');
            var grupo = model.get('grupo');
            var idhora;
            var idhoraTab;
            var td;
            var tdTab;

            var infoHorario = model.get('infoHorario');

            $.each(infoHorario, function (index, model) {
                idhora = '#hr' + (model.idHr);
                idhoraTab = '#tabhr' + (model.idHr);
                $(idhora).html('[' + idMateria + ']' + grupo);
                $(idhoraTab).html(nombreMateria);
                $(idhora).popover();
                $(idhora).attr('data-content', 'Materia: ' + nombreMateria + '<br>' + 'Salón: ' + model.salon);
                td = $(idhora).closest('td');
                td.attr('data-materiaID', idMateria);
                if (td.attr("class") == "sin-materia") {
                    td.attr("class", "ocupado");
                } else {
                    td.attr("class", "conflicto");
                }
                tdTab = $(idhoraTab).closest('td');
                tdTab.attr('data-materiaID', idMateria);
                if (tdTab.attr("class") == "sin-materia") {
                    tdTab.attr("class", "ocupado");
                } else {
                    tdTab.attr("class", "conflicto");
                }
            });
        });
    },
    refreshHorario: function () {
        var params = {
            token: window.sessionStorage.getItem('token')
        };
        this.collection.fetch({data: $.param(params)});

    },
    grupoInfo: function (e) {
        var $this = e.currentTarget;

        $($this).popover('hide');
        
        var params = {
            token: window.sessionStorage.getItem('token')
        };
        this.infoGruposView.collection.fetch({data: $.param(params)});
    },
    populateGruposInfo: function () {
        $('#inscripcionHorarioGruposData').empty();
        $('#inscripcionHorarioGruposData').html(this.infoGruposView.render().el);
    }

});