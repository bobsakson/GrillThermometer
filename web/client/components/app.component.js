(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'app',
      templateUrl: './client/views/app.html'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));