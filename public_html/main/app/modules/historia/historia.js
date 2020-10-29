/* global Backbone, App */

App.views.HistoriaView = Backbone.View.extend({
    
    initialize: function () {
        console.log('Initializing Historia View');
    },
    
    events: {
    },
    
    render: function () {
        $(this.el).html(this.template());
        return this;
    }

});