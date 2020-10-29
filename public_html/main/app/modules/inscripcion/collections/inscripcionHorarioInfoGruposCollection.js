/* global Backbone, App */

App.collections.InscripcionHorarioInfoGruposCollection = Backbone.Collection.extend({
    
    model: App.models.InscripcionHorarioInfoGrupoModel,
    url: "../main/assets/resources/infoGrupos.json",
    
    initialize: function () {
        console.log('Initializing Inscripcion Horario Info Grupos Collection');
    }
   
});