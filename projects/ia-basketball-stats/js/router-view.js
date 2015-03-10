var initial_load = false;

// Grab hash to display the right chart
var hash_two;
// The field in the JSON file that has the numbers we want to chart
// Example: offense
var hash_three;

// Hash value of what isn't shown
// Used so we can hide, show charts
var hash_prev = 'defense';

var AppRouter = Backbone.Router.extend({
    routes: {
        "*chart": "loadChart"
    },

    loadChart: function(hash) {
        if (hash_three !== undefined) {
            hash_prev = hash_three;
        }
        // Capture hash
        // So we can get the right JSON data
        hash_two = hash.split('/')[1];
        hash_three = hash.split('/')[2];

    	if (initial_load === false) {
    		initializeTabletopObject();
    		initial_load = true;
    	} else {
            chart.hide(hash_prev);
            chart.show(hash_three);
    	}
    }
});

var approuter = new AppRouter();