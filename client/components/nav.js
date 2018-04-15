import { h, Component } from 'preact'

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
  render () {
    return (
      <nav class={`navbar navbar-expand-lg navbar-light fixed-top ${this.state.black && 'navbar-shrink'}`} id="mainNav">
        <div class="container">
          <a class="navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a>
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fa fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="#about">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="#dataset">Dataset</a>
              </li>
              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="#submit">Participate</a>
              </li>
              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="#leaderboard">LeaderBoard</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav
