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

	var punct = this.settings.get('punctuation');
	var capt = this.settings.get('capitalize');
	var properis = this.settings.get('proper is');
	var quWords = this.settings.get('questionwords');
	var apWords = this.settings.get('apothwords');
		const MessageEvents = await getModule(["sendMessage"]);
		inject("send.", MessageEvents, "sendMessage", function (args) {
			let text = args[1].content.trim();
			var pretext = text;
			var botcmd = false;
			const botPrefix = ['!', '.', 'pls', ';;', ';', '?'];
			
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
				const apothWords = ['doesnt', 'cant', 'wont', 'dont', 'ive', 'id', 'im', 'shes', 'hes', 'its', 'theres', 'theyre', 'youve', 'youre', 'couldnt', 'shouldnt', 'wouldnt', 'lets']; 
				for(let k = 0; k < apothWords.length; k++){
					apoth = (text.includes(apothWords[k])) ? true : false;
					text = text.replace(/ doesnt /g, " doesn't ").replace(/ cant /g, " can't ").replace(/ wont /g, " won't ").replace(/ dont /g, " don't ").replace(/ ive /g, " I've ").replace(/ id /g, " I'd ").replace(/ im /g, " I'm ").replace(/ shes /g, " she's ").replace(/ hes /g, " he's ").replace(/ its /g, " it's ").replace(/ theres /g, " there's ").replace(/ theyre /g, " they're ").replace(/ youve /g, " you've ").replace(/ youre /g, " you're ").replace(/ couldnt /g, " couldn't ").replace(/ shouldnt /g, " shouldn't ").replace(/ wouldnt /g, " wouldn't ").replace(/ lets /g, " let's "); //lmao wtf is this line t-t
					if(apoth){
				  	return;
					}
				}
			}
			
			if(question) {
				text = text.charAt(0).toUpperCase() + text.slice(1) + '?';
				text = text.replace(/ i /g, " I ");
				if (text.slice(text.length-2) == "i?") { 
					text = text.slice(0,text.length-2) + "I?"; // Correct sentences like "Who am I?"
				} 
			}

			for (let k = 0; k < botPrefix.length; k++) {
				botcmd = (text.startsWith(botPrefix[k])) ? true : false;
				if (botcmd) {
					return;
				}
			}


			if (punct) {
				text = (text[text.length - 1] == "!" || text[text.length - 1] == "?" || text[text.length - 1] == ".") ?  text : text + '.';
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
			} else if(botcmd) {
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
