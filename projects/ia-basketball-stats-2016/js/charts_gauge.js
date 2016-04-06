var charts = [];

// Ran for our gauge charts
function initChartGauge() {
	// Place all four charts on the map
	_.each(global_tabletop_data, function(value, index) {
		var school = value['school'];
		var school_color = options_schools[school]['chart_color'];
		var school_rank = value[hash_three + 'rank'];

		// Determine how wide the chart will be based on window size
		if ( $(window).width() < 551 ) {
			var chart_width = $(window).width() / 2;
		} else if ( $(window).width() < 351 ) {
			var chart_width = $(window).width();
		} else {
			var chart_width = $(window).width() / 4;
		}
		
		charts[index] = c3.generate({
		    size: {
		    	width: chart_width
		    },
		    bindto: '#chart-'+ index,
		    data: {
		       	columns: [
		           	['data', value[hash_three] ]
		       	],
		       	type: 'gauge',
		    },
		    gauge: {
  				units: 'Rank: ' + school_rank
			},
		    tooltip: {
	           	contents: function (value, defaultTitleFormat, defaultValueFormat, color) {
	               	ga('send', 'event', 'IA basketball stats', 'Rollover gauge chart');

	               	// Located in chart_universal
	               	value[0].index = index;
	               	return tooltipCreate(value, defaultTitleFormat, defaultValueFormat, color);
	           	}
	        },
		    color: {
		       	pattern: [school_color]
		       },
		       oninit: function () {
		       	spinner.stop();
		       }
		});

		$('#chart-' + index + '-label').html(school)
	// Close each statement
	});

	windowResize();
// Close chart function
}

// Called every time a user clicks on an offense or defense toggle
function toggleChartGauge() {
	_.each(charts, function(value, index) {
		// Offense or defense value, depending on what is selected
		var value_current = global_tabletop_data[index][hash_three];
		var rank = global_tabletop_data[index][hash_three + 'rank'];
		value.load({
        	columns: [['data', global_tabletop_data[index][hash_three] ]]
    	});

    	// Add ranking under percent
    	$('#chart-' + index + ' .c3-chart-arcs .c3-chart-arcs-gauge-unit').html('Rank: ' + rank);
    });
}