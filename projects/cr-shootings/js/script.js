// TABLETOP
// Google Docs spreadsheet key
var spreadsheet_key = '1a-g9ce9PMriDFCl3qfeJu-8lVT4vfwtEkB5SeQfuM78';

// Options for our charts
// 1. Google spreadsheet: Sheet name
// 2. Div on page
// 3. Type of chart
// 4. Label (first column)
// 5. Value(s) (second columns +)
// 6. Color(s)
// 7. Axis rotation (horizontal)
// 9. Tooltip: Group all the years into the same tooltip
// 8. Tooltip wording
var chart_options = [
    {
        'google_ss_sheet': 'Sheet2',
        'div': 'chart-homicides',
        'chart_type': 'area',
        'label': 'year',
        'values': ['homicides'],
        'colors': ['#e31a1c'],
        'rotated': false,
        'tooltip_grouped': true,
        'tooltip_wording': 'victims',
        'padding_right': 0.5,
        'legend_show': false
    },{
        'google_ss_sheet': 'Sheet3',
        'div': 'chart-shotsfired',
        'chart_type': 'bar',
        'label': 'year',
        'values': ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
        'colors': ['#CCC','#CCC', '#CCC', '#CCC', '#CCC', '#e31a1c', '#e31a1c', '#e31a1c', '#e31a1c', '#CCC', '#CCC', '#CCC'],
        'rotated': false,
        'tooltip_grouped': false,
        'tooltip_wording': 'shots fired incidents',
        'padding_right': 0.5,
        'legend_show': false
    },{
        'google_ss_sheet': 'Sheet4',
        'div': 'chart-violentcrimes',
        'chart_type': 'line',
        'label': 'type',
        'values': ['aggravatedassaults', 'sexualassault', 'robbery', 'assaultonofficer', 'murder'],
        'colors': ['#1F78B4', '#BD6150', '#1FB4A0', '#e31a1c', '#2D414E'],
        'rotated': false,
        'tooltip_grouped': false,
        'tooltip_wording': 'incidents',
        'padding_right': 0.02,
        'legend_show': true
    }
];

// Where we'll put data we load from Tabletop
// Don't need to edit
var tabletop_data_global;
var tabletop_data_current;
var tabletop_data_export = {};
var hash;

// CHART OPTIONS
// Set height of chart
var chart_height = 320;

// Whether or not to show the numbers
// Above the bars, lines, etc.
var labels_show = false;

var chart;

// Initiate the chart
function initChart(chart_options_current) {
    // console.log(chart_options_current);

    chart = c3.generate({
    	bindto: '#' + chart_options_current['div'],
        data: {
    		json: tabletop_data_current,
    		keys: {
    				x: chart_options_current['label'],
                    value: chart_options_current['values']
    		},
          	type: chart_options_current['chart_type'],
            labels: labels_show,
            order: null,
            names: {
                assaultonofficer: 'Assault on officer',
                murder: 'Murder',
                robbery: 'Robbery',
                aggravatedassaults: 'Aggravated assaults',
                sexualassault: 'Sexual assault'
            }
        },
        color: {
            pattern: chart_options_current['colors']
        },
        axis: {
            rotated: chart_options_current['rotated'],
            x: {
                padding: {
                    right: chart_options_current['padding_right']
                }
            }
        },
        point: {
            r: 3
        },
        bar: {
            width: {
                ratio: 1
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
            grouped: chart_options_current['tooltip_grouped'],
            contents: function (value, defaultTitleFormat, defaultValueFormat, color) {
                // i.e. january, february, etc
                var value_name = value[0]['name'];
                var num_color;

                // Match up values in tooltip value and values array
                // So we can grab the right color 
                _.each(chart_options_current['values'], function(value, num_value) {
                    if (value_name === value) {
                        num_color = num_value;
                    }
                }, this);

                // Capture title
                // var format = d3.format('$');
                // var title = format(value[0].x);
                var title = value[0].x;

                var value = value[0]['value'];
                var tooltip = '<table class="c3-tooltip">';
                tooltip += '<tbody><tr>';
                if (hash === 'chart-shotsfired') {
                    tooltip += '<th colspan="2">' + capitaliseFirstLetter(value_name) + ' ' + title + '</th>';
                } else {
                    tooltip += '<th colspan="2">' + title + '</th>';
                }
                tooltip += '</tr>';
                tooltip += '<tr class="c3-tooltip-name-units">';
                tooltip += '<td class="name">';
                tooltip += '<span style="background-color:' + chart_options_current['colors'][num_color] + '"></span>';
                tooltip += value + ' ' + chart_options_current['tooltip_wording'];
                tooltip += '</td>';
                tooltip += '</tr></tbody></table>';

                return tooltip;
            }
        },
        legend: {
            show: chart_options_current['legend_show'],
            position: 'top',
            inset: {
                anchor: 'bottom-right',
                x: 20,
                y: 10,
                step: 5
            }

        },
        oninit: function () {
        	spinner.stop();
        }
    // Close chart
    });
    
    $('#' + chart_options_current['div']).siblings().hide();

    if (chart_options_current['div'] === 'chart-shotsfired') {
        $('#toggle-view').show();
    }

    windowResize();
// Close chart function
};

// Remove "rowNumber" object
function jsonReplacer(key, value) {
    if (key === "rowNumber") {
        return undefined;
    } else {
        return value;
    }
}

// Use Handlebars to load data from Tabletop to page
function loadTabletopData(tabletop_data) {
    tabletop_data_global = tabletop_data;

    // _.each(tabletop_data, function(element_data, num_data) {
    //     console.log(element_data);
    //     var name = element_data['name'];
    //     console.log(name);
    //     tabletop_data_export[name] = {'name': name}, {'column_names': ''}, {'elements': ''};

    //     tabletop_data_export[name]['column_names'] = element_data['column_names'];
    //     tabletop_data_export[name]['elements'] = element_data['elements'];
    // }, this);
    // console.save(tabletop_data_export);

    // Loop through sheets in Google Spreadhsheet
    var num_sheet_current = 0;
    _.each(chart_options, function(sheet, num_sheet) {
        // Push JSON of Tabletopdata to global var
        hash = Backbone.history.fragment
        if (sheet['div'] === hash) {
            num_sheet_current = num_sheet;
            tabletop_data_current = tabletop_data[sheet['google_ss_sheet']]['elements'], jsonReplacer;

            // And load the chart
            initChart(chart_options[num_sheet_current]);
        }
    }, this);
}

// Pull data from Google spreadsheet via Tabletop
function initializeTabletopObject(){
    loadTabletopData(tabletop_data);

    // Tabletop.init({
    //     key: spreadsheet_key,
    //     callback: loadTabletopData,
    //     simpleSheet: false,
    //     debug: false
    // });
}

// Doc ready
$(document).ready(function() {
    // Fire up Backbone
    Backbone.history.start();

    // Click event to toggle how the chart looks
    $('.toggle-view-option').click(function() {
        $(this).addClass('selected');
        $(this).siblings().removeClass('selected');

        if ( $(this).attr('id') === 'toggle-view-option-left') {
             chart.ungroup();
        } else if ( $(this).attr('id') === 'toggle-view-option-right') {
             chart.groups([chart_options[1]['values']]);
        }
    });
});