import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reducer from '../reducer'
import * as actions from '../actions'
import ScrollableAnchor from 'react-scrollable-anchor'
import LeaderBoardTable from './leaderBoardTable'
import LeaderBoardTabs from './leaderBoardTabs'

@connect(reducer, actions)
class LeaderBoard extends Component {
  componentDidMount() {
    this.props.fetchSubmissions()
    this.handleSwitchTab = this.handleSwitchTab.bind(this)
  }
  handleSwitchTab() {
    this.props.switchLeaderboardTab()
  }
  render({activeTab, submissions1, submissions2, submissions3}, {}) {
    return (
      <ScrollableAnchor id="leaderboard">
        <section class="content-section text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 margin-auto">
                <h2 class="margin-auto">LeaderBoard</h2>
                <div class="text-justify">
                  <p>
                    As of date (dynamique) the current leaderbord is the following.
                    Note that you can click on column headers to sort submissions according to the various scores.
                    However the one used for the "official" ranking is only the first one, MD005 (Missed detection for
                    False alarm of 0.05).
                  </p>
                </div>
              </div>
            </div>
            <LeaderBoardTabs activeTab={activeTab} onSwitch={this.handleSwitchTab} />
            <LeaderBoardTable submissions={activeTab === 1 ? submissions1 : activeTab === 2 ? submissions2 : submissions3} />
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default LeaderBoard
