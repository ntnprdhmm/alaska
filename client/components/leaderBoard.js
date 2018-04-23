import { h, Component } from 'preact'
import ScrollableAnchor from 'react-scrollable-anchor'

class LeaderBoard extends Component {
  render() {
    return (
      <ScrollableAnchor id="leaderboard">
        <section class="content-section text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <h2>LeaderBoard</h2>
                <p>
                  As of date (dynamique) the current leaderbord is the following.
                  Note that you can click on column header to sort submissions according to the various scores.
                  However the one used for the "official" ranking is only the first one, MD005 (Missed detection for
                  False alarm of 0.05).
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default LeaderBoard
