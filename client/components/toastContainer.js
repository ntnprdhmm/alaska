import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reduce from '../reducer'
import * as actions from '../actions'

import Toast from './toast'

@connect(reduce, actions)
class ToastContainer extends Component {
  render() {
    return (
      <ul class="toasts">
        {
          this.props.toasts.map((toast, i) => {
            return <Toast key={i}
              toastKey={i}
              text={toast.text}
              type={toast.type}
              onClick={this.props.closeToast} />
          })
        }
      </ul>
    )
  }
}

export default ToastContainer
