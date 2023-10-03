import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { Text, View, TextInput } from 'react-native';
import { Input as BaseInput } from '@rneui/base';
import {
  Card,
  Input,
  InputProps,
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';

type CreateCardProps = NativeStackScreenProps<StackParamList, 'CreateCard'>;

function CreateCard ({ navigation, route }: CreateCardProps) {
  const notecardTitle = route.params.cardTitle
  const styles = GlobalStyles;

  interface WrappedInputProps extends InputProps {
    ref?: React.RefObject<TextInput & BaseInput>;
  }
  const inputProps = {}
  const [frontNotecardString, setFrontNotecard] = useState('');
  const [backNotecardString, setBackNotecard] = useState('');


  return (
    <View style={styles.container}>
      <Text>Create Card</Text>
      <Text>{notecardTitle}</Text>
      <Card>
        <Card.Title>Front of Notecard</Card.Title>
        <Card.Divider />
        <Input
          {...(inputProps as WrappedInputProps)}
          containerStyle={{ width: '90%' }}
          style={styles.inputFieldsStyle}
          onChangeText={setFrontNotecard}
        />
      </Card>
      <Card>
        <Card.Title>Back of Notecard</Card.Title>
        <Card.Divider />
        <Input
          {...(inputProps as WrappedInputProps)}
          containerStyle={{ width: '90%' }}
          style={styles.inputFieldsStyle}
          onChangeText={setBackNotecard}
        />
      </Card>
      {frontNotecardString.length > 0 && (<Text>Front: {frontNotecardString}</Text>)}
      {backNotecardString.length > 0 && (<Text>Back: {backNotecardString}</Text>)}
    </View>
  )
}

export default CreateCard;