import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { currentWeather } from '../data/CurrentWeather'
import HomeBackground from '../components/HomeBackground'
import WeatherInfo from '../components/section/WeatherInfo'
import ForecastSheet from '../components/sheets/ForecastSheet'
import WeatherTabBar from '../components/tabBar/WeatherTabBar'

const Home = () => {
  return (
    <>
        <HomeBackground />
        <WeatherInfo weather={currentWeather} />
        <ForecastSheet />
        <WeatherTabBar />
    </>
  )
}

export default Home

const styles = StyleSheet.create({})