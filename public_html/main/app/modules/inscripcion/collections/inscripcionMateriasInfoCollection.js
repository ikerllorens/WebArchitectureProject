/* global Backbone, App */

App.collections.InscripcionMateriasInfoCollection = Backbone.Collection.extend({
    
    model: App.models.InscripcionMateriaInfoModel,
    url: "../main/assets/resources/infoMaterias.json",
    
    initialize: function () {
        console.log('Initializing Inscripcion Materias Info Collection');
    }
    

});