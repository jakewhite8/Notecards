import React from 'react';
import { FAB } from '@rneui/themed';
import { View, Text } from 'react-native'


type AddButtonComponentProps = {
  onClick: () => void;
};

const AddButton: React.FunctionComponent<AddButtonComponentProps> = (props) => {
  return ( 
    <View>
      <FAB
        icon={{ name: 'add', color: 'white' }}
        color="green"
        onPress={() => props.onClick()}
      />
    </View>
  )
}

export { AddButton };