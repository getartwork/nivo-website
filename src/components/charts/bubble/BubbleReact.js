import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import { Link }                        from 'react-router'
import { ResponsiveBubble }            from 'nivo'
import ChartHeader                     from '../../ChartHeader'
import ChartCodeAndData                from '../../ChartCodeAndData'
import Properties                      from '../../Properties'
import { generateBubbleCode }          from '../../../code-generators/bubbleCodeGenerator'
import BubbleControls                  from './BubbleControls'


class BubbleReact extends Component {
    constructor(props) {
        super(props)

        this.handleSettingsUpdate = this.handleSettingsUpdate.bind(this)

        this.state = {
            settings: {
                identity:        'name',
                value:           'loc',
                colors:          'nivo',
                padding:         1,
                enableLabel:     true,
                label:           'name',
                labelSkipRadius: 8,
                labelTextColor:  'inherit:darker(.8)',
                labelTextDY:     4,
                borderWidth:     0,
                borderColor:     'inherit:darker(.3)',
                motionStiffness: 120,
                motionDamping:   10,
            }
        }
    }

    handleSettingsUpdate(settings) {
        this.setState({ settings })
    }

    render() {
        const { root }     = this.props
        const { settings } = this.state

        const code = generateBubbleCode(settings)

        return (
            <div>
                <ChartHeader chartClass="Bubble" tags={['bubble', 'hierarchy', 'react', 'isomorphic']} />
                <div className="page_content">
                    <div className="grid">
                        <div className="grid_item grid_item-1_3">
                            <div className="main-chart">
                                <ResponsiveBubble
                                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                    root={_.cloneDeep(root)}
                                    identity={settings.identity}
                                    value={settings.value}
                                    label={settings.label}
                                    {...settings}
                                >
                                </ResponsiveBubble>
                            </div>
                            <div>
                                <p className="description">Use React for rendering and react-motion for transitions.</p>
                                <p className="description">This chart offer various implementations, you can render it using <Link to="/bubble/d3">pure d3</Link> or <Link to="/bubble">let react handles all the rendering</Link> and you can even <Link to="/bubble/placeholders">render whatever you want</Link> instead of the boring circles.</p>
                            </div>
                        </div>
                        <div className="grid_item grid_item-2_3">
                            <BubbleControls
                                target="Bubble"
                                settings={settings}
                                onChange={this.handleSettingsUpdate}
                            />
                            <ChartCodeAndData code={code} data={root} />
                        </div>
                        <div className="grid_item grid_item-full">
                            <Properties
                                chartClass="Bubble"
                                properties={[
                                    'width',
                                    'height',
                                    ['root', 'object', true, '', 'the hierarchical data object.'],
                                    ['value', 'string|function', true, (<code className="code-string">"value"</code>), (
                                        <span>
                                            define value accessor, if string given, will use <code>datum[value]</code>,<br/>if function given, it will be invoked for each node and will receive the node as first argument, it must the node value.
                                        </span>
                                    )],
                                    ['padding', 'number', true, (<code className="code-number">1</code>), (
                                        <span>sets the approximate padding between adjacent circles, in pixels. see <a href="https://github.com/mbostock/d3/wiki/Pack-Layout#padding" target="_blank">official d3 documentation</a>.</span>
                                    )],
                                    ['colors', '*', true, (<code>Nivo.defaults.colorRange</code>), (
                                        <span>
                                            colors used to colorize the circles, <Link to="/guides/colors">see dedicated documentation</Link>.
                                        </span>
                                    )],
                                    ['borderWidth', 'number', true, (<code className="code-number">0</code>), 'width of circle border.'],
                                    ['borderColor', 'any', true, (<code className="code-string">"inherit"</code>), (
                                        <span>
                                            how to compute border color, <Link to="/guides/colors">see dedicated documentation</Link>.
                                        </span>
                                    )],
                                    ['enableLabel', 'boolean', true, (<code>true</code>), 'enable/disable label display'],
                                    ['label', 'string', true, (<code className="code-string">"name"</code>), ''],
                                    ['labelFormat', 'string', false, '', (
                                        <span>
                                            how to format label, <a href="https://github.com/mbostock/d3/wiki/Formatting#d3_format" target="_blank">see d3.format() documentation</a>.
                                        </span>
                                    )],
                                    ['labelSkipRadius', 'number', true, (<code className="code-number">0</code>), 'if > 0, labels won\'t be rendered for nodes with a radius below the given value.'],
                                    ['labelTextColor', 'any', true, (<code className="code-string">"none"</code>), (
                                        <span>
                                            how to compute text color, <Link to="/guides/colors">see dedicated documentation</Link>.
                                        </span>
                                    )],
                                    ['labelTextDY', 'number', true, (<code className="code-number">5</code>), (
                                        <span>
                                            label y offset, used to vertically center text.
                                        </span>
                                    )],
                                    'animate',
                                    'motionStiffness',
                                    'motionDamping',
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default BubbleReact
