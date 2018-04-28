import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reducer from '../reducer'
import * as actions from '../actions'
import ScrollableAnchor from 'react-scrollable-anchor'

@connect(reducer, actions)
class Submit extends Component {
  constructor() {
    super()
    this.state = {value: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit() {
    this.props.submit(this.state.value)
  }
  handleChange (e) {
    this.setState({ value: e.target.value })
  }
  render() {
    return (
      <ScrollableAnchor id="submit">
        <section class="content-section text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 mx-auto">
                <h2>Submit an answer</h2>
                {
                  this.props.jwtPayload
                    ?
                      <div class="green-front">
                        <p>You can send only one answer by hour.</p>
                        <form>
                          <div class="form-group">
                            <label for="value">Your answer</label>
                            <textarea class="form-control" value={this.state.value} onChange={this.handleChange} rows="5" />
                          </div>
                          <button type="button" class="btn btn-default btn-lg" onClick={this.handleSubmit}>
                            Submit
                          </button>
                        </form>
                      </div>
                    :
                      <p class="green-front">
                        You must be authenticated.
                      </p>
                }
              </div>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default Submit
