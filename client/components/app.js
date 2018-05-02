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

import '../style/theme.css'
import '../style/form.css'
import '../style/toast.css'
import '../style/modal.css'
import '../style/timeline.css'

@connect(reduce, actions)
class App extends Component {
  componentDidMount() {
    // check if there is a verification or reset token in the URI
    const queryString = window.location.href.split('?')[1] || ''
    const tokenRegex = new RegExp(/^token/)
    const resetTokenRegex = new RegExp(/^reset_token/)
    const token = queryString.split('&').filter(p => p.match(tokenRegex))
    const resetToken = queryString.split('&').filter(p => p.match(resetTokenRegex))
    if (token.length) {
      this.props.sendVerificationtToken(token[0].split('=')[1])
    }
    if (resetToken.length) {
      this.props.handleResetToken(resetToken[0].split('=')[1])
    }
    // check if there is a jwt in localStorage
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      this.props.loginBack(jwt)
    }
    // get the previous submission from localStorage
    const sub = localStorage.getItem('lastSubmission')
    if (sub) {
      this.props.loadLastSubmission(JSON.parse(sub))
    }
  }
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

export default App
