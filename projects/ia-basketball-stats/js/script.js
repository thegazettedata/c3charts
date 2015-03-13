// TABLETOP
// Google Docs spreadsheet key
var spreadsheet_key = '1CXSNt2f_oEcNUePR7ZwwCN6_R0AYbMVNC3Ue85_FFs8';

// Where we'll put data we load from Tabletop
// Don't need to edit
var global_tabletop_data;
var tabletop_data_export = {};

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

    //Detect whether or not we're making a bar chart
    // So we can call the right function to build the chart
    // If it has the word "percent" or "rate", it's a gauge chart
    if ( hash_two.indexOf('percent') === -1 && hash_two.indexOf('rate') === -1 ) {
        bar_chart = true;
        initChart();
    } else {
        bar_chart = false;
        initChartGauge();

        // Add a margin below the toggle switches
        if ( $(window).width() < 551 ) {
            $('.toggle-view').css({
                'margin-bottom': '20px'
            });
        }
    }
}

// Pull data from Google spreadsheet via Tabletop
function initializeTabletopObject(){
    // loadTabletopData(tabletop_data); 

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

    // Click event to toggle how the chart looks
    $('.toggle-view-option').click(function() {
        ga('send', 'event', 'IA basketball stats', 'Toggle offense/defense');

        $(this).addClass('selected');
        $(this).siblings().removeClass('selected');

        // Set right hash
        approuter.navigate( 'chart/' + hash_two + '/' + $(this).attr('name'), {trigger: true} );
    });

    $("body").mouseleave(function(){
        ga('send', 'event', 'IA basketball stats', 'Chart touched');
    });
});