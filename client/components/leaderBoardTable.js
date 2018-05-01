import { h, Component } from 'preact'

import LeaderBoardTableHeader from './leaderBoardTableHeader'

class LeaderBoardTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submissions: this.props.submissions,
      errorRate: false,
      missRate: false,
      falseAlarmRate: false,
      emailFilter: ''
    }
    this.sortBy = this.sortBy.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ submissions: nextProps.submissions })
  }
  sortBy (property) {
    this.setState({
      submissions: this.state.submissions.sort((a, b) => {
        return this.state[property]
          ? b[property] - a[property]
          : a[property] - b[property]
      }),
      errorRate: property === 'errorRate' ? !this.state.errorRate : false,
      missRate: property === 'missRate' ? !this.state.missRate : false,
      falseAlarmRate: property === 'falseAlarmRate' ? !this.state.falseAlarmRate : false
    })
  }
  handleChange (e) {
    this.setState({
      emailFilter: e.target.value,
      submissions: this.props.submissions.filter(s => s.User.email.startsWith(e.target.value))
    })
  }
  render () {
    return (
      <div>
        <div class="leaderboard-table table-responsive">
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th>
                  <input type="text" class="form-control" value={this.state.emailFilter}
                    onInput={this.handleChange} />
                </th>
                <LeaderBoardTableHeader text={'Error Rate'}
                  onClick={_ => this.sortBy('errorRate')} />
                <LeaderBoardTableHeader text={'Miss Rate'}
                  onClick={_ => this.sortBy('missRate')} />
                <LeaderBoardTableHeader text={'False Alarm Rate'}
                  onClick={_ => this.sortBy('falseAlarmRate')} />
              </tr>
            </thead>
            <tbody>
              {
                this.state.submissions.map(submission => {
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
