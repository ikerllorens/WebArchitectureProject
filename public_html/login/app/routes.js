/* global Backbone, App */

var Router = Backbone.Router.extend({
    routes: {
        "": "login"
    },
    initialize: function () {
        /* Header */
        this.headerView = new App.views.HeaderView();
        $("#header").html(this.headerView.render().el);
        /* Footer */
        this.footerView = new App.views.FooterView();
        $("#footer").html(this.footerView.render().el);

    },
    
    login: function () {
        this.loginView = new App.views.LoginView();
        this.loginView.render();
        $("#content").html(this.loginView.el);
    }
   
});

App.start(Router, ["HeaderView", "FooterView","LoginView"]);