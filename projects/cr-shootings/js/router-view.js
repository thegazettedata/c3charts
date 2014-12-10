var initial_load = false;

var AppRouter = Backbone.Router.extend({
    routes: {
        "*chart": "loadChart"
    },

    loadChart: function() {
    	if (initial_load === false) {
    		console.log('initial load');
    		initializeTabletopObject();
    		initial_load = true;
    	} else {
    		console.log('not initial load');
    		loadTabletopData(tabletop_data_global);
    	}
    }
});

var approuter = new AppRouter();