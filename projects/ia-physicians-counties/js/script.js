// Set height of chart
var chart_height = 400;
var chart;
var chart_options = [];

var json_options = [{
    'div': '#chart',
    'json_data': json_data,
    // The label for these values
    // Will appear under x axis dashes
    'json_label': 'County',
    // The field in the JSON file that has the numbers we want to chart
    'json_value_x': 'Ratio',
    'json_value_y': 'Population',
    'axis_x_max': 12000,
    'axis_x_tick': '1 in ',
    // Text to go before value in tooltip title
    // Can be blank
    'tooltip_title':  'County',
    // Wording that will follow the value in the tooltip
    'tooltip_wording':  'Population',
    'tooltip_wording_two':  'Physicians',
    'tooltip_wording_three':  'Ratio'
},{
    'div': '#chart-two',
    'json_data': json_data_two,
    // The label for these values
    // Will appear under x axis dashes
    'json_label': 'County',
    // The field in the JSON file that has the numbers we want to chart
    'json_value_x': 'Change',
    'json_value_y': '2009Population',
    'axis_x_max': 6000,
    'axis_x_tick': '',
    // Text to go before value in tooltip title
    // Can be blank
    'tooltip_title':  'County',
    // Wording that will follow the value in the tooltip
    'tooltip_wording':  'Population',
    'tooltip_wording_two':  'Physicians',
    'tooltip_wording_three':  'Ratio',
    'tooltip_wording_four':  'Change in ratio'
}];

// Type of chart; i.e. area, bar, etc.
// Types available: http://c3js.org/examples.html
var chart_type = 'scatter';

// Color of lines, bars, etc.
var chart_color = '#006d2c';
var chart_color_eastern_ia = '#a800ba';

// Whether or not to show the numbers
// Above the bars, lines, etc.
var labels_show = false;

// Whether or not to show the legend
var legend_show = false;

