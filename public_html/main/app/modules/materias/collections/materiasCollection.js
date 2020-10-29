/* global Backbone, App */

App.collections.MateriasCollection = Backbone.Collection.extend({
    
    url: "../main/assets/resources/busqueda.php",
    model: App.models.MateriaModel,
    
    initialize: function () {
        console.log('Initializing Materias Collection');
    }
    

});


