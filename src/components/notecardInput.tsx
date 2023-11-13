import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Input as BaseInput } from '@rneui/base';
import {
  Card,
  Input,
  InputProps,
  useTheme
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';

type NotecardInputComponentProps = {
  value: string;
  cardSide: string;
  onChangeFunction: Dispatch<SetStateAction<string>>;
};

const NotecardInput: React.FunctionComponent<NotecardInputComponentProps> = (props) => {
  const styles = GlobalStyles;
  const { theme } = useTheme();

  interface WrappedInputProps extends InputProps {
    ref?: React.RefObject<TextInput & BaseInput>;
  }
  const inputProps = {}

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return(
    <Card
      containerStyle={[styles.card, {backgroundColor: theme.colors.primaryBackground, marginTop: props.cardSide == 'front' ? 20 : 10}]}
      wrapperStyle={styles.cardWrapper}>
      <View style={styles.cardTitle}>
        <Card.Title style={{color: theme.colors.primaryText}}>{capitalizeFirstLetter(props.cardSide)} of Notecard</Card.Title>
        <Card.Divider />
      </View>
      <View style={styles.cardCreateBody}>
        <Input
          multiline
          {...(inputProps as WrappedInputProps)}
          containerStyle={styles.inputFieldsContainer}
          style={[styles.inputFieldsStyle, { color: theme.colors.primaryText }]}
          onChangeText={props.onChangeFunction}
          placeholder={`Insert contents of the ${props.cardSide} notecard here`}
          placeholderTextColor={theme.colors.secondaryText}
          inputContainerStyle={{ borderColor: theme.colors.primaryBackground, height: '100%' }}
          value={props.value}
        />
      </View>
    </Card>
  )
}

export default NotecardInput