var gui = require('nw.gui'); 
var win = gui.Window.get();
var exec = require('child_process').exec;


var tray = new gui.Tray({ title: 'Fifty Fifty', icon: 'img/icon.png' });

var menu = new gui.Menu();
menu.append(new gui.MenuItem({ label: 'Quit' , click: function()
{
	gui.App.quit();
}}));
tray.menu = menu;

/*var mb = new gui.Menu({type:"menubar"});
mb.createMacBuiltin("Fifty Fifty");
win.menu = mb;*/


var leftoption = {
  key : "Ctrl+Shift+Left",
  active : function() 
  {
    move("left");
  }
};

var rightoption = {
  key : "Ctrl+Shift+Right",
  active : function() 
  {
    move("right");
  }
};

var fulloption = {
  key : "Ctrl+Shift+Up",
  active : function() 
  {
    move("full");
  }
};

var smalloption = {
  key : "Ctrl+Shift+Down",
  active : function() 
  {
    move("small");
  }
};


var leftshortcut = new gui.Shortcut(leftoption);
var rightshortcut = new gui.Shortcut(rightoption);
var fullshortcut = new gui.Shortcut(fulloption);
var smallshortcut = new gui.Shortcut(smalloption);

gui.App.registerGlobalHotKey(leftshortcut);
gui.App.registerGlobalHotKey(rightshortcut);
gui.App.registerGlobalHotKey(fullshortcut);
gui.App.registerGlobalHotKey(smallshortcut);


right='tell application "Finder" \n\
	set _b to bounds of window of desktop \n\
	set _width to item 3 of _b \n\
	set _height to item 4 of _b \n\
end tell \n\
\n \
 \n\
tell application "System Events" to tell (first application process whose frontmost is true) \n\
	tell window 1 \n\
		set size to {_width / 2, _height} \n\
		set position to {_width / 2, 20} \n\
	end tell \n\
end tell\n'

left='tell application "Finder" \n\
	set _b to bounds of window of desktop \n\
	set _width to item 3 of _b \n\
	set _height to item 4 of _b \n\
end tell \n\
\n \
 \n\
tell application "System Events" to tell (first application process whose frontmost is true) \n\
	tell window 1 \n\
		set size to {_width / 2, _height} \n\
		set position to {0, 20} \n\
	end tell \n\
end tell\n'

full='tell application "Finder" \n\
	set _b to bounds of window of desktop \n\
	set _width to item 3 of _b \n\
	set _height to item 4 of _b \n\
end tell \n\
\n \
 \n\
tell application "System Events" to tell (first application process whose frontmost is true) \n\
	tell window 1 \n\
		set size to {_width, _height} \n\
		set position to {0, 20} \n\
	end tell \n\
end tell\n'

small='tell application "Finder" \n\
	set _b to bounds of window of desktop \n\
	set _width to item 3 of _b \n\
	set _height to item 4 of _b \n\
end tell \n\
\n \
 \n\
tell application "System Events" to tell (first application process whose frontmost is true) \n\
	tell window 1 \n\
		set size to {_width/2, _height/2} \n\
		set position to {(_width/2)-((_width/2)/2), (_height/2)-((_height/2)/2)} \n\
	end tell \n\
end tell\n'

function move(pos)
{
	script = "/usr/bin/osascript -e '" + window[pos] + window[pos] + "'";
	exec(script, function(error, stdout, stderr)
	{ 
		console.log(error);
	});
}