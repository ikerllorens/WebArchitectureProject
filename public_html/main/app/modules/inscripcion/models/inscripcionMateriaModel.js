/* global Backbone, App */

App.models.InscripcionMateriaModel = Backbone.Model.extend({
    
    initialize: function () {
        console.log('Initializing Inscripcion Materia Model');
    },
    
    defaults: {
        clave: '',
        nombre: '',
        depto: '',
        horas: '',
        creditos: ''
    }
    

});


