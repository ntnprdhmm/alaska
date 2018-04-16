import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reduce from '../reducer'
import * as actions from '../actions'

import Nav from './nav'
import Header from './header'
import About from './about'
import Download from './download'
import Footer from './footer'
import LeaderBoard from './leaderBoard'
import Submit from './submit'
import LoginModal from './loginModal'
import ToastContainer from './toastContainer'

import '../style/theme.css'
import '../style/form.css'
import '../style/toast.css'

@connect(reduce, actions)
class App extends Component {
  render() {
    return (
      <div class="main-container">
        <Nav />
        <Header />
        <About />
        <Download />
        <Submit />
        <LeaderBoard />
        <Footer />
        <ToastContainer />
        {this.props.showLoginModal ? <LoginModal /> : null}
      </div>
    )
  }
}

export default App
