import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Card, useTheme } from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';

type AnalyticTextFieldComponentProps = {
  title: string;
  value: number;
  loading: boolean;
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
        {props.loading ?
          <ActivityIndicator size="small" color={theme.colors.primaryText} />
        :
          <Text style={{color: theme.colors.primaryText}}>{props.value}</Text>
        }
      </View>
    </Card>
  )
}

export default AnalyticTextField