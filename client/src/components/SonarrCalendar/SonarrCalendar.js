import React from 'react'
import settings from '../../settings.json'

type State = {
  series: Array
}

class SonarrCalendar extends React.Component<{}, State> {
  state = {
    series: []
  }

  componentDidMount = () => {
    // Gets the series scheduled to air today and tomorrow, dates can be provided if needed.
    // https://github.com/Sonarr/Sonarr/wiki/Calendar
    fetch(`http://${settings.sonarrIp}:8989/api/calendar?apikey=${settings.sonarrKey}`)
      .then(res => res.json())
      .then(series => this.setState({ series }))
  }

  render() {
    return (
      <div className="col-wrapper">
        <ul>
          {this.state.series.map(serie => <li key={serie.id}>
            {serie.hasFile} {serie.airDate} - {serie.series.title} - {serie.overview}
          </li>)}
        </ul>
      </div>
    )
  }
}

export default SonarrCalendar
