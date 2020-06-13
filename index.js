const { Plugin } = require("powercord/entities");
const { findInReactTree, forceUpdateElement, getOwnerInstance, waitFor } = require('powercord/util')
const { inject, uninject } = require("powercord/injector");
const { getModule } = require("powercord/webpack");
var SpellCorrector = require("./node_modules/spelling-corrector");

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
		var checkSpell = this.settings.get("spellCheck");

		var spellCheck = new SpellCorrector();
		spellCheck.loadDictionary();
	
		const MessageEvents = await getModule(["sendMessage"]);
		inject("send.", MessageEvents, "sendMessage", function (args) {
			let text = args[1].content.trim();
			var pretext = text;
			//Question Words
			if (quWords) {
				const questionWords = ['who', 'what', 'when', 'where', 'why', 'how', 'can i'];
				var question = false;
				var textBeg = text.slice(0,6);
				for(let k = 0; k < questionWords.length; k++){				
					question = (textBeg.includes(questionWords[k])) ? true : false;
					if(question){
				 	 break;
					}
			  	}
			}

			// Apostrophe Words
			if (apWords) {
				var apoth = false;

				const apothWords = ["doesnt", "cant", "wont", "dont", "ive", "id", "im", "shes", "hes", "its", "theres", "theyre", "youve", "youre", "couldnt", "shouldnt", "wouldnt", "lets", "thats"];
				const apCorWords = ["doesn't", "can't", "won't", "don't", "I've", "I'd", "I'm", "she's", "he's", "it's", "there's", "they're", "you've", "you're", "couldn't", "shouldn't", "wouldn't", "let's", "that's"]; 
				for(let k = 0; k < apothWords.length; k++){
					apoth = (text.includes(apothWords[k])) ? true : false;

					if (checkSpell) {
						/*text = text.replace(" " + apothWords[k] + " ", " " + apCorWords[k] + "  ");

						if (text.slice(0, apothWords[k].length) == apothWords[k]) {
							text = text.replace(apothWords[k] + " ", apCorWords[k] + "  ");
							}
		
						if (text.slice(text.length - apothWords[k].length) ==  apothWords[k]) {
							text = text.replace(" " + apothWords[k], " " + apCorWords[k] + "  ");
						}*/ // working on this
						
					} else {
					text = text.replace(" " + apothWords[k] + " ", " " + apCorWords[k] + " ");

					if (text.slice(0, apothWords[k].length) == apothWords[k]) {
					text = text.replace(apothWords[k] + " ", apCorWords[k] + " ");
					}

					if (text.slice(text.length - apothWords[k].length) ==  apothWords[k]) {
					text = text.replace(" " + apothWords[k], " " + apCorWords[k]);
					}
				  }

				}
			}

			if (exAbrv) {
				var abrv = false;
				const abrvWords = ["imo", "idk", "omg", "lmao", "brb", "rofl", "stfu", "ily", "lmk", "smh", "nvm", "lmfao"];
				const fullAbrvWords = [
					"in my opinion",
					"I don't know",
					"oh my god",
					"laughing my ass off",
					"be right back",
					"rolling on the floor laughing",
					"shut the fuck up",
					"I love you <3",
					"let me know",
					"shaking my head",
					"nevermind",
					"laughing my fucking ass off"
				];
				for(let k = 0; k < abrvWords.length; k++){
					abrv = (text.includes(abrvWords[k])) ? true : false;

					text = text.replace(" " + abrvWords[k] + " ", " " + fullAbrvWords[k] + " ");
					
					if (text.slice(0, abrvWords[k].length) == abrvWords[k]) {
					text = text.replace(abrvWords[k] + " ", fullAbrvWords[k] + " ");
					} 
					
					if (text.slice(text.length - abrvWords[k].length) ==  abrvWords[k]) {
					text = text.replace(" " + abrvWords[k], " " + fullAbrvWords[k]);
					}

				}


			}

			if (checkSpell) {
				console.log("i gotta spell check");
				var textasafuckingarray = text.split(" ");
				console.log(textasafuckingarray);
				var newtext = "";
				textasafuckingarray.forEach(function(substring) {
				  if(substring.includes("'")) {
					newtext = newtext + substring;
				  } else {
						newtext = newtext + spellCheck.correct(substring) + " ";
				  }
				});
				console.log(newtext);
				text = newtext;
			  }
					

			if(question) {
				if (checkSpell) {
				text = text.replace(/.$/,"?");
				} else {
					text = text + "?";
				}
				if (text.slice(text.length-2) == "i?") { 
					text = text.slice(0,text.length-2) + "I?"; // Correct sentences like "Who am I?"
				} 
			}


			if (punct) {
				if (checkSpell) {
				text = (text[text.length - 1] == "!" || text[text.length - 1] == "?" || text[text.length - 1] == ".") ?  text : text = text.replace(/.$/,".");
				} else {
					text = (text[text.length - 1] == "!" || text[text.length - 1] == "?" || text[text.length - 1] == ".") ?  text : text = text + ".";
				}
			}

			if (capt) {
				text = text.charAt(0).toUpperCase() + text.slice(1);
			}
			if (properis) {
				text = text.replace(/ i /g, " I ");
			}

			if (text.toLowerCase().slice(0,8) == "https://" || text.slice(0,7) == "http://") { // Message Link Detection
				text = pretext;
			} else if(text.slice(0,3) == "```") { // Code Block Detection
				text = pretext;
			} else if(text.charAt(0) == "." || text.charAt(0) == "!" || text.charAt(0) == "?" || text.charAt(0) == ";" || text.charAt(0) == ";;" || text.charAt(0) == ":") { // ill fix this line twomarrow t-t
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
