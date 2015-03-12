// Global chart
// Don't need to edit
var chart;

// Keep track of whether or not we've got a bar chart
// So we can run the right code whenever
// The offense, defense toggles are clicked
var bar_chart = true;

// Default ptions for each chart
// Used with C3 chart build
var options_default = {
    // The label for these values
    // Will appear under x axis dashes
    json_label: 'school',
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
    'ISU': {
        chart_color: '#90191C'
    },
    'Nation': {
        chart_color: '#a0c6e8'
    }
}

// Options for different chart types
// Used with C3 chart build
var options_charts = {
    'adjustedefficiency': {
        chart_type: 'bar',
        y_max_value: 1.5,
        tooltip_wording: 'points per possession',
    },
    'adjustedtempo': {
        chart_type: 'bar',
        y_max_value: 85,
        tooltip_wording: 'possessions per 40 minutes'
    },
    'effectivefgpercent': {
        chart_type: 'gauge',
        tooltip_wording: 'percent'
    },
    'turnoverpercent': {
        chart_type: 'gauge',
        tooltip_wording: 'percent'
    },
    'offensereboundpercent': {
        chart_type: 'gauge',
        tooltip_wording: 'percent'
    },
    'ftrate': {
        chart_type: 'gauge',
        tooltip_wording: 'percent'
    }
}

function tooltipCreate(value, defaultTitleFormat, defaultValueFormat, color) {
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
    tooltip += value + ' ' + options_charts[hash_two]['tooltip_wording'];
    tooltip += '</td>';
    if (school !== 'Nation') {
        tooltip += '</tr>';
        tooltip += '<tr class="c3-tooltip-name-units">';
        tooltip += '<td class="name">';
        tooltip += '<strong>' + options_default['tooltip_wording_two'] + '</strong>' + ': ' + rank;
        tooltip += '</td>';
    }
    tooltip += '</tr></tbody></table>';
    
    return tooltip;
// Close tooltip create
}