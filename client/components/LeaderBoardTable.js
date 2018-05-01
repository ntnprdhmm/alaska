import { h, Component } from 'preact'

class LeaderBoardTable extends Component {
  render () {
    return (
      <div>
        <div class="leaderboard-table table-responsive">
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th>Who</th>
                <th>Error Rate</th>
                <th>Miss Rate</th>
                <th>False Alarm Rate</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.submissions.map(submission => {
                  return (
                    <tr>
                      <td>{submission.User.email}</td>
                      <td>{submission.errorRate}</td>
                      <td>{submission.missRate}</td>
                      <td>{submission.falseAlarmRate}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default LeaderBoardTable
