import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useTheme } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes'
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import Welcome from '../components/welcomeHeader'
import AnalyticTextField from '../components/analyticTextField'

const styles = GlobalStyles;

type ActivityProps = NativeStackScreenProps<StackParamList, 'Activity'>;

function Activity( { navigation, route }: ActivityProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <Welcome />
      <AnalyticTextField value="hello" title="world"/>
    </View> 
  )
}

export default Activity;