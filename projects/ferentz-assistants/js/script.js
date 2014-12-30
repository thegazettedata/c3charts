  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-30416-68', 'auto');
  ga('require', 'displayfeatures');
  // ga('send', 'pageview');

// Set height of chart
var chart_height = 620;

// The label for these values
// Will appear under x axis dashes
var json_label = 'Season';
// The field in the JSON file that has the numbers we want to chart
var json_value1 = 'Norm Parker';
var json_value2 = 'Phil Parker';
var json_value3 = 'Ken O\'Keefe';
var json_value4 = 'Lester Erb (hired to replace Chuck Long)';
var json_value5 = 'Reese Morgan (hired to replace Pat Flaherty)';
var json_value6 = 'Darrell Wilson (hired to replace Bret Bielema)';
var json_value7 = 'Eric Johnson (promoted from GA to replace Joe Philbin)';
var json_value8 = 'Rick Kaczenski (promoted from GA to replace Ron Aiken)';
var json_value9 = 'Erik Campbell (hired to replace Carl Jackson)';
var json_value10 = 'Carl Jackson';
var json_value11 = 'Ron Aiken';
var json_value12 = 'Joseph Philbin';
var json_value13 = 'Bret Bielema';
var json_value14 = 'Pat Flaherty';
var json_value15 = 'Chuck Long';
var json_value16 = 'Gregory Davis';
var json_value17 = 'Brian Ferentz';
var json_value18 = 'LeVar Woods';
var json_value19 = 'Robert Kennedy';
var json_value20 = 'James Reid';
var json_value21 = 'Christopher White';


// Type of chart; i.e. area, bar, etc.
// Types available: http://c3js.org/examples.html
var chart_type = 'line';

// Color of lines, bars, etc.
var chart_color = '#a0c6e8';

// Whether or not to show the numbers
// Above the bars, lines, etc.
var labels_show = false;


// Wording that will follow the value in the tooltip
var tooltip_wording  = 'salary';

// Whether or not to show the legend
var legend_show = true;

// Resizes chart
function iFrameChartResize() {
    // Autmatically sets the size of the chart
    // To the size of the iFrame
    if ( window.self !== window.top ) {
        // Set size of iFrame if on mobile
        chart.resize({
            height: $(window.self).height() - 5
        });
    }
};



// Initiate the chart
var chart = c3.generate({
	bindto: '#chart',
    data: {
		json: json_data,
		keys: {
				x: json_label,
                value: 
                [json_value1, json_value2, json_value3, json_value4, json_value5, json_value6, json_value7, json_value8, json_value9, json_value10, json_value11, json_value12, json_value13, json_value14, json_value15, json_value16, json_value17, json_value18, json_value19, json_value20, json_value21] 
		},
      	hide: [json_value1, json_value3, json_value4, json_value5, json_value6, json_value7, json_value8, json_value9, json_value10, json_value11, json_value12, json_value13, json_value14, json_value15, json_value16, json_value17, json_value18, json_value19, json_value20, json_value21],
        type: chart_type, 
    	color: function (color, value) {
            return chart_color;
        },
        
        // groups: [[json_value1, json_value2, json_value3, json_value4, json_value5, json_value6, json_value7, json_value8, json_value9, json_value10, json_value11, json_value12, json_value13, json_value14, json_value15, json_value16, json_value17, json_value18, json_value19, json_value20, json_value21]],  // Never mind. This was for when I was going to show them as stacked area graph.
        labels: labels_show
    },
    axis: {
        x: {
            padding: { right: 0.5, left: 0.5 }

        },
        y : {
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

            var value = commaSeparateNumber(value[0]['value']);
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
        // hide: [json_value1, json_value3, json_value4, json_value5, json_value6, json_value7, json_value8, json_value9, json_value10, json_value11, json_value12, json_value13, json_value14, json_value15, json_value16, json_value17, json_value18, json_value19, json_value20, json_value21]
    },
    oninit: function () {
    	spinner.stop();
    }
// Close chart
});

// Doc ready
$(document).ready(function() {
    iFrameChartResize()
});

$(window).resize(function() {
    iFrameChartResize()
});


    
$("body").mouseleave(function(){
    ga('send', 'event', 'Ferentz assts salaries', 'line chart touched'); 

});
