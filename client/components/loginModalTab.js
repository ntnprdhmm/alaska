import { h, Component } from 'preact'

class LoginModalTab extends Component {
  render() {
    return (
      <div class={`col-md text-center login-modal-tab ${this.props.active === this.props.tabName ? 'active' : ''}`}
           onClick={_ => this.props.onClick(this.props.tabName)}>
        <h2 class="login-modal-tab-title">{this.props.text}</h2>
      </div>
    )
  }
}

export default LoginModalTab
