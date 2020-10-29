/* global App, Backbone */

App.models.InscripcionInfoHorarioModel = Backbone.Model.extend({
    
    initialize: function () {
        console.log('Initializing Inscripcion Info Model');
    },
    
    defaults: {
        idHr: '',
        salon: ''
    }

});


