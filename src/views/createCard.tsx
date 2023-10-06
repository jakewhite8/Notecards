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

  return (
    <View style={styles.container}>
      <Text>Create Card</Text>
      <Text>{notecardTitle}</Text>
      <Text>State Title</Text>
      <Text>{state.newNotecardSet.title}</Text>
      <Card>
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
      <Card>
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
        onPress={() => navigation.navigate('ReviewSet')}/>
      <Button
        title="Next Card"
        onPress={() => {
          setFrontNotecard('');
          setBackNotecard('');
        } } />
    </View>
  )
}

export default CreateCard;