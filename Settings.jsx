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
            value={ this.props.getSetting('checkSpell') }
            onChange={ () => {
                this.props.toggleSetting('checkSpell')
                this.props.reload()
            }}
        >
            Toggle Automatic Spellchecking
        </SwitchItem>
        </div>
        );
    }
}