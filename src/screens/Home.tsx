import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { currentWeather } from '../data/CurrentWeather'
import HomeBackground from '../components/HomeBackground'
import WeatherInfo from '../components/section/WeatherInfo'
import ForecastSheet from '../components/sheets/ForecastSheet'
import WeatherTabBar from '../components/tabBar/WeatherTabBar'
import { ForecastSheetProvider } from '../context/ForecastSheetContext'

const Home = () => {
  return (
    <ForecastSheetProvider>
      <HomeBackground />
      <WeatherInfo weather={currentWeather} />
      <ForecastSheet />
      <WeatherTabBar />
    </ForecastSheetProvider>
  )
}

export default Home

const styles = StyleSheet.create({})