//blah
// Set height of chart
var chart_height = 320;

// The label for these values
// Will appear under x axis dashes
var json_label = 'Year';
// The field in the JSON file that has the numbers we want to chart
var json_value = '4WD Farm Tractors';
var json_value2 = 'Self-Prop Combines';

// Type of chart; i.e. area, bar, etc.
// Types available: http://c3js.org/examples.html
var chart_type = 'bar';

// Color of lines, bars, etc.
var chart_color = '#99d8c9';
var chart_color2 = '#feb24c';

// Whether or not to show the numbers
// Above the bars, lines, etc.
var labels_show = false;

// Text to go before value in tooltip title
// Can be blank
var tooltip_title = 'Year: ';
// Wording that will follow the value in the tooltip
var tooltip_wording  = '';

// Whether or not to show the legend
var legend_show = true;

// Initiate the chart
var chart = c3.generate({
	bindto: '#chart',
    data: {
		json: json_data,
		keys: {
				x: json_label,
                value: [json_value, json_value2]
		},
      	type: chart_type, 
    	color: function (color, value) {
            // console.log(value["id"]);
            if (value["id"] == "4WD Farm Tractors") {
                return chart_color2;
            } 
            else{
                return chart_color;
            };
        },
        labels: labels_show
    },
    axis: {
        x: {
            padding: { right: 0.5 }
        },
        y : {
            label: {
                text: 'Units Sold',
                position: 'outer-middle',
            },
            type : 'indexed',
            tick: {
                format: function (x) {
                    return commaSeparateNumber(x);
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

            var salValue1 = value[1]['value'];
            var salValue2 = value[0]['value'];
            
            var tooltip = '<table class="c3-tooltip">';
            tooltip += '<tbody><tr>';
            tooltip += '<th colspan="2">' + title + '</th>';
            tooltip += '</tr>';

            tooltip += '<tr class="c3-tooltip-name-units">';
            tooltip += '<td class="name">';
            tooltip += '<span style="background-color:' + chart_color2 + '"></span>';
            tooltip += commaSeparateNumber(salValue2) + ' ' + '4WD Farm Tractors';
            tooltip += '</td>';          
            tooltip += '</tr>'

            tooltip += '<tr class="c3-tooltip-name-units">';
            tooltip += '<td class="name">';
            tooltip += '<span style="background-color:' + chart_color + '"></span>';
            tooltip += commaSeparateNumber(salValue1) + ' ' + 'Self-Prop Combines';
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
        ga('send', 'event', 'Ag equipment', 'Chart touched');
    });
});