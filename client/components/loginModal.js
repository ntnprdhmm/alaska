import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reduce from '../reducer'
import * as actions from '../actions'

import Login from './login'

import '../style/loginModal.css'

@connect(reduce, actions)
class LoginModal extends Component {
  render () {
    return (
      <div class="login-modal-wrapper">
        <div class="login-modal">
          <button class="btn btn-default btn-lg btn-icon close-icon" onClick={this.props.toggleLoginModal}>
            <i class="oi oi-x"></i>
          </button>
          <div class="container">
            <div class="form-wrapper">
              <Login />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginModal
