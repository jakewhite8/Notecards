import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useTheme } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import AnalyticTextField from '../components/analyticTextField';
import SampleActivityData from '../helpers/SampleActivityData';

const styles = GlobalStyles;
const sampleData = SampleActivityData;

type ActivityProps = NativeStackScreenProps<StackParamList, 'Activity'>;

function Activity( { navigation, route }: ActivityProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();

  return (
    <View style={{backgroundColor: theme.colors.secondaryBackground, flex: 1}}>
        <View style={{ flexDirection:'row'} }>
          <View style={{flex: 0.33}}>
            <AnalyticTextField title="Total Cards Viewed" value={sampleData.cardsViewed}/>
          </View>
          <View style={{flex: 0.33}}>
            <AnalyticTextField title="Current View Streak" value={sampleData.currentViewStreak}/>
          </View>
          <View style={{flex: 0.33}}>
            <AnalyticTextField title="Longest View Streak" value={sampleData.longestViewSteak}/>
          </View>
        </View>
    </View> 
  )
}

export default Activity;