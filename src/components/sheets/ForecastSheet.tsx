import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import ForecastSheetBackground from './ForecastSheetBackground';
import useApplicationDimensions from '../../hooks/useApplicationDimensions';
import ForecastControl from './elements/ForecastControl';
import Separator from './elements/Separator';
import ForeacastCapsule from '../forecast/ForeacastCapsule';
import { hourly } from '../../data/ForecastData';
import ForecastScroll from '../forecast/ForecastScroll';

const ForecastSheet = () => {
  const snapPoints = ['38.5%', '83%'];
  const {width, height} = useApplicationDimensions();
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const cornerRadius = 44;
  const capsuleRadius = 30;
  const capsuleHeight = height * 0.17;
  const capsuleWidth = width * 0.15;

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleIndicatorStyle={styles.bottomSheeHandleIndicator}
      backgroundComponent={() => (
        <ForecastSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius} />
      )}
      >
        <>
          <ForecastControl />
          <Separator height={3} width={width} />
          <ForecastScroll capsuleWidth={capsuleWidth} capsuleHeight={capsuleHeight} capsuleRadius={capsuleRadius} forecasts={hourly}  />
        </>
    </BottomSheet>
  )
}

export default ForecastSheet

const styles = StyleSheet.create({
  bottomSheeHandleIndicator: {
    width: 84,
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
  }
})