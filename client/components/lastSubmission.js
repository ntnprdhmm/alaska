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
              <th>minPE (Minimal Error Rate) </th>
              <td>{this.props.submission.errorRate}</td>
            </tr>
            <tr>
              <th>Missed Detection at 5% False Alarm Rate</th>
              <td>{this.props.submission.missRate}</td>
            </tr>
            <tr>
              <th>FP50 (False Positive rate at 50% Missed Detection)</th>
              <td>{this.props.submission.falseAlarmRate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default LastSubmission
