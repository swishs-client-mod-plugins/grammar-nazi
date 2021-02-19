import { React } from '@vizality/webpack'
import { SwitchItem, RadioGroup } from '@vizality/components/settings'

export default ({getSetting, toggleSetting, updateSetting }) => <>
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
        <RadioGroup
          required={ false }
          onChange={ val => { updateSetting('location', val.value), val.value ? 'none' : updateSetting('nazify', true) }}
          value={ getSetting('location', 'channel-text-area-container') }
          options={[
            {
              name: 'Typing Box',
              value: 'channel-text-area-container'
            },
            {
              name: 'Header Bar',
              value: 'header-bar-container',
            },
            {
              name: 'None',
              value: 'none'
            }
          ]}
        >
          Toggle Button Location
        </RadioGroup>
      </div>
</>