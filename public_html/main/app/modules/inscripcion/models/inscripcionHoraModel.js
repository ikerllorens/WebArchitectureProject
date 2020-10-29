/* global Backbone, App */

App.models.InscripcionHorasModel = Backbone.Model.extend({
    
    initialize: function () {
        console.log('Initializing Inscripcion Horas Model');
    },
    
    defaults: {
        nombreMateria: '',
        idMateria: '',
        grupo: '',
        infoHorario: []
    },
    
    parse: function(response) {
                
        this.set({nombreMateria: response.nombreMateria});
        this.set({idMateria: response.idMateria});
        this.set({grupo: response.grupo});
        
        var infoHorario = new App.collections.InscripcionInfoHorarioCollection();
        infoHorario.add(response.infoHorario);
        
        this.set({infoHorario: infoHorario});
        
        return response;
    }

});


