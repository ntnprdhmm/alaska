import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reducer from '../reducer'
import * as actions from '../actions'
import ScrollableAnchor from 'react-scrollable-anchor'

@connect(reducer, actions)
class Timeline extends Component {
  componentDidMount() {
    this.props.fetchStages()
  }
  render({ stages }, {}) {
    return (
      <ScrollableAnchor id="timeline">
        <section class="content-section text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 margin-auto">
                <h2 class="margin-auto">Timeline</h2>
                {
                  stages[0]
                    ?
                      <div class="timeline">
                        <div class="timeline-container timeline-container--left">
                          <div class="timeline-content">
                            <h2>Stage 1</h2>
                            <p><b>From</b> {new Date(parseInt(stages[0].start) * 1000).toLocaleString()}</p>
                            <p><b>To</b> {new Date(parseInt(stages[0].end) * 1000).toLocaleString()}</p>
                          </div>
                        </div>
                        <div class="timeline-container timeline-container--right">
                          <div class="timeline-content">
                            <h2>Stage 2</h2>
                            <p><b>From</b> {new Date(parseInt(stages[1].start) * 1000).toLocaleString()}</p>
                            <p><b>To</b> {new Date(parseInt(stages[1].end) * 1000).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    : null
                }
              </div>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default Timeline
