import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reduce from '../reducer'
import * as actions from '../actions'

import '../style/loginModal.css'

@connect(reduce, actions)
class LoginModal extends Component {
  render() {
    return (
      <div class="login-modal-wrapper">
        <div class="login-modal">
          <div class="container">
            <button onClick={this.props.toggleLoginModal}>close</button>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginModal
