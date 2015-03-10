// TABLETOP
// Google Docs spreadsheet key
var spreadsheet_key = '1CXSNt2f_oEcNUePR7ZwwCN6_R0AYbMVNC3Ue85_FFs8';

// Where we'll put data we load from Tabletop
// Don't need to edit
var global_tabletop_data;
var tabletop_data_export;

// Global chart
// Don't need to edit
var chart;

// Default ptions for each chart
// Used with C3 chart build
var options_default = {
    // Type of chart; i.e. area, bar, etc.
    // Types available: http://c3js.org/examples.html
    chart_type: 'bar',
    // The label for these values
    // Will appear under x axis dashes
    json_label: 'school',
    // Text to go before value in tooltip title
    // Can be blank
    tooltip_title: '',
    // Wording that will follow the value in the tooltip
    tooltip_wording: 'points per possession',
    // Wording that will follow the value in the tooltip
    tooltip_wording_two: 'National rank',
    // Whether or not to show the numbers
    // Above the bars, lines, etc.
    labels_show: true,
    // Whether or not to show the legend
    legend_show: false
}

// Options for individual schools
// Used with C3 chart build
var options_schools = {
    'UNI': {
        chart_color: '#442561'
    },
    'Iowa': {
        chart_color: '#F3A41D'
    },
    'Iowa State': {
        chart_color: '#90191C'
    },
    'National average': {
        chart_color: '#a0c6e8'
    }
}

// Options for different chart types
// Used with C3 chart build
var options_charts = {
    'adjustedefficiency': {
        y_max_value: 1.4
    },
    'adjustedtempo': {
        y_max_value: 75
    }
}

// Initiate the chart
function initChart() {
    chart = c3.generate({
    	bindto: '#chart',
        data: {
    		json: global_tabletop_data,
    		keys: {
                x: options_default['json_label'],
                value: [hash_three, hash_prev]
            },
            type: options_default['chart_type'], 
            color: function (color, value) {
                var school = '';

                // Find out school name to set the color correctly
                if ( value.index !== undefined ) {
                    school = global_tabletop_data[ value.index ]['school'];
                    return options_schools[school]['chart_color'];
                }
            },
            labels: options_default['labels_show']
        },
        axis: {
            x: {
                type: 'category',
                padding: {
                    right: 0
                }
            },
            y: {
                min: 0,
                max: options_charts[hash_two]['y_max_value'],
                padding: {
                    top: 0, bottom: 0
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
                // Capture title
                // var format = d3.format('$');
                // var title = format(value[0].x);
                var school = global_tabletop_data[ value[0].index ]['school'];
                var color = options_schools[school]['chart_color'];
                var rank = global_tabletop_data[ value[0].index ][hash_three + 'rank'];

                var value = value[0]['value'];
                var tooltip = '<table class="c3-tooltip">';
                tooltip += '<tbody><tr>';
                tooltip += '<th colspan="2">' + school + '</th>';
                tooltip += '</tr>';
                tooltip += '<tr class="c3-tooltip-name-units">';
                tooltip += '<td class="name">';
                tooltip += '<span style="background-color:' + color + '"></span>';
                tooltip += value + ' ' + options_default['tooltip_wording'];
                tooltip += '</td>';
                if (school !== 'National average') {
                    tooltip += '</tr>';
                    tooltip += '<tr class="c3-tooltip-name-units">';
                    tooltip += '<td class="name">';
                    tooltip += '<strong>' + options_default['tooltip_wording_two'] + '</strong>' + ': ' + rank;
                    tooltip += '</td>';
                }
                tooltip += '</tr></tbody></table>';

                return tooltip;
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

// Remove "rowNumber" object
function jsonReplacer(key, value) {
    if (key === "rowNumber") {
        return undefined;
    } else {
        return value;
    }
}


// The name of the sheets in Google spreadsheet that we're using
var tabletop_sheets = ['Adjusted efficiency', 'Adjusted tempo', 'Effective FG percent', 'FT rate', 'Offense rebound percent', 'Turnover percent'];

// Use Handlebars to load data from Tabletop to page
function loadTabletopData(tabletop_data, tabletop) {
    // _.each(tabletop_data, function(element_data, num_data) {
    //     // console.log(element_data);
    //     var name = element_data['name'];
    //     tabletop_data_export[name] = {'name': name}, {'column_names': ''}, {'elements': ''};

    //     tabletop_data_export[name]['column_names'] = element_data['column_names'];
    //     tabletop_data_export[name]['elements'] = element_data['elements'];
    // }, this);
    // console.save(tabletop_data_export);

    // Loop through sheets in Google Spreadhsheet
    _.each(tabletop_sheets, function(sheet, num_sheet) {
        // Name of the sheet lowercased and without spaces
        // So we can match with the doc's hash
        var sheet_stripped = sheet.replace(/ /g,'').toLowerCase();

        // Push JSON of Tabletopdata to global var
        if (hash_two === sheet_stripped) {
            global_tabletop_data = tabletop_data[sheet]['elements'], jsonReplacer;
        }
    }, this);

    // After Tabletop is loaded, load the chart
    initChart();
}

// Pull data from Google spreadsheet via Tabletop
function initializeTabletopObject(){
    Tabletop.init({
        key: spreadsheet_key,
        callback: loadTabletopData,
        simpleSheet: false,
        debug: false
    });
}

// Doc ready
$(document).ready(function() {
    // Click event to toggle how the chart looks
    $('.toggle-view-option').click(function() {
        ga('send', 'event', 'C3 chart', 'Toggle view');

        $(this).addClass('selected');
        $(this).siblings().removeClass('selected');

        // Set right hash
        approuter.navigate( 'chart/' + hash_two + '/' + $(this).attr('name'), {trigger: true} );
    });

    // Fire up Backbone
    Backbone.history.start();
});