require.setModuleRoot("./js/");
require.run("main");
/*var options={
	resPostPath: "./locales/__lng__",
	sendType: "POST|GET",
	sendMissingTo: "en"
};*/
var options={
	resGetPath: "./locales/__lng__/__ns__.json",
	debug: false
};
i18n.init(options,function(t){
	document.getElementById("gjs-loader").textContent=i18n.t("app.loading");
});