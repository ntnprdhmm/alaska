import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reduce from '../reducer'
import * as actions from '../actions'

import ResetForm from './resetForm'

@connect(reduce, actions)
class ResetModal extends Component {
  render () {
    return (
      <div class="custom-modal-wrapper">
        <div class="custom-modal">
          <button class="btn btn-default btn-lg btn-icon close-icon" onClick={this.props.toggleResetModal}>
            <i class="oi oi-x"></i>
          </button>
          <div class="container">
            <div class="form-wrapper">
              <ResetForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ResetModal
