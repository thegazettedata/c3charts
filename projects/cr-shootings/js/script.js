// TABLETOP
// Google Docs spreadsheet key
var spreadsheet_key = '1a-g9ce9PMriDFCl3qfeJu-8lVT4vfwtEkB5SeQfuM78';
var tabletop_sheets = [
    ['Sheet2', 'chart-one', 'area'],
    ['Sheet2', 'chart-two', 'line']
];

// Where we'll put data we load from Tabletop
// Don't need to edit
var tabletop_data_global;
var tabletop_data_current;
var tabletop_data_export;

// The label for these values
// Will appear under x axis dashes
var json_label = 'year';
// The field in the JSON file that has the numbers we want to chart
var json_value = 'homicides';

// CHART OPTIONS
// Set height of chart
var chart_height = 320;

// Color of lines, bars, etc.
var chart_color = '#a0c6e8';

// Whether or not to show the numbers
// Above the bars, lines, etc.
var labels_show = false;

// Text to go before value in tooltip title
// Can be blank
var tooltip_title = 'Year: ';
// Wording that will follow the value in the tooltip
var tooltip_wording  = 'items acquired';

// Whether or not to show the legend
var legend_show = false;

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
function initChart(div, chart_type) {
    console.log(div);

    chart = c3.generate({
    	bindto: div,
        data: {
    		json: tabletop_data_current,
    		keys: {
    				x: json_label,
                    value: [json_value]
    		},
          	type: chart_type, 
        	color: function (color, value) {
                return chart_color;
            },
            labels: labels_show
        },
        axis: {
            x: {
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
                tooltip += '<span style="background-color:' + chart_color + '"></span>';
                tooltip += value + ' ' + tooltip_wording;
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
    
    $(div).siblings().hide()

    iFrameChartResize();
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
    //     // console.log(element_data);
    //     var name = element_data['name'];
    //     tabletop_data_export[name] = {'name': name}, {'column_names': ''}, {'elements': ''};

    //     tabletop_data_export[name]['column_names'] = element_data['column_names'];
    //     tabletop_data_export[name]['elements'] = element_data['elements'];
    // }, this);
    // console.save(tabletop_data_export);

    // Loop through sheets in Google Spreadhsheet
    var num_sheet_current = 0;
    _.each(tabletop_sheets, function(sheet, num_sheet) {
        
        // Push JSON of Tabletopdata to global var
        var hash = Backbone.history.fragment
        if (sheet[1] === hash) {
            num_sheet_current = num_sheet;
            tabletop_data_current = tabletop_data[sheet[0]]['elements'], jsonReplacer;
        }
    }, this);

    // After Tabletop is loaded, load the chart
    var chart_div = '#' + tabletop_sheets[num_sheet_current][1];
    var chart_type = tabletop_sheets[num_sheet_current][2];
    initChart(chart_div, chart_type);
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

// iFrame resize
$(window).resize(function() {
    iFrameChartResize()
});