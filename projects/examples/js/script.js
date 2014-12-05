// The label for these values
// Will appear under x axis dashes
var json_label = 'year';
// The field in the JSON file that has the numbers we want to chart
var json_value = 'units';

// Type of chart; i.e. area, bar, etc.
// Types available: http://c3js.org/examples.html
var chart_type = 'line';
// Color of lines, bars, etc.
var chart_color = '#a0c6e8';

// Whether or not to show the numbers
// Above the bars, lines, etc.
var labels_show = false;

// Text to go before value in tooltip title
// Can be blank
var tooltip_title = 'Year: ';

// Whether or not to show the legend
var legend_show = false;

// Initiate the chart
var chart = c3.generate({
	bindto: '#chart',
    data: {
		json: json_data,
		keys: {
				x: json_label,
                value: [json_value]
		},
      	type: chart_type, 
    	color: function (color, value) {
            return chart_color;
        },
        labels: labels_show
    },
    axis: {
        x: {
            padding: { right: 0.5 }
        }
    },
    grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
    tooltip: {
        format: {
            title: function (value) {
                return tooltip_title + value;
            },
            value: function (value, ratio, id) {
                // var format = d3.format('$');
                // return format(value);
                return value
            }
        }
    },
    legend: {
        show: legend_show
    },
    oninit: function () {
    	spinner.stop();
    }
// Close chart
});

d3.svg.axis().tickSize(1); 