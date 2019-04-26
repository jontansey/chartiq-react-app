import React from 'react'
import { CIQ } from 'chartiq'
import { ChartIQChart } from 'components'
import TitleOverlay from '../Layout/TitleOverlay'
import ToolbarDrawing from '../Features/ToolbarDrawing'
import LoadingWidget from './LoadingWidget'
import HeadsUpStatic from '../Features/HeadsUpStatic'
import HeadsUpDynamic from '../Features/HeadsUpDynamic'
import MarkerAbstract from '../Features/MarkerAbstract'
import { ChartContext } from '../../react-chart-context'

/**
 * Wrapped chart component `<WrappedChart/>`.
 * 
 * Renders ChartIQ chart canvas and associated DOM elements. The wrapped chart itself has no user interface. You may 
 * use the provided components to add user controls suitable to your project. See components `<BasicChart>` or 
 * `<AdvancedChart>` in this project for reference.
 *
 * @export
 * @class WrappedChart
 * @extends {React.Component}
 */
export default class WrappedChart extends React.Component {

	constructor (props) {
		super(props)

		console.log('WrappedChart constructor')
		this.createEngine = container => {
			console.log(`createEngine ref continer: ${container}`)
			var config = Object.assign({container: container}, props.chartConstructor)
			this.stxx = container.stxx = new CIQ.ChartEngine(config)
			container.CIQ = CIQ
			container.$$$ = $$$
			container.startChart(this.stxx, quoteFeedSimulator, {rereshInterval: 1, bufferSize: 200})
			this.context.setContext({stx: this.stxx})
		}

		this.engineRef = React.createRef()
	}

	componentDidMount() {
		this.createEngine(this.engineRef.current)
		console.log('WrappedComponent mounted... ')
		console.log("WrappedComponent.props.children: ", this.props.children)
	}

	render () {
		console.log('render WrappedChart')
		const Comparison = React.forwardRef((props, ref) => (
			ref.current && <ChartComparison forwardeRef={ref} />
		))

		return (
			<React.Fragment>
			<div className={"ciq-chart-area"}>
				<div className={"ciq-chart"}>
					{ this.context.stx && <ToolbarDrawing /> }
					<chartiq-chart class="chartContainer" defer-start="true" ref={this.engineRef}>
						{ this.context.stx && <TitleOverlay refProp={this.engineRef} /> }
						<LoadingWidget />
						{this.props.dynamicHeadsUp && this.context.stx && <HeadsUpDynamic />
						}

						{this.props.staticHeadsUp && this.context.stx && <HeadsUpStatic />
						}
					</chartiq-chart>
					{ this.context.stx && <MarkerAbstract /> }
				</div>
			</div>
			</React.Fragment>
		)
	}
}

WrappedChart.contextType = ChartContext;
