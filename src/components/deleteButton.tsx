import React from 'react';
import { FAB } from '@rneui/themed';
import { View } from 'react-native'


type DeleteButtonComponentProps = {
  onClick: () => void;
};

const DeleteButton: React.FunctionComponent<DeleteButtonComponentProps> = (props) => {
  return ( 
    <View style={{marginRight: 10}}>
      <FAB
        icon={{ name: 'delete', color: 'white' }}
        color="red"
        size={'small'}
        onPress={() => props.onClick()}
      />
    </View>
  )
}

export default DeleteButton;