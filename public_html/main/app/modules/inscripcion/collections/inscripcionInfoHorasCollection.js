/* global Backbone, App */

App.collections.InscripcionInfoHorarioCollection = Backbone.Collection.extend({
    
    
    initialize: function () {
        console.log('Initializing Inscripcion Info Hora Collection');
    },
    
    model: App.models.InscripcionInfoHorarioModel

});

