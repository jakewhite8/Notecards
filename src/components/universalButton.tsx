import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import {
  Button,
  useTheme
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';

const styles = GlobalStyles;

type UniversalButtonProps = {
  title: string;
  children: React.ReactNode | undefined;
  onPressFunction: () => void;
};

const UniversalButton: React.FunctionComponent<UniversalButtonProps> = (props) => {
  const { theme } = useTheme();
  
  return (
    <Button 
      containerStyle={[styles.button, {backgroundColor: theme.colors.primaryBackground}]}
      onPress={props.onPressFunction}
      color={theme.colors.primaryButton}
      raised={true}
      >
      {props.title ?
        <Text style={[styles.buttonText, {color: theme.colors.primaryText}]}>{props.title}</Text>
      :
        <View>
          {props.children}
        </View>
      }
    </Button>
  )
}

export default UniversalButton;