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
		const MessageEvents = await getModule(["sendMessage", "editMessage"]);
		inject("send.", MessageEvents, "sendMessage", function (args) {
			let text = args[1].content.trim();
			var question = false;
			const questionWords = ['who', 'what', 'when', 'where', 'why', 'how', 'can i'];
            // Detect if message is a question
			for(let k = 0; k < questionWords.length; k++){
				question = (text.includes(questionWords[k])) ? true : false;
				if(question){
				  break;
				}
			  }
			// Detect if message is a link
			if (text.slice(0,8) == "https://" || text.slice(0,7) == "http://") {
			} else if(question == true) {
				text = text.charAt(0).toUpperCase() + text.slice(1) + '?';
				text = text.replace(/i /g, "I ");
				if (text.slice(text.length-2) == "i?") {
					text = text.slice(0,text.length-2) + "I?";
				} 
            } else {
                // Forces Capital Letters
                text = text.charAt(0).toUpperCase() + text.slice(1);
                // Forces Punctuation
                text = (text[text.length - 1] == "!" || text[text.length - 1] == "?" || text[text.length - 1] == ".") ?  text : text + '.';
                // Forces Upercase "I"s
				text = text.replace(/i /g, "I ");
            }

			args[1].content = text;
            return args;

		}, true);
	}

	pluginWillUnload() {
		uninject("send.");
	}
};
