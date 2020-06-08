const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { getModule } = require("powercord/webpack");

module.exports = class grammarNazi extends Plugin {
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
			// Detect if message is a link
			if (!(text.slice(0,8) == "https://") && !(text.slice(0,7) == "http://")) {
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
