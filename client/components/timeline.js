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
  render({stages}, {}) {
    console.log(stages)
    return (
      <ScrollableAnchor id="timeline">
        <section class="content-section text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 margin-auto">
                <h2 class="margin-auto">Timeline</h2>
                <div>timeline</div>
              </div>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default Timeline
