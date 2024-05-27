import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArcComponent from './elements/ArcComponent'
import useApplicationDimensions from '../../hooks/useApplicationDimensions';
import TabBarItems from './elements/TabBarItems';
import { BlurView } from 'expo-blur';
import { useForecastSheetPosition } from '../../context/ForecastSheetContext';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

const WeatherTabBar = () => {
  const tabBarHeight = 88;
  const {width, height} = useApplicationDimensions();
  const animatedPosition = useForecastSheetPosition();

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, tabBarHeight + 20]
          )
        }
      ]
    }
  });

  return (
    <Animated.View style={[{...StyleSheet.absoluteFillObject, top: height - tabBarHeight}, animatedViewStyle]}>
      <BlurView
        intensity={5}
        tint='light'
        style={{
          height: tabBarHeight,
          ...StyleSheet.absoluteFillObject
        }}>
        <ArcComponent height={tabBarHeight} width={width} />
        <TabBarItems />
      </BlurView>
    </Animated.View>
  )
}

export default WeatherTabBar;

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    backgroundColor: 'red',
  }
})