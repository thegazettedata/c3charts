var initial_load = false;

// Routes = Hash in URL that allows us to load the correct chart
var AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadChart"
    },

    loadChart: function() {
    	if (initial_load === false) {
    		initChart();
    		initial_load = true;
    	} else {
    		initChart();
    	}
    }
});

var approuter = new AppRouter();