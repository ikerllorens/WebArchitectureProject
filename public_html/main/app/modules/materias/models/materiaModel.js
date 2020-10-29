/* global Backbone, App */

App.models.MateriaModel = Backbone.Model.extend({
    
    initialize: function () {
        console.log('Initializing Materia Model');
    },
    
    defaults: {
        clave: '',
        nombre: '',
        depto: '',
        horas: '',
        creditos: ''
    }
    

});


