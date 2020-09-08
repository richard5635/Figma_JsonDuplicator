// const {google} = require('googleapis');
// https://github.com/jussikinnula/serverless-typescript-starter

// Watch changes for webpack
// 
// https://www.figma.com/plugin-docs/bundling-webpack/

let wWidth = 432;
let wHeight = 551;

figma.showUI(__html__, {width: wWidth, height: wHeight});

// Initial Info
let prefix = "txt/"
let languages = ["it", "de", "fr", "ru", "es", "pt", "ja", "cn", "tw", "kr"];

let fontName_CN = {
	"family": "Hiragino Sans GB",
	"style": "W6"
}
let fontName_CN_reg = {
	"family": "Hiragino Sans GB",
	"style": "W3"
}

// Container for JSON
let jSONData = {};

figma.ui.onmessage = async msg => {
	if (msg.type === 'create-rectangles') {
		const nodes = []

		for (let i = 0; i < msg.count; i++) {
			const rect = figma.createRectangle()
			rect.x = i * 150
			rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }]
			figma.currentPage.appendChild(rect)
			nodes.push(rect)
		}

		figma.currentPage.selection = nodes
		figma.viewport.scrollAndZoomIntoView(nodes)
	}

	if (msg.type === 'load-json') {
		// Debug
		// console.log("Load JSON");
		// console.log(msg.obj);

		// Place data into container
		jSONData = msg.obj;

	}

	if (msg.type === 'duplicate-translate') {
		// console.log("Duplicate Translate");

		// // Duplicate it below
		const gap = 200; // later: height + 400

		// Search all files containing txt/ prefix. Loop it.
		const selection = figma.currentPage.selection["0"];
		// console.log(selection);

		// Loop per language here. For now, just Deutsch
		for (let l = 0; l < languages.length; l++) {

			let lang = languages[l];

			// console.log(lang);

			// Load the required fonts
			await figma.loadFontAsync(fontName_CN);
			await figma.loadFontAsync(fontName_CN_reg);


			const duplicate = selection.clone();
			duplicate.y = duplicate.y + (duplicate.height + gap) * (1 + l);

			// Rename Frame Name
			duplicate.name = "AndroidMobile_" + lang.toUpperCase();


			for (let i = 0; i < duplicate.children.length; i++) {
				// console.log("duplicatechildren " + i);
				let nameRaw = duplicate.children[i].name;

				// Name check for prefix
				if (hasPrefix(prefix, nameRaw)) {
					// console.log("hasprefix! " + nameRaw);
					let textNode = duplicate.children[i];

					// Copy name and reduce prefix?
					let name = nameRaw.substr(prefix.length);

					// Find name in object, also check if it is a TextNode
					// https://www.figma.com/plugin-docs/api/TextNode/
					if (jSONData[lang].hasOwnProperty(name)) {
						// Load font of the style.
						await figma.loadFontAsync(textNode.fontName);


						// console.log("found match");

						if (jSONData[lang][name] === "") {
							textNode.characters = "[NO TEXT]";
						}
						else {
							// Do styling here. No partial font styling? I think it is possible, but a little tricky.
							textNode.characters = jSONData[lang][name];

							if (isOrientalCharacter(lang)) {
								// Change fontSize and lineHeight by 10%
								let fontSizeGap = textNode.fontSize * 0.1;
								textNode.fontSize = textNode.fontSize - fontSizeGap;
								textNode.lineHeight = {
									unit: "PIXELS",
									value: textNode.lineHeight.value + fontSizeGap
								} 

								// Chinese, change font
								if (lang === "cn") {
									if (textNode.fontName.style === "Regular") {
										// console.log("cn-regular");
										textNode.fontName = fontName_CN_reg;
									}
									else {
										// console.log("cn-bold");
										textNode.fontName = fontName_CN;
									}
								}
							}
						}
					}
					else {
						console.log(`Cannot find the node ${name}`);
					}
				}
			}
		}

		// figma.closePlugin()
	};
}

figma.on('selectionchange', () => {
	// Get info of the selection
	let selection = figma.currentPage.selection["0"];
	console.log(selection);
	// Send message to UI
	let names = [];

	// Select one node, find matches from the 1 degree childreen inside it.
	if(selection == null) {
		sendSelectionNames(names);
		return;
	}

	for(let i = 0; i < selection.children.length; i++){
		if(hasPrefix("txt/",selection.children[i].name))names.push(selection.children[i].name);
		// Needs to match with the content of the translations2.json. Can be a future update.
	}
	sendSelectionNames(names);
});

let sendSelectionInfo = (selection) => {
	figma.ui.postMessage({
		type: 'selectionInfo',
		selection: selection
	})
}

let sendSelectionNames = (selectionNames) => {
	figma.ui.postMessage({
		type: 'selectionNames',
		names: selectionNames
	})
}

let hasPrefix = (prefix, text) => {
	for (let i = 0; i < prefix.length; i++) {
		if (prefix[i] != text[i]) return false;
	}
	return true;
};

let isOrientalCharacter = (lang) => {
	if (lang === "ja" || lang === "cn" || lang === "tw" || lang === "kr") {
		console.log(lang + " is an oriental character!");
		return true;
	} else false;
}