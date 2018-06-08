import { h, Component } from 'preact'

import logo from '../images/utt_logo.png'

class Footer extends Component {
  render() {
    return (
      <footer class="text-center">
        <div class="container">
          <a target="_blank" href="http://www.utt.fr/en/index.html">
            <img src={logo} class="img-fluid" alt="utt logo" />
          </a>
          <span class="float-right disclaimers">
            <a target="_blank" href="disclaimers.html">disclaimers</a>
          </span>
        </div>
      </footer>
    )
  }
}

export default Footer
