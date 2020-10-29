/* global Backbone, App */

App.views.HeaderView = Backbone.View.extend({
    
    initialize: function () {
        console.log('Initializing Header View');
    },
    
    events: {
    },
    
    render: function () {
        $(this.el).html(this.template());
        return this;
    }

});