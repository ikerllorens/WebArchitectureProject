/* global _, Backbone */

// Se va a utilizar el Revealing Module Pattern en toda la aplicacion. 
// http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
var App = (function () {

    var api = {
        events: _.extend({}, Backbone.Events),
        views: {},
        models: {},
        collections: {},
        router: {},
        start: function (Router, views) {
            loadTemplates(views,
                    function () {
                        api.router = new Router();
                        Backbone.history.start();
                    });
        }
    };
    /* 
     * Carga las templates de acuerdo a las promesas establecidas mediante las Views.
     * Es parte del metodo api.start() 
     */
    loadTemplates = function (views, callback) {

        var deferreds = [];

        $.each(views, function (index, view) {
            if (api.views[view]) {
                deferreds.push($.get('app/templates/' + view + '.html', function (data) {
                    api.views[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    };

    return api;
})();