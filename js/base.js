// FUNCTIONS
// Used to capitalize first letter of string
function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// Used to capitalize first letter of all words
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
    	first_letter = txt.charAt(0).toUpperCase();

    	// This captures words with an apostrophe as the second character
    	// And capitalizes them correctly
    	// Example: o'brien = O'Brien
    	if (txt.charAt(1) === "'") {
    		return first_letter + txt.charAt(1) + txt.charAt(2).toUpperCase() + txt.substr(3).toLowerCase();
    	} else {
    		return first_letter + txt.substr(1).toLowerCase();
    	}
    });
}

// Add commas to numbers over 1000
function commaSeparateNumber(val){
	while (/(\d+)(\d{3})/.test(val.toString())){
		val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	}
	return val;
}

// This removes special characters and spaces
function removeSpecialCharacters(string) {
    return string.replace(/[^\w\s]/gi, '').replace(/ /g,'');
}

// Resizes chart
function windowResize() {
    // Autmatically sets the size of the chart
    // To the size of the iFrame
    chart.resize({
        width: $(window.self).width()
    });

    if ( window.self !== window.top ) {
        // Height of other elements next to chart
        var misc_heights = 0;

        // Loop through siblings of chart
        _.each($(chart.element).siblings(), function(value, num) {
            // If element is shown, add it up
            if ($(value).is(":visible") ) {
                misc_heights += $(value).outerHeight();
            }
        });

        // New height of chart is height of window minus height of ther elements
        var new_chart_height = $(window.self).height() - 10 - misc_heights;

        $('#content').height( $(window.self).height() );

        // Set size of iFrame if on mobile
        chart.resize({
            height: new_chart_height
        });
    }
};


// iFrame resize
$(window).resize(function() {
    windowResize();
});

// Used to save console output
// Used to pull data out of a Google spreadsheet
// And into a JSON file
(function(console){
    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)