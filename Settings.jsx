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
            Forced Punctuation
        </SwitchItem>
        <SwitchItem
            value={ this.props.getSetting('capitalize') }
            onChange={ () => {
                this.props.toggleSetting('capitalize')
                this.props.reload()
            }}
        >
            Capitalize First Letter 
        </SwitchItem>
        <SwitchItem
            value={ this.props.getSetting('proper is') }
            onChange={ () => {
                this.props.toggleSetting('proper is')
                this.props.reload()
            }}
        >
            Auto Capitalize Lowercase I's
        </SwitchItem>
        <SwitchItem
            value={ this.props.getSetting('questionwords') }
            onChange={ () => {
                this.props.toggleSetting('questionwords')
                this.props.reload()
            }}
        >
            Automatic Question Detection
        </SwitchItem>
        <SwitchItem
            value={ this.props.getSetting('apothwords') }
            onChange={ () => {
                this.props.toggleSetting('apothwords')
                this.props.reload()
            }}
        >
            General Autocorrect Library
        </SwitchItem>
        <SwitchItem
            value={ this.props.getSetting('extendAbrv') }
            onChange={ () => {
                this.props.toggleSetting('extendAbrv')
                this.props.reload()
            }}
        >
            Extend Abbreviations
        </SwitchItem>
        </div>
        );
    }
}
