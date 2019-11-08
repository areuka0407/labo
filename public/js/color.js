// color.js
window.onload=function(){
	const option = {
        picker: "#colorPicker",
        viewerBox: ".box",
        viewColor: ".color-box",
        viewHex: ".hex",
        viewR: ".R > input",
        viewG: ".G > input",
        viewB: ".B > input",
        brightness: ".brightness",
        option: ".option-tab"
    };
    const app = new ColorPicker(option);
    const tags = new Tags("#tag-box");
}