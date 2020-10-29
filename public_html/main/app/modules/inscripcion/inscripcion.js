/* global Backbone, App, _ */

App.views.InscripcionView = Backbone.View.extend({
    
    initialize: function () {
        console.log('Initializing Inscripcion View');
        
        this.horarioView = new App.views.InscripcionHorarioView();
        this.materiasView = new App.views.InscripcionMateriasView();
        this.infoView = new App.views.InscripcionInfoView();
    },
    
    events: {
    },
    
    render: function () {
        $(this.el).html(this.template());
        
        this.$('#horarioView').html(this.horarioView.render().el);
        this.$('#materiasView').html(this.materiasView.render().el);
        this.$('#infoView').html(this.infoView.render().el);
        
        return this;
    }

});