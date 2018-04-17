import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reducer from '../reducer'
import * as actions from '../actions'

@connect(reducer, actions)
class Login extends Component {
  constructor () {
    super()
    this.state = {email: '', password: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleLogin () {
    this.props.login(this.state)
  }
  handleRegister () {
    this.props.register(this.state)
  }
  render () {
    return (
      <form class="modal-form">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" name="email" id="email"
            onChange={this.handleChange} value={this.state.email} />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" name="password" id="password"
            onChange={this.handleChange} value={this.state.password} />
        </div>
        <div class="login-btn-group">
          <button type="button" class="btn btn-default btn-lg" onClick={this.handleLogin}>
            Login
          </button>
          <button type="button" class="btn btn-default btn-lg" onClick={this.handleRegister}>
            Register
          </button>
        </div>
      </form>
    )
  }
}

export default Login
