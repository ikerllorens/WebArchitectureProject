/* global Backbone, App */

App.collections.InscripcionMateriasCollection = Backbone.Collection.extend({
    
    url: "../main/assets/resources/materias.json",
    model: App.models.InscripcionMateriaModel,
    
    initialize: function () {
        console.log('Initializing Inscripcion Materias Collection');
    }
    

});