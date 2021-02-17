import { React } from '@vizality/webpack'
import { Tooltip, Button } from '@vizality/components'

module.exports = class TextContainerButton extends React.PureComponent {
	constructor(props){
			super(props)
			this.get = this.props.settings.get
			this.set = this.props.settings.set
			this.enabled = this.get('nazify', true)
	}

	render() {
			return <>
        <Tooltip text={`${this.enabled ? 'Disable' : 'Enable'} Grammar Nazi`} position='top'>
          <Button
            className={`toggle-button ${this.enabled ? 'active' : 'inactive'}`}
            look={Button.Looks.BLANK}
            size={Button.Sizes.ICON}
            onClick={()=>{
              this.enabled = !this.enabled
              this.set('nazify', this.enabled)
              this.forceUpdate()
            }}
          >
            <div className='contents-18-Yxp button-3AYNKb button-318s1X'>
              <svg className='buttonWrapper-1ZmCpA' width='24px' height='24px'>
                <polygon
                  fill='currentColor'
                  transform='translate(-4,-4.4), scale(0.9)'
                  points='21.1059,7.71462 10.3929,18.4277 18.4277,26.4625 26.4624,18.4277 23.7842,15.7494 18.4277,21.106 15.7494,18.4277 23.7841,10.3929 31.819,18.4277 18.4277,31.8191 5.03626,18.4277 18.4277,5.03633 '
                />
              </svg>
            </div>
          </Button>
			  </Tooltip>
      </>
	}
}
