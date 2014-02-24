var Unity;
function UnityReady()
{
	Unity.Notification.showNotification("Norzarea", "Succesfully integrated Norzarea with Unity");
	Unity.addAction("/File/New game",function(){
		window.location.reload(false);
	});
	Unity.addAction("/Help/About",function(){
		Unity.Notification.showNotification("About Norzarea","(C) Adrián Arroyo Calle 2014. Licensed under GNU GPL v2");
	});
	Unity.Launcher.addAction("New game",function(){
		window.location.reload(false);
	});
	Unity.MessagingIndicator.addAction("Submit bug", function(){
		window.open("http://github.com/AdrianArroyoCalle/norzarea","GitHub");
	});
	Unity.MediaPlayer({
		title: "From the new world",
		album: "Symphony Nº 9",
		artist: "Dvorak"
	});
}
if(window.external!=undefined)
	if(window.external.getUnityObject != undefined)
	{
		Unity=window.external.getUnityObject(1.0);
		Unity.init({
			name: "Norzarea",
			iconUrl: "http://adrianarroyocalle.github.io/norzarea",
			onInit: UnityReady
		});
	}