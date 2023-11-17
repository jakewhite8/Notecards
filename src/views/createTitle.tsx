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
  useTheme
} from '@rneui/themed';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';

type CreateProps = NativeStackScreenProps<StackParamList, 'CreateTitle'>

const styles = GlobalStyles;

function CreateTitle ({ navigation }: CreateProps) {
  const [newTitle, setTitle] = useState('');
  const { state, dispatch } = useAppState();
  const { theme } = useTheme();
  const {t, i18n} = useTranslation();

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
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <Text style={{color: theme.colors.primaryText}}>{newTitle}</Text>
      <Input
        {...(inputProps as WrappedInputProps)}
        rightIcon={
          <Icon
            name="chevron-right"
            type="entypo"
            color={theme.colors.primaryText}
            size={25}
            onPress={submitNotecardSetTitle}
          />
        }
        label={t('newNotecardSetTitle')}
        labelStyle={{color: theme.colors.primaryText}}
        containerStyle={{ width: '90%' }}
        placeholder={t('name')}
        style={[styles.inputFieldsStyle, {color: theme.colors.primaryText}]}
        onChangeText={(title) => setTitle(title)}
        inputContainerStyle={{borderColor:theme.colors.primaryText}}
        placeholderTextColor={theme.colors.secondaryText}
      />
    </View>
  )
}

export default CreateTitle;