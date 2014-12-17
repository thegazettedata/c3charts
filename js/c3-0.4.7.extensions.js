// Ungroup a chart after it's been grouped
var c3_chart_fn = c3.chart.fn;
var c3_chart_internal_fn = c3.chart.internal.fn;

c3_chart_fn.ungroup = function () {
    var $$ = this.internal, config = $$.config;
    var chart_type = config['data_type'];
    config.data_groups = [];
    this.transform(chart_type);
    return config.data_groups;
};