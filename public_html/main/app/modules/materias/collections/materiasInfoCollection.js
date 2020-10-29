/* global Backbone, App */

App.collections.MateriasInfoCollection = Backbone.Collection.extend({
    
    model: App.models.MateriaInfoModel,
    url: "../main/assets/resources/infoMaterias.json",
    
    initialize: function () {
        console.log('Initializing Materias Info Collection');
    }
    

});


