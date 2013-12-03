$(function() {
	app.init();
});

var app = {
	inputElement: false,
	outputElement: false,

	init: function() {
		app.inputElement = $('#input');
		app.outputElement = $('#output');
		
		$(app.inputElement).on('keyup', function() {
			app.updateCalculations();
		});
	},
	
	updateCalculations: function() {
		var text = $(app.inputElement).val();
		
		var lines = text.split('\n');
		var minutes = 0;
		
		app.log('updateCalculations');
		
		for ( var index in lines )
		{
			app.log('Parsing line: ' + index);
			var line = lines[index];
			
			var minutesForLine = app.parseLineIntoMinutes(line);
			app.log("Minutes for Line: "+minutesForLine);
			
			minutes += minutesForLine;
		}
		
		var duration = durationStringFromMinutes(minutes);
		
		$(app.outputElement).html(duration);
	},
	
	parseLineIntoMinutes: function(line) {
		if ( ! line ) {
			return 0;
		}
	
		var hours = 0;
		var minutes = 0;
		var parts = line.split(':');
		
		app.log(parts[0]+' : ' + parts[1]);
		
		hours = parseInt(parts[0]);
		
		if ( parts.length == 2 && parts[1] ) {		
			minutes = parseInt(parts[1]);
		}
		
		return parseInt(minutes + (hours * 60));
	},
	
	log: function(message) {
		$('#log').text(message + "\n" + $('#log').text());
	}
};

function durationStringFromMinutes(totalMinutes)
{
	var totalMinutes = parseInt(totalMinutes);

	var hours = Math.floor(totalMinutes / 60);
	var minutes = totalMinutes % 60;
	
	var output = "";
	
	if ( hours == 1 ) {
		output += hours + " hour";
	}
	else {
		output += hours + " hours";
	}
	
	if ( minutes == 1 )
	{
		output += " " + minutes + " minute";
	}
	else {
		output += " " + minutes + " minutes";
	}
	
	return output;
}