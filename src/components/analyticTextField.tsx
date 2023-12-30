import React from 'react';
import { View, Text } from 'react-native';
import { Card, useTheme } from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';

type AnalyticTextFieldComponentProps = {
  title: string;
  value: number;
};

const AnalyticTextField: React.FunctionComponent<AnalyticTextFieldComponentProps> = (props) => {
  const styles = GlobalStyles;
  const { theme } = useTheme();

  return(
    <Card
      containerStyle={{backgroundColor: theme.colors.primaryBackground}}>
      <View>
        <Card.Title style={{color: theme.colors.primaryText}}>{props.title}</Card.Title>
      </View>
      <View style={{alignItems:'center'}}>
        <Text style={{color: theme.colors.primaryText}}>{props.value}</Text>
      </View>
    </Card>
  )
}

export default AnalyticTextField