import { h, Component } from 'preact'

import LeaderBoardTableHeader from './leaderBoardTableHeader'

class LeaderBoardTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submissions: this.props.submissions,
      errorRate: false,
      missRate: false,
      falseAlarmRate: false
    }
    this.sortBy = this.sortBy.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ submissions: nextProps.submissions })
  }
  sortBy (property) {
    this.setState({
      submission: this.state.submissions.sort((a, b) => {
        return this.state[property]
          ? b[property] - a[property]
          : a[property] - b[property]
      }),
      errorRate: property === 'errorRate' ? !this.state.errorRate : false,
      missRate: property === 'missRate' ? !this.state.missRate : false,
      falseAlarmRate: property === 'falseAlarmRate' ? !this.state.falseAlarmRate : false
    })
  }
  render () {
    return (
      <div>
        <div class="leaderboard-table table-responsive">
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th>Who</th>
                <LeaderBoardTableHeader text={'Error Rate'}
                  onClick={_ => this.sortBy('errorRate')}/>
                <LeaderBoardTableHeader text={'Miss Rate'}
                  onClick={_ => this.sortBy('missRate')} />
                <LeaderBoardTableHeader text={'False Alarm Rate'}
                  onClick={_ => this.sortBy('falseAlarmRate')} />
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
