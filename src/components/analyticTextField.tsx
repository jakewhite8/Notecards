import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';

type AnalyticTextFieldComponentProps = {
  title: string;
  value: string;
};

const AnalyticTextField: React.FunctionComponent<AnalyticTextFieldComponentProps> = (props) => {
  const styles = GlobalStyles;
  const { theme } = useTheme();

  return(
    <View>
      <Text style={{color: theme.colors.primaryText}}>{props.title}</Text>
      <Text style={{color: theme.colors.primaryText}}>{props.value}</Text>
    </View>
  )
}

export default AnalyticTextField