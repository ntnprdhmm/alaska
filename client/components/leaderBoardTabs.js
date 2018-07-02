import { h, Component } from 'preact'

import LeaderBoardTab from './leaderBoardTab'

class LeaderBoardTabs extends Component {
  render () {
    return (
      <div class="leaderboard-tabs">
        <LeaderBoardTab text='Stage 1' active={this.props.activeTab === 1} onClick={this.props.onSwitch} />
        <LeaderBoardTab text='Stage 2' active={this.props.activeTab === 2} onClick={this.props.onSwitch} />
        <LeaderBoardTab text='Stage 3' active={this.props.activeTab === 3} onClick={this.props.onSwitch} />
      </div>
    )
  }
}

export default LeaderBoardTabs
