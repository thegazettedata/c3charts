// All the options for the chart
var options = {
    // The label for these values
    // Will appear under x axis dashes
    json_label: 'year',
    // The field in the JSON file that has the numbers we want to chart
    json_value: 'units',
    // Type of chart; i.e. area, bar, etc.
    // Types available: http://c3js.org/examples.html
    chart_type: 'line',
    // Color of lines, bars, etc.
    chart_color: '#a0c6e8',
    // Whether or not to show the numbers
    // Above the bars, lines, etc.
    labels_show: false,
    // Whether or not to show the legend
    legend_show: false,
    // Text to go before value in tooltip title
    // Can be blank
    tooltip_title: 'Year: ',
    // Wording that will follow the value in the tooltip
    tooltip_wording:  'items acquired'
}

// Initiate the chart
function initChart() {
    var chart = c3.generate({
    	bindto: '#chart',
        data: {
    		json: json_data,
    		keys: {
    				x: options['json_label'],
                    value: [options['json_value']]
    		},
          	type: options['chart_type'], 
        	color: function (color, value) {
                return options['chart_color'];
            },
            labels: options['labels_show']
        },
        axis: {
            x: {
                type: 'category',
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
                tooltip += '<span style="background-color:' + options['chart_color'] + '"></span>';
                tooltip += value + ' ' + options['tooltip_wording'];
                tooltip += '</td>';
                tooltip += '</tr></tbody></table>';

                return tooltip;
            }
        },
        legend: {
            show: options['legend_show']
        },
        oninit: function () {
        	spinner.stop();
        }
    // Close chart
    });
};

// Doc ready
$(document).ready(function() {
    // Fire up Backbone
    Backbone.history.start();

    windowResize();
});