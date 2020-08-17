const { Plugin } = require("powercord/entities");
const { findInReactTree, forceUpdateElement, getOwnerInstance, waitFor } = require('powercord/util')
const { inject, uninject } = require("powercord/injector");
const { getModule } = require("powercord/webpack");

const Settings = require('./Settings')

module.exports = class GrammarNazi extends Plugin {
	async startPlugin() {
		powercord.api.settings.registerSettings('Grammar Nazi', {
			category: this.entityID,
			label: 'Grammar Nazi',
			render: Settings
		})

		var punct = this.settings.get("punctuation");
		var capt = this.settings.get("capitalize");
		var properis = this.settings.get("proper is");
		var quWords = this.settings.get("questionwords");
		var apWords = this.settings.get("apothwords");
		var exAbrv = this.settings.get("extendAbrv");

		const MessageEvents = await getModule(["sendMessage"]);
		inject("send.", MessageEvents, "sendMessage", function (args) {
			let text = args[1].content.trim();
			var pretext = text;
			//Question Words
			if (quWords) {
				const questionWords = ['who', 'what', 'when', 'where', 'why', 'how', 'can i'];
				var question = false;
				var textBeg = text.slice(0, 6);
				if (text.match(/$\W/g) != Null) {
					question = false;
				}
				for (let k = 0; k < questionWords.length; k++) {
					question = (textBeg.includes(questionWords[k])) ? true : false;
					if (question) {
						break;
					}
				}
			}

			// Apostrophe Words
			if (apWords) {
				const apothDict = {
					"doesnt": "doesn't",
					"cant": "can't",
					"wont": "won't",
					"dont": "don't",
					"ive": "I've",
					"id": "I'd",
					"im": "I'm",
					"shes": "she's",
					"hes": "he's",
					"its": "it's",
					"theres": "there's",
					"theyre": "they're",
					"youve": "you've",
					"youre": "you're",
					"couldnt": "couldn't",
					"shouldnt": "shouldn't",
					"wouldnt": "wouldn't",
					"lets": "let's",
					"thats": "that's",
					"wheres": "where's",
				};

				let newText = '';
				//console.log(text.split);
				text.split(' ').forEach(word => {
					if (word in apothDict) {
						newText += apothDict[word] + " ";
					} else {
						newText += word + " ";
					}
				});

				if (newText[newText.length - 1] == " ") {
					text = newText.substring(0, newText.length - 1);
				} else {
					text = newText;
				}


			}

			if (exAbrv) {
				const abrvDict = {
					"imo": "in my opinion",
					"idk": "I don't know",
					"omg": "oh my god",
					"lmao": "laughing my ass off",
					"brb": "be right back",
					"rofl": "rolling on the floor laughing",
					"stfu": "shut the fuck up",
					"ily": "I love you <3",
					"lmk": "let me know",
					"smh": "shaking my head",
					"nvm": "nevermind",
					"lmfao": "laughing my fucking ass off",
				};

				let newText = '';
				//console.log(text.split);
				text.split(' ').forEach(word => {
					if (word in abrvDict) {
						newText += abrvDict[word] + " ";
					} else {
						newText += word + " ";
					}
				});

				if (newText[newText.length - 1] == " ") {
					text = newText.substring(0, newText.length - 1);
				} else {
					text = newText;
				}
			}


			if (question) {
				text = text + "?";

				if (text.slice(text.length - 2) == "i?") {
					text = text.slice(0, text.length - 2) + "I?"; // Correct sentences like "Who am I?"
				}
			}


			if (punct) {
				text = (text[text.length - 1] == "!" || text[text.length - 1] == "?" || text[text.length - 1] == ".") ? text : text = text + ".";

			}

			if (capt) {
				text = text.charAt(0).toUpperCase() + text.slice(1);
			}
			if (properis) {
				text = text.replace(/ i /g, " I ");
			}

			if (text.toLowerCase().slice(0, 8) == "https://" || text.slice(0, 7) == "http://") { // Message Link Detection
				text = pretext;
			} else if (text.slice(0, 3) == "```") { // Code Block Detection
				text = pretext;
			} else if (text.charAt(0) == "." || text.charAt(0) == "!" || text.charAt(0) == "?" || text.charAt(0) == ";" || text.charAt(0) == ";;" || text.charAt(0) == ":") { // ill fix this line twomarrow t-t
				text = pretext;
			} else {
				args[1].content = text;
			}


			return args;
		}, true);
	}

	pluginWillUnload() {
		powercord.api.settings.unregisterSettings('Grammar Nazi')
		uninject("send.");
	}
};
