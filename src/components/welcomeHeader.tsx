import React from 'react';
import { View, Text } from 'react-native'
import { useAppState } from '../context/GlobalState';


type WelcomeComponentProps = {};

const Welcome: React.FunctionComponent<WelcomeComponentProps> = () => {
  const { state } = useAppState();

  return ( 
    <View>
      {state.user ? (
        <Text>Welcome, {state.user.name}!</Text>
      ) : (
        <Text>Please log in</Text>
      )}
    </View>
  )
}

export default Welcome;