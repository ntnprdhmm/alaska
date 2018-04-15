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

import '../style/theme.css'

@connect(reduce, actions)
class App extends Component {
  render({n}, {}) {
    return (
      <div class="main-container">
        <Nav />
        <Header />
        <About />
        <Download />
        <Submit />
        <LeaderBoard />
        <Footer />
      </div>
    )
  }
}

export default App
