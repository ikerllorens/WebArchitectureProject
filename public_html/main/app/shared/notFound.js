/* global Backbone, App */

App.views.NotFoundView = Backbone.View.extend({
    
    initialize: function () {
        console.log('Initializing NotFound View');
    },
    
    events: {
    },
    
    render: function () {
        $(this.el).html(this.template());
        return this;
    }

});