// Initiate the chart
function initializeChart(num) {
    chart_options[num] = {
    	bindto: json_options[num]['div'],
        data: {
    		json: json_options[num]['json_data'],
    		keys: {
    				x: json_options[num]['json_value_x'],
                    value: [ json_options[num]['json_value_y'] ]
    		},
          	type: chart_type, 
        	color: function (color, value) {
                var eastern_ia = false;


                _.each(json_options[num]['json_data'], function(val_json, num_json) {
                    if ( val_json[ json_options[num]['json_value_y'] ] === value['value'] ) {
                        var county = val_json[ json_options[num]['json_label'] ];

                        if (county === 'Winneshiek' || county === 'Allamakee' || county === 'Chickasaw' || county === 'Fayette' || county === 'Clayton' || county === 'Bremer' || county === 'Butler' || county === 'Grundy' || county === 'Black Hawk' || county === 'Buchanan' || county === 'Delaware' || county === 'Dubuque' || county === 'Tama' || county === 'Benton' || county === 'Linn' || county === 'Jones' || county === 'Iowa' || county === 'Johnson' || county === 'Cedar' || county === 'Keokuk' || county === 'Washington') {
                            eastern_ia = true;
                        }
                    }
                });

                if (eastern_ia === true) {
                    return chart_color_eastern_ia;
                } else {
                    return chart_color;
                }
            },
            labels: labels_show,
            onmouseover: function (d) {
                $('.chart-explainer').css('z-index', 0);
            },
            onmouseout: function (d) {
                $('.chart-explainer').css('z-index', 10000);
            }
        },
        point: {
            r: 5
        },
        axis: {
            x: {
                max: json_options[num]['axis_x_max'],
                padding: {
                    right: 0.5
                },
                tick: {
                    fit: false,
                    format: function (x) {
                        return json_options[num]['axis_x_tick'] + commaSeparateNumber(x);
                    }
                }
            },
            y: {
                tick: {
                    format: function (y) {
                        return commaSeparateNumber(y);
                    }
                }
            }
        },
        grid: {
            x: {
                show: true,
                lines: [{
                    value: 0,
                    class: 'grid4'
                }]
            },
            y: {
                show: true
            }
        },
        padding: {
            left: 60,
            right: 15
        },
        tooltip: {
            contents: function (value, defaultTitleFormat, defaultValueFormat, color) {
                // County name
                var title;
                // Population
                var value_one = value[0]['value'];
                // Physicians
                var value_two;
                // Ratio / Change
                var value_three = value[0]['x'];

                // For second chart only
                // Physicians: 1999
                var value_four;
                // Population: 1999
                var value_five;
                // Ratio: 1999
                var value_six;

                // Physicians: 1989
                var value_seven;
                // Population: 1989
                var value_eight;
                // Ratio: 1989
                var value_nine;

                // Ratio: 2009
                var value_ten;

                // Loop through JSON data
                _.each(json_options[num]['json_data'], function(val_json, num_json) {
                    if ( val_json[ json_options[num]['json_value_y'] ] === value_one) {
                        // County
                        title = val_json[ json_options[num]['tooltip_title'] ];
                        
                        // Find total physicians in JSON data
                        if (num === 0) {
                            value_two  = val_json['Total'];
                        } else if (num === 1) {
                            // 2009
                            value_two  = val_json['2009Physicians'];
                            value_ten = val_json['2009Ratio'];
                            // 1999
                            value_four  = val_json['1999Physicians'];
                            value_five  = val_json['1999Population'];
                            value_six  = val_json['1999Ratio'];
                            // 1989
                            value_seven  = val_json['1989Physicians'];
                            value_eight  = val_json['1989Population'];
                            value_nine = val_json['1989Ratio'];
                        }
                    }
                });

                var tooltip = '<table class="c3-tooltip"><tbody>';
                
                // Table for first chart
                if (num === 0) {
                    tooltip += '<tr>';
                    tooltip += '<th colspan="2">' + title + ' ' + json_options[num]['tooltip_title'] + '</th>';
                    tooltip += '</tr>';
                    tooltip += '<tr class="c3-tooltip-name-units">';
                    tooltip += '<td class="name">';
                    tooltip += '<strong>' + json_options[num]['tooltip_wording'] + '</strong>';
                    tooltip += '</td><td>';
                    tooltip += commaSeparateNumber(value_one);
                    tooltip += '</td>';
                    tooltip += '</tr><tr>';
                    tooltip += '<td class="name">';
                    tooltip += '<strong>' + json_options[num]['tooltip_wording_two'] + '</strong>';
                    tooltip += '</td><td>';
                    tooltip += commaSeparateNumber(value_two);
                    tooltip += '</td></tr><tr>';
                    tooltip += '<td class="name">';
                    tooltip += '<strong>' + json_options[num]['tooltip_wording_three'] + '</strong>';
                    tooltip += '</td><td>';
                    tooltip += json_options[num]['axis_x_tick'] + commaSeparateNumber(value_three);
                    tooltip += '</td>';
                    tooltip += '</tr>';
                // Table for second chart
                } else if (num === 1) {
                    tooltip += '<tr>';
                    tooltip += '<th colspan="5">' + title + ' ' + json_options[num]['tooltip_title'] + '</th>';
                    tooltip += '</tr>';
                    tooltip += '<tr class="c3-tooltip-name-units c3-tooltip-name-header">';
                    tooltip += '<td class="name"></td>';
                    tooltip += '<td class="name"><strong>1989</strong></td>';
                    tooltip += '<td class="name"><strong>1999</strong></td>';
                    tooltip += '<td class="name"><strong>2009</strong></td>';
                    tooltip += '</tr><tr>';
                    tooltip += '<tr class="c3-tooltip-name-units">';
                    tooltip += '<td class="name">';
                    tooltip += '<strong>' + json_options[num]['tooltip_wording'] + '</strong>';
                    tooltip += '</td><td>';
                    tooltip += commaSeparateNumber(value_eight);
                    tooltip += '</td><td>';
                    tooltip += commaSeparateNumber(value_five);
                    tooltip += '</td><td>';
                    tooltip += commaSeparateNumber(value_one);
                    tooltip += '</td>';
                    tooltip += '</tr><tr>';
                    tooltip += '<td class="name">';
                    tooltip += '<strong>' + json_options[num]['tooltip_wording_two'] + '</strong>';
                    tooltip += '</td><td>';
                    tooltip += commaSeparateNumber(value_seven);
                    tooltip += '</td><td>';
                    tooltip += commaSeparateNumber(value_four);
                    tooltip += '</td><td>';
                    tooltip += commaSeparateNumber(value_two);
                    tooltip += '</td>';
                    tooltip += '</tr><tr>';
                    tooltip += '<td class="name">';
                    tooltip += '<strong>' + json_options[num]['tooltip_wording_three'] + '</strong>';
                    tooltip += '</td><td>';
                    tooltip += json_options[0]['axis_x_tick'] + commaSeparateNumber(value_nine);
                    tooltip += '</td><td>';
                    tooltip += json_options[0]['axis_x_tick'] + commaSeparateNumber(value_six);
                    tooltip += '</td><td>';
                    tooltip += json_options[0]['axis_x_tick'] + commaSeparateNumber(value_ten);
                    tooltip += '</td>';
                    tooltip += '</tr><tr>';
                    tooltip += '<td class="name">';
                    tooltip += '<strong>' + json_options[num]['tooltip_wording_four'] + '</strong>';
                    tooltip += '</td><td colspan="3" class="c3-tooltip-change">';
                    tooltip += '<strong>' + commaSeparateNumber(value_three) + '</strong>';
                    tooltip += '</td>';
                    tooltip += '</tr>';
                }
                tooltip += '</tbody></table>';

                return tooltip;
            }
        },
        zoom: {
            enabled: true
        },
        legend: {
            show: legend_show
        },
        oninit: function () {
        	spinner.stop();
        }
    // Close chart
    }

    chart = c3.generate( chart_options[num] );
// Close initialize chart
}

// Doc ready
$(document).ready(function() {
    _.each(json_options, function(val, num) {
        initializeChart(num);
    });

    // Click event to toggle how the chart looks
    $('.toggle-view-option').click(function() {
        ga('send', 'event', 'Rural health care', 'Scatter plot: Toggle view');

        $(this).addClass('selected');
        $(this).siblings().removeClass('selected');
        
        if ( $(this).attr('id') === 'toggle-view-option-left') {
             $('#chart-one-container').show();
             $('#chart-two-container').hide();
        } else if ( $(this).attr('id') === 'toggle-view-option-right') {
             $('#chart-one-container').hide();
             $('#chart-two-container').show();
        }

    });

    $('.required-ratios-table-open p').click(function() {
        $('#ratios-required-table-container').fadeIn();
    });

    $('#ratios-required-table-container .fa-times-circle').click(function() {
        $('#ratios-required-table-container').fadeOut();
    });

    $("body").mouseleave(function(){
        ga('send', 'event', 'Rural health cares', 'Scatter plot touched');
    });
});