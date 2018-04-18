import { h, Component } from 'preact'
import ScrollableAnchor from 'react-scrollable-anchor'

class Header extends Component {
  render() {
    return (
      <header class="masthead">
        <ScrollableAnchor id="top">
          <div class="intro-body">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <h1 class="brand-heading">Alaska</h1>
                  <p class="intro-text">
                    A free, responsive, one page Bootstrap theme.
                    <br />
                    Created by Start Bootstrap.
                  </p>
                  <a href="#about" class="btn btn-circle js-scroll-trigger">
                    <span class="oi oi-chevron-bottom" title="chevron-bottom"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollableAnchor>
      </header>
    )
  }
}

export default Header
