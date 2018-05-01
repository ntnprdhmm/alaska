import { h, Component } from 'preact'

class LeaderBoardTableHeader extends Component {
  render () {
    return (
      <th onClick={this.props.onClick}>
        <span class="oi oi-elevator"></span> {this.props.text}
      </th>
    )
  }
}

export default LeaderBoardTableHeader
