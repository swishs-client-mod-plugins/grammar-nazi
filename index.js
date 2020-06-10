const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { getModule } = require("powercord/webpack");

module.exports = class GrammarNazi extends Plugin {
	constructor() {
		super();
	}

	async startPlugin() {
		this.inject();
	}

	async inject() {
		const MessageEvents = await getModule(["sendMessage"]);
		inject("send.", MessageEvents, "sendMessage", function (args) {
			let text = args[1].content.trim();
			var question = false;
			var apoth = false;
			var botcmd = false;
			var textBeg = text.slice(0,6);
			const botPrefix = ['!', '.', 'pls', ';;', ';', '?'];
			const questionWords = ['who', 'what', 'when', 'where', 'why', 'how', 'can i'];
			const apothWords = ['doesnt', 'cant', 'wont', 'dont', 'ive', 'id', 'im', 'shes', 'hes', 'its', 'theres', 'theyre', 'youve', 'youre', 'couldnt', 'shouldnt', 'wouldnt', 'lets'];
            // Detect if message is a question
			for(let k = 0; k < questionWords.length; k++){				
				question = (textBeg.includes(questionWords[k])) ? true : false;
				if(question){
				  break;
				}
			  }
			// Detect if message has apothWords	  
			for(let k = 0; k < apothWords.length; k++){
				apoth = (text.includes(apothWords[k])) ? true : false;
				text = text.replace(/ doesnt /g, " doesn't ").replace(/ cant /g, " can't ").replace(/ wont /g, " won't ").replace(/ dont /g, " don't ").replace(/ ive /g, " I've ").replace(/ id /g, " I'd ").replace(/ im /g, " I'm ").replace(/ shes /g, " she's ").replace(/ hes /g, " he's ").replace(/ its /g, " it's ").replace(/ theres /g, " there's ").replace(/ theyre /g, " they're ").replace(/ youve /g, " you've ").replace(/ youre /g, " you're ").replace(/ couldnt /g, " couldn't ").replace(/ shouldnt /g, " shouldn't ").replace(/ wouldnt /g, " wouldn't ").replace(/ lets /g, " let's "); //lmao wtf is this line t-t
				if(apoth){
				  break;
				}
			  }
			for (let k = 0; k < botPrefix.length; k++) {
				botcmd = (text.startsWith(botPrefix[k])) ? true : false;
				text = text
				if (botcmd) {
					return;
				}
				}
			if (text.slice(0,8) == "https://" || text.slice(0,7) == "http://") { // Message Link Detection
			} else if(text.slice(0,3) == "```") { // Code Block Detection
			} else if(question == true) {
				text = text.charAt(0).toUpperCase() + text.slice(1) + '?';
				text = text.replace(/ i /g, " I ");
				if (text.slice(text.length-2) == "i?") { 
					text = text.slice(0,text.length-2) + "I?"; // Correct sentences like "Who am I?"
				} 
            } else {
                // Forces Capital Letters
                text = text.charAt(0).toUpperCase() + text.slice(1);
                // Forces Punctuation
                text = (text[text.length - 1] == "!" || text[text.length - 1] == "?" || text[text.length - 1] == ".") ?  text : text + '.';
                // Forces Upercase "I"s
				text = text.replace(/ i /g, " I ");
            }

			args[1].content = text;
            return args;

		}, true);
	}

	pluginWillUnload() {
		uninject("send.");
	}
};
