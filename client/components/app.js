import { h, Component } from 'preact'

import Nav from './nav'
import Header from './header'
import About from './about'
import Download from './download'
import Footer from './footer'
import LeaderBoard from './leaderBoard'
import Submit from './submit'

import '../style/theme.css'

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
      </div>
    )
  }
}

export default App
