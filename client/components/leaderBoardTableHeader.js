import { h, Component } from 'preact'

class LeaderBoardTableHeader extends Component {
  render () {
    return (
      <th class="align-middle" onClick={this.props.onClick}>
        <div>
          <span class="oi oi-elevator"></span> {this.props.text}
        </div>
      </th>
    )
  }
}

export default LeaderBoardTableHeader
