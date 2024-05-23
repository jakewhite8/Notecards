import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import GlobalStyles from '../styles/GlobalStyles';

const styles = GlobalStyles;

type LoadingComponentProps = {};

const Loading: React.FunctionComponent<LoadingComponentProps> = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return ( 
    <View style={[
        styles.container, 
        { backgroundColor: theme.colors.secondaryBackground }
      ]} >
      <Text style={{color:theme.colors.primaryText}}>{t('loading')}</Text>
      <ActivityIndicator size="large" color={theme.colors.primaryText}/>
    </View>
  )
}

export default Loading;