import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reducer from '../reducer'
import * as actions from '../actions'

@connect(reducer, actions)
class ResetForm extends Component {
  constructor () {
    super()
    this.state = {password: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (e) {
    this.setState({ password: e.target.value })
  }
  handleSubmit () {
    this.props.sendNewPassword(this.props.resetToken, this.state.password)
  }
  render () {
    return (
      <form class="modal-form">
        <div class="form-group">
          <label for="password">New password</label>
          <input type="password" class="form-control" id="password"
            onChange={this.handleChange} value={this.state.password} />
        </div>
        <div class="login-btn-group">
          <button type="button" class="btn btn-default btn-lg" onClick={this.handleSubmit}>
            Save
          </button>
        </div>
      </form>
    )
  }
}

export default ResetForm
