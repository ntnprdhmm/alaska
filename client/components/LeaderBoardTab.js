import { h, Component } from 'preact'

class LeaderBoardTab extends Component {
  render () {
    return (
      <div class={`leaderboard-tab ${this.props.active ? 'leaderboard-tab--active' : ''}`}
        onClick={this.props.onClick} >
        {this.props.text}
      </div>
    )
  }
}

export default LeaderBoardTab
