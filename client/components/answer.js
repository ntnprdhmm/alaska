import { h, Component } from 'preact'

class Answer extends Component {
  render () {
    console.log(this.props.submission)
    return (
      <div>
        {this.props.submission ? this.props.submission.id : -1}
      </div>
    )
  }
}

export default Answer
