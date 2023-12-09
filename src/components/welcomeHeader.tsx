import React from 'react';
import { View, Text } from 'react-native'
import { useAppState } from '../context/GlobalState';
import { useTheme } from '@rneui/themed';

type WelcomeComponentProps = {};

const Welcome: React.FunctionComponent<WelcomeComponentProps> = () => {
  const { state } = useAppState();
  const { theme } = useTheme();

  return ( 
    <View>
      {state.user ? (
        <Text style={{color: theme.colors.primaryText}}>Welcome, {state.user.name}!</Text>
      ) : (
        <Text style={{color: theme.colors.primaryText}}>Please log in</Text>
      )}
    </View>
  )
}

export default Welcome;