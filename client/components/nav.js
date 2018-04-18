import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reduce from '../reducer'
import * as actions from '../actions'

import NavItem from './navItem'

@connect(reduce, actions)
class Nav extends Component {
  onScroll = () => {
    this.setState({
      black: window.pageYOffset >= 100
    })
  }
  componentDidMount () {
    addEventListener('scroll', this.onScroll)
  }
  componentWillUnmount () {
    removeEventListener('scroll', this.onScroll)
  }
  render ({showSideNav}, {}) {
    return (
      <nav class={`navbar navbar-expand-lg navbar-light fixed-top ${this.state.black ? 'navbar-shrink' : ''}`} id="mainNav">
          <a class="navbar-brand" href="#top">ALASKA</a>
          <button class="navbar-toggler navbar-toggler-right" onClick={this.props.toggleSideNav}>
            Menu
            <i class="fa fa-bars"></i>
          </button>
          <div class={`collapse navbar-collapse ${showSideNav ? 'show' : ''}`}>
            <ul class="navbar-nav mr-auto">
              <NavItem itemId='about' text='About' />
              <NavItem itemId='dataset' text='Dataset' />
              <NavItem itemId='submit' text='Participate' />
              <NavItem itemId='leaderboard' text='LeaderBoard' />
            </ul>
            <button onClick={this.props.toggleLoginModal} class="btn btn-outline-light" type="button">
              Login
            </button>
          </div>
      </nav>
    )
  }
}

export default Nav
