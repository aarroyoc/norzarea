require.setModuleRoot("./js/");
require.run("main");
/*var options={
	resPostPath: "./locales/__lng__",
	sendType: "POST|GET",
	sendMissingTo: "en"
};*/
var options={
	resGetPath: "./locales/__lng__/__ns__.json",
	useCookie: false,
	debug: false,
	fallbackLng: "es",
	useLocalStorage: false,
	fallbackOnNull: false,
	fallbackOnEmpty: false,
	ns: "translation",
	sendMissingTo: "es"
};
i18n.init(options,function(t){
	document.getElementById("image-loading").setAttribute("alt",i18n.t("app.loading"));
});
	