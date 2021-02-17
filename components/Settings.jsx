import { React } from '@vizality/webpack'
import { SwitchItem } from '@vizality/components/settings'

export default ({getSetting, toggleSetting }) => <>
      <div>
        <SwitchItem
          note='Adds a period at the end of every message. Ignores question marks and exclamation points.'
          value= { getSetting('punctuation') }
          onChange={ () => { toggleSetting('punctuation') }}
        >
          Forced Punctuation
        </SwitchItem>
        <SwitchItem
          note='Capitalizes the first letter of every sentence.'
          value= { getSetting('capitalization') }
          onChange={ () => { toggleSetting('capitalization') }}
        >
          Normalized Capitalization
        </SwitchItem>
        <SwitchItem
          note='You can interact with your dictionary using chat commands.'
          value= { getSetting('dictionary') }
          onChange={ () => { toggleSetting('dictionary') }}
        >
          Custom Dictionary
        </SwitchItem>
        <SwitchItem
          note={<span>
            If the switch is set to true it will be in the chat bar, if it is false it will be set to the header bar.<br/>
            <b style={{ color: 'rgb(240, 71, 71)' }}>HEADS UP:</b> You must reload the plugin for changes to take effect!</span>
          }
          value= { getSetting('location') }
          onChange={ () => { toggleSetting('location') }}
        >
          Switch Toggle Button Location
        </SwitchItem>
      </div>
</>