/* global Backbone, App */

App.views.PerfilView = Backbone.View.extend({
    
    initialize: function () {
        console.log('Initializing Perfil View');
    },
    
    events: {
    },
    
    render: function () {
        $(this.el).html(this.template());
        return this;
    }

});