import React from 'react';
import { FAB } from '@rneui/themed';
import { View } from 'react-native'


type AddButtonComponentProps = {
  onClick: () => void;
};

const AddButton: React.FunctionComponent<AddButtonComponentProps> = (props) => {
  return ( 
    <View style={{marginRight: 10}}>
      <FAB
        icon={{ name: 'add', color: 'white' }}
        color="green"
        size={'small'}
        onPress={() => props.onClick()}
      />
    </View>
  )
}

export default AddButton;