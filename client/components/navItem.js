import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reduce from '../reducer'
import * as actions from '../actions'

@connect(reduce, actions)
class navItem extends Component {
  closeSideNav () {
    if (this.props.showSideNav) {
      this.props.toggleSideNav()
    }
  }
  render({showSideNav}, {}) {
    return (
      <li class="nav-item">
        <a class="nav-link" href={`#${this.props.itemId}`} onClick={this.closeSideNav.bind(this)}>
          {this.props.text}
        </a>
      </li>
    )
  }
}

export default navItem
