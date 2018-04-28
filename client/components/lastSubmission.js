import { h, Component } from 'preact'

class LastSubmission extends Component {
  render () {
    if (!this.props.submission) {
      return <div />
    }
    const d = new Date(this.props.submission.createdAt)
    return (
      <div class="last-sub-container">
        <h4>Your last submission</h4>
        <table class="table table-striped table-dark table-hover">
          <tbody>
            <tr>
              <th>Time</th>
              <td>{d.toLocaleString()}</td>
            </tr>
            <tr>
              <th>False alarm rate</th>
              <td>{this.props.submission.falseAlarm}</td>
            </tr>
            <tr>
              <th>Miss rate</th>
              <td>{this.props.submission.miss}</td>
            </tr>
            <tr>
              <th>Error rate</th>
              <td>{this.props.submission.errorRate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default LastSubmission
