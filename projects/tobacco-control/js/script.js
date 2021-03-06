// Set height of chart
var chart_height = 320;

// The label for these values
// Will appear under x axis dashes
var json_label = 'year';
// The field in the JSON file that has the numbers we want to chart
var json_value = 'milliondollars';

// Type of chart; i.e. area, bar, etc.
// Types available: http://c3js.org/examples.html
var chart_type = 'bar';

// Color of lines, bars, etc.
var chart_color = '#99d8c9';

// Whether or not to show the numbers
// Above the bars, lines, etc.
var labels_show = false;

// Text to go before value in tooltip title
// Can be blank
var tooltip_title = 'Year: ';
// Wording that will follow the value in the tooltip
var tooltip_wording  = 'million';

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
        },
        y : {
            label: {
                text: 'In Millions',
                position: 'outer-middle',
            },
            type : 'indexed',
            tick: {
                format: function (x) {
                    return '$' + commaSeparateNumber(x);
                }
            },
            zerobased: true,
            min: 0
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
        contents: function (value, defaultTitleFormat, defaultValueFormat, color) {
            // Capture title
            // var format = d3.format('$');
            // var title = format(value[0].x);
            var title = value[0].x;

            var value = value[0]['value'];
            var tooltip = '<table class="c3-tooltip">';
            tooltip += '<tbody><tr>';
            tooltip += '<th colspan="2">' + title + '</th>';
            tooltip += '</tr>';
            tooltip += '<tr class="c3-tooltip-name-units">';
            tooltip += '<td class="name">';
            tooltip += '<span style="background-color:' + chart_color + '"></span>';
            tooltip += '$' + value + ' ' + tooltip_wording;
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
    windowResize();

    $("body").mouseleave(function(){
        ga('send', 'event', 'Tobacco control money', 'Chart touched');
    });
});