import { h, Component } from 'preact'

import logo from '../images/utt_logo.png'

class Footer extends Component {
  render() {
    return (
      <footer class="text-center">
        <div class="container">
          <div>
            <a target="_blank" href="http://www.utt.fr/en/index.html">
            <img src={logo} class="img-fluid" alt="utt logo" />
          </a>
          </div>
          <div class="disclaimers">
            <a target="_blank" href="disclaimers.html">disclaimers</a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
