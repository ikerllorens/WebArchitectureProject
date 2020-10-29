/* global Backbone, App */

App.views.HomeView = Backbone.View.extend({
    
    initialize: function () {
        console.log('Initializing Home View');
    },
    
    events: {
    },
    
    render: function () {
        $(this.el).html(this.template());
        return this;
    }

});