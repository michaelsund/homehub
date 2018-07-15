import React from 'react'
import { JSMpeg } from 'jsmpeg-player'

class VideoStream extends React.Component<> {
  // canvasRef = React.createRef()
  componentDidMount = () => {
    const yup = document.getElementById('videoCanvas')
    JSMpeg(yup, 'ws://192.168.1.2:9999')
  }

  render() {
    return (
      <div>
        <p>VideoStream!</p>
        <canvas id="videoCanvas" style={{ border: '1px solid' }}></canvas>
      </div>
    )
  }
}

export default VideoStream
