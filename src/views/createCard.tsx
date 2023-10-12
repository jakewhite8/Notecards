import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { Text, View, TextInput } from 'react-native';
import { Input as BaseInput } from '@rneui/base';
import {
  Card,
  Input,
  InputProps,
  Button
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';

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
  const { state, dispatch } = useAppState();

  const addCard = () => {
    const existingTitle = state.newNotecardSet.title
    let newNotecards: Array<[string, string]> = []
    // Make deep copy of New Notecards
    for (let i = 0; i < state.newNotecardSet.notecards.length; i++) {
      newNotecards[i] = state.newNotecardSet.notecards[i]
    }
    newNotecards.push([frontNotecardString, backNotecardString])
    dispatch({
      type: 'UPDATE_NEW_NOTECARDSET',
      payload: {
        title: existingTitle,
        notecards: newNotecards
      }
    })

    // Reset input fields
    setFrontNotecard('');
    setBackNotecard('');
  }

  return (
    <View style={styles.container}>
      <Text>Create Card</Text>
      <Text>{notecardTitle}</Text>
      <Text>State Title</Text>
      <Text>{state.newNotecardSet.title}</Text>
      <Card
        containerStyle={styles.card}>
        <Card.Title>Front of Notecard</Card.Title>
        <Card.Divider />
        <Input
          {...(inputProps as WrappedInputProps)}
          containerStyle={{ width: '90%' }}
          style={styles.inputFieldsStyle}
          onChangeText={setFrontNotecard}
          value={frontNotecardString}
        />
      </Card>
      <Card
        containerStyle={styles.card}>
        <Card.Title>Back of Notecard</Card.Title>
        <Card.Divider />
        <Input
          value={backNotecardString}
          {...(inputProps as WrappedInputProps)}
          containerStyle={{ width: '90%' }}
          style={styles.inputFieldsStyle}
          onChangeText={setBackNotecard}
        />
      </Card>
      {frontNotecardString.length > 0 && (<Text>Front: {frontNotecardString}</Text>)}
      {backNotecardString.length > 0 && (<Text>Back: {backNotecardString}</Text>)}
      <Button
        title="Review Set"
        containerStyle={styles.button}
        onPress={() => navigation.navigate('ReviewSet')}/>
      <Button
        title="Next Card"
        containerStyle={styles.button}
        onPress={addCard} />
    </View>
  )
}

export default CreateCard;