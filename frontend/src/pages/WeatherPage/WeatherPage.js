import React from 'react'
import './WeatherPage.css'
const WeatherPage = () => {
  return (
    <div>
      <div className="weather-widget">
        <a className="weatherwidget-io" href="https://forecast7.com/en/23d2677d41/bhopal/" data-label_1="BHOPAL" data-label_2="WEATHER" data-theme="dark" >BHOPAL WEATHER</a>
      </div>
      {/* External Website Embed */}
      <div className="external-website">
        <iframe 
          title="Weather Website"
          src="https://simple-weather-website.netlify.app/" 
          width="100%" 
          height="800"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  )
}

export default WeatherPage
