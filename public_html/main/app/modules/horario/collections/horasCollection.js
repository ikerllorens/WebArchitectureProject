/* global Backbone, App */

App.collections.HorasCollection = Backbone.Collection.extend({
    
    url: "../main/assets/resources/horario.php",
    
    initialize: function () {
        console.log('Initializing Horas Collection');
    },
    
    model: App.models.HorasModel

});


