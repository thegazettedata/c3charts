// Initiate the chart
function initChart() {
    $('#chart-0').parent().removeClass('chart-container');
    $('.charts-labels').hide();

    chart = c3.generate({
    	bindto: '#chart-0',
        data: {
    		json: global_tabletop_data,
    		keys: {
                x: options_default['json_label'],
                value: [hash_three, hash_prev]
            },
            type: options_charts[hash_two]['chart_type'], 
            color: function (color, value) {
                var school = '';

                // Find out school name to set the color correctly
                if ( value.index !== undefined ) {

                    school = global_tabletop_data[ value.index ]['school'];
                    return options_schools[school]['chart_color'];
                }
            },
            // Labels above the bars
            labels: {
                format: function (value, id, index, subindex) {
                    if ( global_tabletop_data[index] !== undefined ) {
                        var school = global_tabletop_data[index]['school'];
                        var tick_format = '';

                        if (school !== undefined && school !== 'Nation') {
                            tick_format += 'Rank: ';
                            tick_format += global_tabletop_data[index][hash_three + 'rank'];
                        }

                         return tick_format;
                    }
                }
            }
        },
        axis: {
            x: {
                type: 'category',
                // School name under bars
                tick: {
                    // width: 85,
                    format: function (x) {
                        var tick_format = global_tabletop_data[x]['school'];
                        // if (global_tabletop_data[x]['school'] !== 'National average') {
                        //     tick_format += ' (Rank: ';
                        //     tick_format += global_tabletop_data[x][hash_three + 'rank'];
                        //     tick_format += ')';
                        // }

                        return tick_format;
                    }
                },
                padding: {
                    right: 0
                }
            },
            y: {
                max: options_charts[hash_two]['y_max_value'],
                min: 0,
                padding: {
                    top: 0,
                    bottom: 0
                }
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
                ga('send', 'event', 'IA basketball stats', 'Rollover bar chart');

                // Located in chart_universal
                return tooltipCreate(value, defaultTitleFormat, defaultValueFormat, color);
            }
        },
        legend: {
            show: options_default['legend_show']
        },
        oninit: function () {
        	spinner.stop();
        }
    // Close chart
    });
    chart.hide(hash_prev);

    windowResize();
// Close chart function
};