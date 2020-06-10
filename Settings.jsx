const { React } = require('powercord/webpack')
const { SwitchItem } = require('powercord/components/settings')

module.exports = class Settings extends React.PureComponent {
    render() {
        return ( 
        <div>
        <SwitchItem
            value={ this.props.getSetting('punctuation') }
            onChange={ () => {
                this.props.toggleSetting('punctuation')
                this.props.reload()
            }}
        >
            Toggle Punctuation
        </SwitchItem>
        <SwitchItem
            value={ this.props.getSetting('capitalize') }
            onChange={ () => {
                this.props.toggleSetting('capitalize')
                this.props.reload()
            }}
        >
            Toggle Capitalize First Letter 
        </SwitchItem>
        <SwitchItem
            value={ this.props.getSetting('proper is') }
            onChange={ () => {
                this.props.toggleSetting('proper is')
                this.props.reload()
            }}
        >
            Capitalize I's when they are on their own
        </SwitchItem>
        <SwitchItem
            value={ this.props.getSetting('questionwords') }
            onChange={ () => {
                this.props.toggleSetting('questionwords')
                this.props.reload()
            }}
        >
            Toggle Question Words
        </SwitchItem>
        <SwitchItem
            value={ this.props.getSetting('apothwords') }
            onChange={ () => {
                this.props.toggleSetting('apothwords')
                this.props.reload()
            }}
        >
            Autocorrect words that usually have apostrophe's
        </SwitchItem>
        </div>
        );
    }
}
