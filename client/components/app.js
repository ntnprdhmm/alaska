import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import reduce from '../reducer'
import * as actions from '../actions'

@connect(reduce, actions)
class App extends Component {
  render({n}, {}) {
    return (
      <div>
        <h1>yolo {n}</h1>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.remove}>-</button>
      </div>
    )
  }
}

export default App
