/* global Backbone, App */

App.collections.InfoHorarioCollection = Backbone.Collection.extend({
    
    
    initialize: function () {
        console.log('Initializing InfoHoraCollection');
    },
    
    model: App.models.InfoHorarioModel

});

