import { LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Canvas, Line, LinearGradient, vec } from '@shopify/react-native-skia';

const ForecastControl = () => {
  const [textWidth, setTextWidth] = useState(0);
  const onTextLayout = (e: LayoutChangeEvent) => {
    setTextWidth(e.nativeEvent.layout.width);
  };  
  const spacingX = 32;
  const strokeWidth = 3;

  return (
    <>
      <View style={styles.forecastView}>
        <TouchableOpacity>
          <Text onLayout={onTextLayout} style={styles.forecastText}>Hourly Forecast</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forecastText}>Weekly Forecast</Text>
        </TouchableOpacity>
      </View>
      <Canvas style={{height: strokeWidth, width: textWidth, marginLeft: spacingX}}>
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
      </Canvas>
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