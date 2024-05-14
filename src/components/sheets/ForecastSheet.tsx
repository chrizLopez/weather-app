import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import ForecastSheetBackground from './ForecastSheetBackground';
import useApplicationDimensions from '../../hooks/useApplicationDimensions';
import ForecastControl from './elements/ForecastControl';
import Separator from './elements/Separator';
import ForeacastCapsule from '../forecast/ForecastCapsule';
import { hourly, weekly } from '../../data/ForecastData';
import ForecastScroll from '../forecast/ForecastScroll';
import { ForecastType } from '../../models/Weather';
import AirQualityWidget from '../forecast/widgets/AirQualityWidget';
import FeelsLikeWidget from '../forecast/widgets/FeelsLikeWidget';
import PressureWidget from '../forecast/widgets/PressureWidget';
import RainfallWidget from '../forecast/widgets/RainfallWidget';
import SunriseWidget from '../forecast/widgets/SunriseWidget';
import UvIndexWidget from '../forecast/widgets/UvIndexWidget';
import VisibilityWidget from '../forecast/widgets/VisibilityWidget';
import WindWidget from '../forecast/widgets/WindWidget';

const ForecastSheet = () => {
  const snapPoints = ['38.5%', '83%'];
  const {width, height} = useApplicationDimensions();
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const cornerRadius = 44;
  const capsuleRadius = 30;
  const capsuleHeight = height * 0.17;
  const capsuleWidth = width * 0.15;
  const [selectedForeacastType, setSelectedForeacastType] = useState<ForecastType>(ForecastType.Hourly);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleIndicatorStyle={styles.bottomSheeHandleIndicator}
      backgroundComponent={() => (
        <ForecastSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius} />
      )}
      >
        <>
          <ForecastControl onPress={setSelectedForeacastType} />
          <Separator height={3} width={width} />
          <ForecastScroll
            capsuleWidth={capsuleWidth}
            capsuleHeight={capsuleHeight}
            capsuleRadius={capsuleRadius}
            forecasts={selectedForeacastType === ForecastType.Hourly ? hourly : weekly}
          />
          <View style={styles.sheetDetails}>
            {/* <AirQualityWidget width={300} height={150} /> */}
            {/* <FeelsLikeWidget width={300} height={150} /> */}
            {/* <PressureWidget width={300} height={150} /> */}
            {/* <RainfallWidget width={300} height={150} /> */}
            {/* <SunriseWidget width={300} height={150} /> */}
            {/* <UvIndexWidget width={300} height={150} /> */}
            {/* <VisibilityWidget width={300} height={150} /> */}
            <WindWidget width={300} height={300} />
          </View>
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
  },
  sheetDetails: {
    flex: 1,
    padding: 30,
    paddingBottom: 50,
  }
})