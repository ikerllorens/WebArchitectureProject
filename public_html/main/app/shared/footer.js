/* global Backbone, App */

App.views.FooterView = Backbone.View.extend({
    
    initialize: function () {
        console.log('Initializing Footer View');
    },
    
    events: {
    },
    
    render: function () {
        $(this.el).html(this.template());
        return this;
    }

});