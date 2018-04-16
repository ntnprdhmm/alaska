import { h, Component } from 'preact'

class Login extends Component {
  render() {
    return (
      <form class="modal-form">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password" />
        </div>
        <button type="button" class="btn btn-default btn-lg btn-center">Submit</button>
      </form>
    )
  }
}

export default Login
