import { h, Component } from 'preact'

class Toast extends Component {
	componentDidMount() {
		const timer = setTimeout(_ => this.props.onClick(this.props.toastKey), 5000)
   	this.setState({ timer })
	}

	componentWillUnmount() {
   	clearInterval(this.state.timer)
	}

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
