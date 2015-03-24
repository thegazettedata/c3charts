// Set height of chart
var chart_height = 320;

// The label for these values
// Will appear under x axis dashes
var json_label = 'week';
// The field in the JSON file that has the numbers we want to chart
var json_value = 'flu-assoc-hospitalize';

// Type of chart; i.e. area, bar, etc.
// Types available: http://c3js.org/examples.html
var chart_type = 'area';

// Color of lines, bars, etc.
var chart_color = '#8B3A3A';

// Whether or not to show the numbers
// Above the bars, lines, etc.
var labels_show = true;

// Text to go before value in tooltip title
// Can be blank
var tooltip_title = 'Week ';
// Wording that will follow the value in the tooltip
var tooltip_wording  = 'flu-associated<br>hospitalizations';

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
    area: {
        zerobased: true
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
        contents: function (value, defaultTitleFormat, defaultValueFormat, color) {
            // Capture title
            // var format = d3.format('$');
            // var title = format(value[0].x);
            var title = value[0].x;

            var value = value[0]['value'];
            var tooltip = '<table class="c3-tooltip">';

            if (value == 1) {
                tooltip_wording = 'flu-associated<br>hospitalization';
            }
            else tooltip_wording = 'flu-associated<br>hospitalizations';

            tooltip += '<tbody><tr>';
            tooltip += '<th colspan="2">' + tooltip_title + ' ' + title + '</th>';
            tooltip += '</tr>';
            tooltip += '<tr class="c3-tooltip-name-units">';
            tooltip += '<td class="name">';
            tooltip += '<span style="background-color:' + chart_color + '"></span>';
            tooltip += value + ' ' + tooltip_wording;
            tooltip += '</td>';
            tooltip += '</tr></tbody></table>';

            return tooltip;
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

// Doc ready
$(document).ready(function() {
    windowResize()
});