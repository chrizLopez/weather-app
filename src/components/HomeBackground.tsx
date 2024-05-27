import React from "react";
import { Image, ImageBackground, Platform, ScaledSize, StyleSheet, Text, View } from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import useApplicationDimensions from "../hooks/useApplicationDimensions";
import { useForecastSheetPosition } from "../context/ForecastSheetContext";
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";

const HomeBackground = () => {
  const dimensions = useApplicationDimensions();
  const {width, height} = dimensions;
  const myStyles = styles(dimensions);
  const smokeHeight = height * 0.6;
  const smokeOffsetY = height * 0.4;
  const animatedPosition = useForecastSheetPosition();
  const AnimatedImgBkg = Animated.createAnimatedComponent(ImageBackground);
  const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);
  const leftBkgColor = useSharedValue('#2e335a');
  const rightBkgColor = useSharedValue('#1c1b33');

  const bkgColors = useDerivedValue(() => {
    if (Platform.OS === 'ios') {
      leftBkgColor.value = interpolateColor(animatedPosition.value, [0, 1], ['#2e335a', '#422e5a']);
    } else {
      leftBkgColor.value = animatedPosition.value > 0.5 ? '#422e5a' : '#2e335a';
    }
    return [leftBkgColor.value, rightBkgColor.value]
  })

  const animatedImgBkgStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(animatedPosition.value, [0, 1], [0, -height], Extrapolation.CLAMP)
        },
      ],
    };
  });

  const animatedCanvasSmokeStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedPosition.value, [0, 0.1], [0, 1], Extrapolation.CLAMP),
    }
  });

  return (
    <View style={myStyles.container}>
      <Canvas style={{...StyleSheet.absoluteFillObject}}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={bkgColors} />
        </Rect>
      </Canvas>
      <AnimatedImgBkg
        source={require('../../assets/home/Background.png')}
        resizeMode="cover"
        style={[{height: '100%'}, animatedImgBkgStyles]}>
          <AnimatedCanvas 
            style={[{
              height: smokeHeight,
              ...StyleSheet.absoluteFillObject,
              top: smokeOffsetY
            }, animatedCanvasSmokeStyles]}>
            <Rect x={0} y={0} width={width} height={smokeHeight}>
              <LinearGradient
                start={vec(width/2, 0)}
                end={vec(width/2, smokeHeight)}
                colors={['rgba(58, 63, 84,0)', 'rgba(58, 63, 84, 1)']}
                positions={[-0.02, 0.54]} />
            </Rect>
          </AnimatedCanvas>
          <Image
            source={require('../../assets/home/House.png')}
            resizeMode="cover"
            style={myStyles.houseImg} />
      </AnimatedImgBkg>
    </View>
  );
};

export default HomeBackground;

const styles = ({width}: ScaledSize) => StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  houseImg: {
    width: width,
    height: width,
    ...StyleSheet.absoluteFillObject, top: '36%'
  },
  container: {...StyleSheet.absoluteFillObject}
});