import React from 'react'
import './TradfriBulbgroup.css'

type Props = {
  group: Array
}

class TradfriBulbgroup extends React.Component<Props> {
  bulbIconColor = status => status ? 'status-icon_on' : 'status-icon_off'

  componentWillReceiveProps = () => {
    console.log('bulbgroup component got new props')
  }

  render() {
    return (
      <div>
        <p>{this.props.group.name}</p>
        <ul className="list-dot_hidden">
          {this.props.group.bulbs.map(b => (
          <li
            key={b.instanceId}
            className={`status-icon ${this.bulbIconColor(b.status)}`}
          >
            <span>{b.name}</span>
          </li>))}
        </ul>
      </div>
    )
  }
}

export default TradfriBulbgroup
