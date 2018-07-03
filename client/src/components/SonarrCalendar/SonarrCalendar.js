import React from 'react'
import settings from '../../settings.json'
import './SonarrCalendar.css'

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

  hasFile = downloaded => downloaded ? (
    <span style={{ fontSize: '10px', color: '#18D8F0' }}> Downloaded</span>
  ) : (
    <span style={{ fontSize: '10px', color: '#FF1493' }}> Waiting</span>
  )

  render() {
    return (
      <div className="col-wrapper sonarr-container">
        <ul className="list-dot_hidden sonarr-list">
           {this.state.series.map(serie => <li className="sonarr-serieitem" key={serie.id}>
              <p className="sonarr-seriename">{serie.series.title}</p>
              <div className="sonarr-serieinfo">
                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, .25)' }}>
                  {serie.airDate} S{serie.seasonNumber} E{serie.episodeNumber}
                </span>
                <span>{this.hasFile(serie.hasFile)}</span>
                {/* {JSON.stringify(serie.hasFile)} {serie.airDate} - {serie.series.title} */}
              </div>
           </li>)}
        </ul>
      </div>
    )
  }
}

export default SonarrCalendar
