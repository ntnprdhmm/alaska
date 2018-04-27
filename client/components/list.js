import { h, Component } from 'preact'

class List extends Component {
  render() {
    return (
      <div>
        {this.props.text}
        <ul class="custom-list">
          {
            this.props.elements.map(element => {
              return <li class="custom-list-item">{element}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default List
