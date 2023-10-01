import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, TextInput } from 'react-native';
import { useContext } from 'react';
import { UsernameReducerContext } from '../helpers/UsernameReducer';
import { StackParamList } from '../types/DataTypes';
import GlobalStyles from '../styles/GlobalStyles';
import { Input as BaseInput } from '@rneui/base';
import {
  Input,
  InputProps,
  Icon
} from '@rneui/themed';

type CreateProps = NativeStackScreenProps<StackParamList, 'Create'>

const styles = GlobalStyles;

function Create ({ navigation }: CreateProps) {
  const { UsernameState } = useContext(UsernameReducerContext);

  interface WrappedInputProps extends InputProps {
    ref?: React.RefObject<TextInput & BaseInput>;
  }
  const inputProps = {}

  return (
    <View style={styles.container}>
      <Input
        {...(inputProps as WrappedInputProps)}
        rightIcon={
          <Icon
            name="chevron-right"
            type="entypo"
            color="#86939e"
            size={25}
            onPress={() => navigation.navigate('Home')}
          />
        }
        label="New Notecard Set"
        containerStyle={{ width: '90%' }}
        placeholder="Name"
        style={styles.inputFieldsStyle}
      />
    </View>
  )
}

export default Create;