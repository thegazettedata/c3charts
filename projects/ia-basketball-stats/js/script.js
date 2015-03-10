// Grab hash to display the right chart
var hash_split = window.location.hash.split('/');
var hash = hash_split[0];
// The field in the JSON file that has the numbers we want to chart
// Example: offense
var hash_two = hash_split[1];

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
    // Whether or not to show the numbers
    // Above the bars, lines, etc.
    labels_show: false,
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

// Initiate the chart
function initChart() {
    chart = c3.generate({
    	bindto: '#chart',
        data: {
    		json: global_tabletop_data,
    		keys: {
                x: options_default['json_label'],
                value: [hash_two]
            },
            names: {
                number: 'Number of signed up users'
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
                var title = global_tabletop_data[ value[0].index ]['school'];

                var value = value[0]['value'];
                var tooltip = '<table class="c3-tooltip">';
                tooltip += '<tbody><tr>';
                tooltip += '<th colspan="2">' + title + '</th>';
                tooltip += '</tr>';
                tooltip += '<tr class="c3-tooltip-name-units">';
                tooltip += '<td class="name">';
                tooltip += '<span style="background-color:' + options_default['chart_color'] + '"></span>';
                tooltip += value + ' ' + options_default['tooltip_wording'];
                tooltip += '</td>';
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
        if (hash === '#' + sheet_stripped) {
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
    // Fire up Backbone
    Backbone.history.start();
});