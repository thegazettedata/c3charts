// Set height of chart
var chart_height = 320;

// The label for these values
// Will appear under x axis dashes
var json_label = 'year';
// The field in the JSON file that has the numbers we want to chart
var json_value = '65-74';
var json_value2 = '75-84';
var json_value3 = '85+';
var json_value4 = 'TOTAL';

// Type of chart; i.e. area, bar, etc.
// Types available: http://c3js.org/examples.html
var chart_type = 'area';

// Color of lines, bars, etc.
var chart_color = '#7fc97f';
var chart_color2 = '#beaed4';
var chart_color3 = '#fdc086';
var chart_color4 = '#ffff99';

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
                value: [json_value, json_value2, json_value3, json_value4]
		},
      	type: chart_type, 
        groups: [[chart_type,chart_type]],
    	color: function (color, value) {
            // console.log(value["id"]);
            if (value["id"] == "65-74") {
                return chart_color;
            } 
            else if (value["id"] == "75-84") {
                return chart_color2;
            }
            else if (value["id"] == "85+") {
                return chart_color3;
            }
            else{
                return chart_color4;
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
                text: '',
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

            var salValue1 = value[0]['value'];
            var salValue2 = value[1]['value'];
            var salValue3 = value[2]['value'];
            var salValue4 = value[3]['value'];
            
            var tooltip = '<table class="c3-tooltip">';
            tooltip += '<tbody><tr>';
            tooltip += '<th colspan="2">' + title + '</th>';
            tooltip += '</tr>';


            tooltip += '<tr class="c3-tooltip-name-units">';
            tooltip += '<td class="name">';
            tooltip += '<span style="background-color:' + chart_color4 + '"></span>';
            tooltip += commaSeparateNumber(salValue4) + ' ' + 'TOTAL';
            tooltip += '</td>';
            tooltip += '</tr>'

            tooltip += '<tr class="c3-tooltip-name-units">';
            tooltip += '<td class="name">';
            tooltip += '<span style="background-color:' + chart_color3 + '"></span>';
            tooltip += commaSeparateNumber(salValue3) + ' ' + 'ages 85+';
            tooltip += '</td>';
            tooltip += '</tr>'

            tooltip += '<tr class="c3-tooltip-name-units">';
            tooltip += '<td class="name">';
            tooltip += '<span style="background-color:' + chart_color2 + '"></span>';
            tooltip += commaSeparateNumber(salValue2) + ' ' + 'ages 74-84';
            tooltip += '</td>';
            tooltip += '</tr>'


            tooltip += '<tr class="c3-tooltip-name-units">';
            tooltip += '<td class="name">';
            tooltip += '<span style="background-color:' + chart_color + '"></span>';
            tooltip += commaSeparateNumber(salValue1) + ' ' + 'ages 65-74';
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
        ga('send', 'event', 'Alzheimers chart', 'Chart touched');
    });
});