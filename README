# Things Status Board Panel

[Status Board](http://panic.com/statusboard/) is an iPad app by [Panic Inc.](http://panic.com/) that allows you do display (visualised) data from a plethora of sources on your iPad.

This DIY panel for Status Board displays tasks from the 'Today' list of [Things.app](http://culturedcode.com/things/) by [Cultured Code](http://culturedcode.com/), including the number of days until their due date (should they have one) and their corresponding area or project.

This work is a modification of Gunther Groenewege's [original implementation](http://blog.g-design.net/post/47693093316/integrating-things-with-panics-status-board) of a Things.app integration into Status Board. I have taken the liberty of adding automatic background updates and days until due date whilst removing any tasks not included in the 'Today' list -- I believe you should manage your GTD priorities in Things and use Status Board to focus on current tasks.

## How it works
This DIY panel is supposed to be used with [Dropbox](http://dropbox.com) but can easily be modified for use with a web server. A local component consisting of an AppleScript, a shell script, and a plist file that allows you to periodically call the shell script via launchd. The remote component resides in your public Dropbox folder and consists of a .csv file (created by the local component), a .css file, a javascript file, and an html file.

The local AppleScript extracts the tasks from your 'Today' list and returns them as text in csv format. The shell script that calls the AppleScript writes the returned text into the csv file in your public folder on Dropbox. The csv file is read and processed into html by the javascript in your dropbox when Status Board loads the html file through its public url.

## Setup
1. Put the shell script and the AppleScript into your ~/Library/Sripts folder (I made a sub-folder called Things-Status-Board).
2. Change the paths inside the shell script to match that of the AppleScript and the destination of your csv file (the latter should be somewhere in your public Dropbox folder; preferably in the same folder as the files in the next step).
3. Copy the css, js, and html files to your public Dropbox folder (again, I've created a sub-folder like above).
4. Modify the URL to the css file ('http://URL-TO-THE-CSS-FILE') inside the html file to match its public url given by Dropbox.
```html
<style type="text/css">
	@import url("http://URL-TO-THE-CSS-FILE");
</style>
```
5. Modify the URL to the js file inside the html file to match its public url given by Dropbox.
```html
<script src="http://URL-TO-THE-JS-FILE"></script>
```
6. Modify the URL to the csv file inside the js file to match its public url given by Dropbox.
```javascript
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
```
7. Put the plist file into ~/Library/LaunchAgents.
8. Modify the path to your script folder inside the plist file to match the folder where the shell script is stored.
```plist
<key>ProgramArguments</key>
<array>
    <string>/PATH/TO/SCRIPT/FOLDER/exportThingsTasksToCSV.sh</string>
</array>
```
9. Modify the path to your csv file folder inside the plist file to match the folder inside your public Dropbox folder, where the csv file is stored.
```plist
<key>StandardOutPath</key>
<string>/PATH/TO/DROPBOX/FOLDER/CONTAINING/CSV/FILE/tasks.csv</string>
```
10. Load the service into launchd as shown for example [here](http://nathangrigg.net/2012/07/schedule-jobs-using-launchd/).
### Optional
11. Change the time intervals inside the plist file and the js file; the start interval value and setTimeout value, respectively.

## Future
* Redesign the panel.
* More features / more modular setup.
* ...

