import React from 'react'
import Moment from 'moment'
import settings from '../../settings.json'
import './SonarrCalendar.css'

type State = {
  series: Array
}

type Props = {
  updateInterval: number,
  daysForward: number
}

class SonarrCalendar extends React.Component<Props, State> {
  state = {
    series: []
  }

  componentDidMount = () => {
    this.fetchSonarrCalendar()
    setInterval(() => {
      this.fetchSonarrCalendar()
    }, this.props.updateInterval * (60 * 1000))
  }

  fetchSonarrCalendar = () => {
    // Gets the series scheduled to air today and tomorrow, dates can be provided if needed.
    // https://github.com/Sonarr/Sonarr/wiki/Calendar
    let fetchString = `http://${settings.sonarrIp}:8989/api/calendar?apikey=${settings.sonarrKey}`
    if (this.props.daysForward !== null) {
      const today = Moment(new Date())
      const stopDate = Moment(today).add(this.props.daysForward, 'days')
      fetchString += `&start=${today.format('YYYY-MM-DD')}&end=${stopDate.format('YYYY-MM-DD')}`
    }
    fetch(fetchString)
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
        {this.state.series.length === 0 ?
          <p>No upcoming series in {this.props.daysForward} days..</p> :
          (
            this.state.series.map(serie =>
              <div className="sonarr-serieinfo" key={serie.id}>
                <p className="sonarr-seriename">{serie.series.title}</p>
                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, .25)' }}>
                  {serie.airDate} S{serie.seasonNumber} E{serie.episodeNumber}
                </span>
                <span>{this.hasFile(serie.hasFile)}</span>
                {/* {JSON.stringify(serie.hasFile)} {serie.airDate} - {serie.series.title} */}
              </div>
            )
          )
        }
      </div>
    )
  }
}

SonarrCalendar.defaultProps = {
  updateInterval: 5,
  daysForward: null
}

export default SonarrCalendar
