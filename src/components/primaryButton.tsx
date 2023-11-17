import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import {
  Button,
  useTheme
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';

const styles = GlobalStyles;

type PrimaryButtonProps = {
  title?: string;
  children?: React.ReactNode | undefined;
  onPressFunction: () => void;
  loading?: boolean;
};

const PrimaryButton: React.FunctionComponent<PrimaryButtonProps> = (props) => {
  const { theme } = useTheme();
  
  return (
    <Button 
      containerStyle={styles.button}
      onPress={props.onPressFunction}
      color={theme.colors.primaryButton}
      loading={props.loading}
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

export default PrimaryButton;