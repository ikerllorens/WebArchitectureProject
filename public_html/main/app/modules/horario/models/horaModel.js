/* global Backbone, App */

App.models.HorasModel = Backbone.Model.extend({
    
    initialize: function () {
        console.log('Initializing HorasModel');
    },
    
    defaults: {
        nombreMateria: '',
        idMateria: '',
        grupo: '',
        infoHorario: []
    },
    
    parse: function(response) {
        
        //console.log(JSON.stringify(response));
        
        this.set({nombreMateria: response.nombreMateria});
        this.set({idMateria: response.idMateria});
        this.set({grupo: response.grupo});
        
        var infoHorario = new App.collections.InfoHorarioCollection();
        infoHorario.add(response.infoHorario);
        
        this.set({infoHorario: infoHorario});
        
        return response;
    }

});


