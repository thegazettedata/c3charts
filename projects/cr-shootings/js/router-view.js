var initial_load = false;

var AppRouter = Backbone.Router.extend({
    routes: {
        "*chart": "loadChart"
    },

    loadChart: function() {
    	if (initial_load === false) {
    		initializeTabletopObject();
    		initial_load = true;
    	} else {
    		loadTabletopData(tabletop_data_global);
    	}
    }
});

var approuter = new AppRouter();