import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Weather } from '../../models/Weather';
import { DEGREE_SYMBOL } from '../../utils/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { useForecastSheetPosition } from '../../context/ForecastSheetContext';

interface WeatherInfoProps {
  weather: Weather;
};

const WeatherInfo = ({weather}: WeatherInfoProps) => {
  const { city, temperature, condition, high, low } = weather;
  const {top} = useSafeAreaInsets();
  const topMargin = 51;
  const weatherInfoMargin = top + topMargin;

  const animatedPosition = useForecastSheetPosition();

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, -topMargin],
            'clamp'
          )
        }
      ]
    }
  });

  const animatedTempTextStyle = useAnimatedStyle(() => {
    const fontFamily = animatedPosition.value === 0.5 ? 'SF-Semibold' : 'SF-Thin';
    return {
      fontFamily,
      fontSize: interpolate(animatedPosition.value, [0, 1], [92, 20]),
      lineHeight: interpolate(animatedPosition.value, [0, 1], [96, 20]),
      color: interpolateColor(animatedPosition.value, [0, 1], ['white', 'rgba(235, 235, 245, 0.6)'])
    };
  });

  const animatedMinMaxTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedPosition.value, [0, 0.5], [1, 0])
    };
  });

  const animatedSeparatorTextStyle = useAnimatedStyle(() => {
    const display = animatedPosition.value > 0.5 ? 'flex' : 'none';
    return {
      display,
      opacity: interpolate(animatedPosition.value, [0, 0.5, 1], [0, 0, 1]),
    };
  });

  const animatedTextConditionStyle = useAnimatedStyle(() => {
    const flexDirection = animatedPosition.value > 0.5 ? 'row' : 'column';
    return {
      flexDirection,
    }
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: interpolate(animatedPosition.value, [0, 0.5, 1], [0, -20, 0])}]
    }
  });

  return (
    <Animated.View style={[{alignItems: 'center', marginTop: weatherInfoMargin}, animatedViewStyle]}>
      <Animated.Text style={styles.cityTxt}>{city}</Animated.Text>
      <Animated.View style={[{alignItems: 'center'}, animatedTextConditionStyle]}>
        <Animated.View style={[{flexDirection: 'row'}]}>
          <Animated.Text style={[styles.temperatureTxt, animatedTempTextStyle]}>{temperature}{DEGREE_SYMBOL}</Animated.Text>
          <Animated.Text style={[styles.separatorText, animatedSeparatorTextStyle]}> | </Animated.Text>
        </Animated.View>
        <Animated.Text style={[styles.conditionTxt, animatedTextStyle]}>{condition}</Animated.Text>
      </Animated.View>
      <Animated.Text style={[styles.minMaxTxt, animatedMinMaxTextStyle]}>H: {high}{DEGREE_SYMBOL} L: {low}{DEGREE_SYMBOL}</Animated.Text>
    </Animated.View>
  )
}

export default WeatherInfo

const styles = StyleSheet.create({
  temperatureTxt: {
    fontFamily: 'SF-Thin',
    fontSize: 96,
    color: 'white',
    lineHeight: 96,
  },
  cityTxt: {
    fontFamily: 'SF-Regular',
    color: 'white',
    fontSize: 34,
    lineHeight: 41,
  },
  separatorText: {
    fontFamily: 'SF-Semibold',
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 20,
    lineHeight: 20,
    marginHorizontal: 2,
    display: 'none',
  },
  conditionTxt: {
    fontFamily: 'SF-Semibold',
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 20,
    lineHeight: 20,
  },
  minMaxTxt: {
    fontFamily: 'SF-Semibold',
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
  }
})