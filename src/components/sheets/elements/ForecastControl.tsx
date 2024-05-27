import { LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Canvas, Line, LinearGradient, vec } from '@shopify/react-native-skia';
import { ForecastType } from '../../../models/Weather';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import useApplicationDimensions from '../../../hooks/useApplicationDimensions';

interface ForecastControlProps {
  onPress: (forecastType: ForecastType) => void; 
}

const ForecastControl = ({onPress}: ForecastControlProps) => {
  const {width} = useApplicationDimensions();
  const [textWidth, setTextWidth] = useState(0);
  const onTextLayout = (e: LayoutChangeEvent) => {
    setTextWidth(e.nativeEvent.layout.width);
  };  
  const spacingX = 32;
  const strokeWidth = 3;

  const segmentTranslateX = useSharedValue(0);
  const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);
  const animatedSementLineStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: segmentTranslateX.value}],
    };
  });

  const onForecastPress = (forecastType: ForecastType) => {
    if (forecastType === ForecastType.Weekly) {
      segmentTranslateX.value = withTiming(width - textWidth - spacingX * 2, {duration: 500});
    } else {
      segmentTranslateX.value = withTiming(0, {duration: 500});
    }
    onPress(forecastType);
  };
    

  return (
    <>
      <View style={styles.forecastView}>
        <TouchableOpacity onPress={() => onForecastPress(ForecastType.Hourly)}>
          <Text onLayout={onTextLayout} style={styles.forecastText}>Hourly Forecast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onForecastPress(ForecastType.Weekly)}>
          <Text style={styles.forecastText}>Weekly Forecast</Text>
        </TouchableOpacity>
      </View>
      <AnimatedCanvas style={[{height: strokeWidth, width: textWidth, marginLeft: spacingX}, animatedSementLineStyles]}>
        <Line
          p1={vec(0, 0)}
          p2={(vec(textWidth, 0))}
          strokeWidth={strokeWidth}
        >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(textWidth, 0)}
            colors={['rgba(147,112,117,0)', 'rgba(147,112,177,1)', 'rgba(147,112,117,0)']}
          />
        </Line>
      </AnimatedCanvas>
    </>
  )
}

export default ForecastControl

const styles = StyleSheet.create({
  forecastText: {
    fontFamily: 'SF-Semibold',
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(235,235,245,0.6)',
  },
  forecastView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  }
})