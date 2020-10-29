/* global App, Backbone */

App.views.MateriasInfoView = Backbone.View.extend({
    initialize: function () {
        console.log('Initializing Materias Info View');

        this.collection = new App.collections.MateriasInfoCollection();

    },
    events: {
    },
    render: function () {
        $(this.el).html(this.template({
            collection: this.collection.toJSON()
        }));

        return this;
    }
});