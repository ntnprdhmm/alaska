import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reduce from '../reducer'
import * as actions from '../actions'

import Nav from './nav'
import Header from './header'
import Rules from './rules'
import Acknowledgements from './acknowledgements'
import About from './about'
import Material from './material'
import Footer from './footer'
import LeaderBoard from './leaderBoard'
import Submit from './submit'
import LoginModal from './loginModal'
import ResetModal from './resetModal'
import ToastContainer from './toastContainer'
import Timeline from './timeline'

@connect(reduce, actions)
class Home extends Component {
  render() {
    return (
      <div class="main-container">
        <Nav />
        <Header />
        <About />
        <Timeline />
        <Material />
        <Rules />
        <Submit />
        <LeaderBoard />
        <Acknowledgements />
        <Footer />
        <ToastContainer />
        {this.props.showLoginModal ? <LoginModal /> : null}
        {this.props.showResetModal ? <ResetModal /> : null}
      </div>
    )
  }
}

export default Home
