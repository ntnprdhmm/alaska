import { h, Component } from 'preact'

class Footer extends Component {
  render() {
    return (
      <footer>
        <div class="container">
          <span>Copyright &copy; Your Website 2018</span>
          <span class="float-right">
            <a target="_blank" href="disclaimers.html">disclaimers</a>
          </span>
        </div>
      </footer>
    )
  }
}

export default Footer
