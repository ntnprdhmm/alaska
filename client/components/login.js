import { h, Component } from 'preact'

class Login extends Component {
  render() {
    return (
      <form class="modal-form">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" />
        </div>
        <div class="login-btn-group">
          <button type="button" class="btn btn-default btn-lg">Login</button>
          <button type="button" class="btn btn-default btn-lg">Register</button>
        </div>
      </form>
    )
  }
}

export default Login
