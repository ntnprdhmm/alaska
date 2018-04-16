import { h, Component } from 'preact'

class Register extends Component {
  render() {
    return (
      <form class="modal-form">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" placeholder="Enter your email" />
          <small id="email" class="form-text text-muted">
            A confirmation email will be sent at this address
          </small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Choose a password" />
        </div>
        <button type="button" class="btn btn-default btn-lg btn-center">Submit</button>
      </form>
    )
  }
}

export default Register
