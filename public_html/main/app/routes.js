/* global Backbone, App */

var Router = Backbone.Router.extend({
    routes: {
        "": "home",
        "servicios_escolares/datos_escolares/historia": "historia",
        "servicios_escolares/datos_escolares/horario": "horario",
        "servicios_escolares/datos_escolares/inscripcion": "inscripcion",
        "servicios_escolares/datos_escolares/materias": "materias",
        "perfil": "perfil",
        "*notFound": "notFound"
    },
    initialize: function () {
        /* Header */
        this.headerView = new App.views.HeaderView();
        $("#header").html(this.headerView.render().el);
        /* Footer */
        this.footerView = new App.views.FooterView();
        $("#footer").html(this.footerView.render().el);
    },
    home: function () {
        this.homeView = new App.views.HomeView();
        this.homeView.render();
        $("#content").html(this.homeView.el);
    },
    historia: function () {
        this.historiaView = new App.views.HistoriaView();
        this.historiaView.render();
        $("#content").html(this.historiaView.el);
    },
    horario: function () {
        this.horarioView = new App.views.HorarioView();
        this.horarioView.render();
        $("#content").html(this.horarioView.el);
    },
    inscripcion: function () {
        this.inscripcionView = new App.views.InscripcionView();
        this.inscripcionView.render();
        $("#content").html(this.inscripcionView.el);
    },
    materias: function () {
        this.materiasView = new App.views.MateriasView();
        this.materiasView.render();
        $("#content").html(this.materiasView.el);
    },
    perfil: function () {
        this.perfilView = new App.views.PerfilView();
        this.perfilView.render();
        $("#content").html(this.perfilView.el);
    },
    notFound: function () {
        this.notFoundView = new App.views.NotFoundView();
        this.notFoundView.render();
        $("#content").html(this.notFoundView.el);
    }
});

window.onload = function () {
    App.start(Router, [
        "HeaderView",
        "FooterView",
        "HomeView",
        "HistoriaView",
        "InscripcionView",
        "HorarioView",
        "MateriasView",
        "PerfilView",
        "NotFoundView",
        "InscripcionHorarioView",
        "InscripcionMateriasView",
        "InscripcionInfoView",
        "InscripcionMateriasInfoView",
        "InscripcionHorarioInfoGruposView",
        "MateriasInfoView"
    ]);
};