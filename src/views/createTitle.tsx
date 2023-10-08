import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, TextInput } from 'react-native';
import { StackParamList } from '../types/DataTypes';
import GlobalStyles from '../styles/GlobalStyles';
import { Input as BaseInput } from '@rneui/base';
import {
  Input,
  InputProps,
  Icon,
} from '@rneui/themed';
import { useAppState } from '../context/GlobalState';

type CreateProps = NativeStackScreenProps<StackParamList, 'CreateTitle'>

const styles = GlobalStyles;

function CreateTitle ({ navigation }: CreateProps) {
  const [newTitle, setTitle] = useState('');
  const { state, dispatch } = useAppState();

  interface WrappedInputProps extends InputProps {
    ref?: React.RefObject<TextInput & BaseInput>;
  }
  const inputProps = {}

  const submitNotecardSetTitle = () => {
    dispatch({
      type: 'UPDATE_NEW_NOTECARDSET',
      payload: {
        title: newTitle,
        notecards: state.newNotecardSet.notecards
      }
    })
    navigation.navigate('CreateCard', {cardTitle: newTitle})
  }

  return (
    <View style={styles.container}>
      <Text>{newTitle}</Text>
      <Input
        {...(inputProps as WrappedInputProps)}
        rightIcon={
          <Icon
            name="chevron-right"
            type="entypo"
            color="#86939e"
            size={25}
            onPress={submitNotecardSetTitle}
          />
        }
        label="New Notecard Set"
        containerStyle={{ width: '90%' }}
        placeholder="Name"
        style={styles.inputFieldsStyle}
        onChangeText={(title) => setTitle(title)}
      />
    </View>
  )
}

export default CreateTitle;