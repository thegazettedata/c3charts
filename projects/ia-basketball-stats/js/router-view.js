var initial_load = false;

// Grab hash to display the right chart
var hash_two;
// The field in the JSON file that has the numbers we want to chart
// Example: offense
var hash_three;

// Hash value of what isn't shown
// Used so we can hide, show charts with toggles
var hash_prev = 'defense';

var AppRouter = Backbone.Router.extend({
    routes: {
        "*chart": "loadChart"
    },

    loadChart: function(hash) {
        // Set hash for default chart (offense)
        // Used so we can hide the right chart by default
        if (hash_three !== undefined) {
            hash_prev = hash_three;
        }
        // Capture hash
        // So we can get the right JSON data
        hash_two = hash.split('/')[1];
        hash_three = hash.split('/')[2];

        // Set hash if we don't have both offense and defense values
        if (hash_three === undefined) {
            hash_three = 'value';
            $('#toggle-view').hide()
        }

    	// Load the data from our Google spreadsheet
        // If not already loaded
        if (initial_load === false) {
    		initializeTabletopObject();
    		initial_load = true;
    	// Otherwise, a user is clicking on one of the toggles
        // And we'll show hide, show the right charts
        } else {
            // Hide, show the right data if we're using a bar chart
            if (bar_chart === true) {
                chart.hide(hash_prev);
                chart.show(hash_three);
            } else {
                toggleChartGauge();
            }
    	}
    }
});

var approuter = new AppRouter();