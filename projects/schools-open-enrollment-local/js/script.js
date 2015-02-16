// Set height of chart
var chart_height = 250;

// The label for these values
// Will appear under x axis dashes
var json_label = 'year';
// The field in the JSON file that has the numbers we want to chart
var json_value = 'units';

// Type of chart; i.e. area, bar, etc.
// Types available: http://c3js.org/examples.html
var chart_type = 'bar';

// Color of lines, bars, etc.
var chart_color = '#a0c6e8';

// Whether or not to show the numbers
// Above the bars, lines, etc.
var labels_show = false;

// Text to go before value in tooltip title
// Can be blank
var tooltip_title = 'Year: ';
// Wording that will follow the value in the tooltip
var tooltip_wording2 = 'net student losses';

// Whether or not to show the legend
var legend_show = false;


var localDistricts = ['Solon', 'Marion Ind.', 'Clear Creek Amana', 'College Community', 'Linn-Mar', 'Iowa City', 'Cedar Rapids'];
var studentPop = [1215,1595,1699,4480,6409,12734,15732];

// Initiate the chart
var chart = c3.generate({
	bindto: '#chart',
    data: {
		// json: json_data,
		// keys: {
		// 		x: json_label,
  //               value: [json_value]
		// },
        columns: [
            ['data1', 128.3, 438.9, 161.9, 247, -37.8, -269.4, -692.9]
        ],
      	type: chart_type, 
    	color: function (color, value) {
            console.log(value['value']);
            if (value['value'] > 0) {
                chart_color = '#a0c6e8';
            }
            else {
                chart_color = '#C67171';
            } 
            return chart_color;
        },
        labels: labels_show
    },
    axis: {
        x: {
            type: 'category',
            categories: localDistricts
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
            
            
            if (value < 0) {
                tooltip_wording = tooltip_wording2;
                chart_color = '#C67171';
            }
            else {
                tooltip_wording  = 'net student gains';
                chart_color = '#a0c6e8;'
            };

            var tooltip = '<table class="c3-tooltip">';
            tooltip += '<tbody><tr>';
            tooltip += '<th colspan="2">Open enrollment<br>gains/losses, 2012-13</th>';
            tooltip += '</tr>';
            tooltip += '<tr class="c3-tooltip-name-units">';
            tooltip += '<td class="name">';
            tooltip += '<span style="background-color:' + chart_color + '"></span>';
            tooltip += value + ' ' + tooltip_wording;
            tooltip += '</td>';
            tooltip += '</tr></tbody></table>';

            ga('send', 'event', 'Open enrollment-local', 'tooltip used');

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

setTimeout(function () {
    chart.groups([['data1', 'data2', 'data3']])
}, 0);

// Doc ready
$(document).ready(function() {
    windowResize();

    $("body").mouseleave(function(){
        ga('send', 'event', 'Open enrollment-local', 'Chart touched');
    });
});