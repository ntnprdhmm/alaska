import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reduce from '../reducer'
import * as actions from '../actions'

import Login from './login'
import Register from './register'
import LoginModalTab from './loginModalTab'

import '../style/loginModal.css'

@connect(reduce, actions)
class LoginModal extends Component {
  constructor() {
    super()
    this.state = {
      tab: 'login'
    }
  }
  changeTab (nextTab) {
    this.setState({ tab: nextTab })
  }
  render () {
    return (
      <div class="login-modal-wrapper">
        <div class="login-modal">
          <div>
            <button class="btn btn-default btn-lg btn-icon close-icon" onClick={this.props.toggleLoginModal}>
              <i class="fa fa-close"></i>
            </button>
          </div>
          <div class="container">
            <div class="row login-modal-tabs">
              <LoginModalTab text='Login' active={this.state.tab} tabName='login' onClick={this.changeTab.bind(this)} />
              <LoginModalTab text='Register' active={this.state.tab} tabName='register' onClick={this.changeTab.bind(this)} />
            </div>
            <div class="row">
              {this.state.tab === 'register' ? <Register /> : <Login />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginModal
