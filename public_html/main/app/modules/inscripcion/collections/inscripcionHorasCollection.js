/* global Backbone, App */

App.collections.InscripcionHorasCollection = Backbone.Collection.extend({
    
    url: "../main/assets/resources/horario.php",
    
    initialize: function () {
        console.log('Initializing Inscripcion Horas Collection');
    },
    
    model: App.models.InscripcionHorasModel

});


