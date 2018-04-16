import { h, Component } from 'preact'

class Toast extends Component {
  render() {
    return (
      <li class={`toast toast--${this.props.type || 'success'}`}
          onClick={_ => this.props.onClick(this.props.toastKey)}>
        {this.props.text}
      </li>
    )
  }
}

export default Toast
