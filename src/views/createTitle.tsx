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
  Button
} from '@rneui/themed';

type CreateProps = NativeStackScreenProps<StackParamList, 'CreateTitle'>

const styles = GlobalStyles;

function CreateTitle ({ navigation }: CreateProps) {
  const [newTitle, setTitle] = useState('');

  interface WrappedInputProps extends InputProps {
    ref?: React.RefObject<TextInput & BaseInput>;
  }
  const inputProps = {}

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
            onPress={() => navigation.navigate('CreateCard', {cardTitle: newTitle})}
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