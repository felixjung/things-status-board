function daemon() {
	$.ajax({
		type: "GET",
		url: "http://URL-TO-THE-CSV-FILE",
		dataType: "text",
		success: function(data) {processData(data);},
		complete: function(data) {
			setTimeout(daemon, 300000);
		}
	});
}

function getDueDateClass(dueDate) {
	if (dueDate == 'Due Today') {
		return 'today';
	} else if (dueDate == 'Overdue') {
		return 'overdue';
	} else if (dueDate != ' ') {
		return 'soon';
	}
}

function newTaskEntry(task) {
	var htmlCode = '<p>' + task[0];
	
	if(task[2] != ' ') {
		htmlCode = htmlCode + '<span class = "' + getDueDateClass(task[2]) + '">' + task[2] + '</span>';
	}
	
	htmlCode = htmlCode + '<span>' + task[1] + '</span>' + '</p>';
	
	return htmlCode;
}

function processData(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	var newContent = "<h2>Today's Tasks</h2>"
	for (var i=0; i < allTextLines.length; i++) {
		var textLine = allTextLines[i];
		if (textLine != "") {
			var task = textLine.split(",");
			newContent = newContent + newTaskEntry(task);
		};
	}
	$('#tasks_container').html(newContent);
}