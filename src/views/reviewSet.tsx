import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { Text, View } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useState } from 'react';
import {
  Button,
  Dialog
} from '@rneui/themed';
import NotecardDialog from '../components/notecardDialog'

const styles = GlobalStyles

type ReviewSetProps = NativeStackScreenProps<StackParamList, 'ReviewSet'>;

function ReviewSet( { navigation }: ReviewSetProps) {
  const { state, dispatch } = useAppState();
  const notecards = state.newNotecardSet.notecards;
  const title = state.newNotecardSet.title;

  const [dialogVisibilities, setDialogVisibilities] = useState(Array(notecards.length).fill(false));
  const toggleDialog = (index: number) => {
    const updatedVisibilities = [...dialogVisibilities];
    updatedVisibilities[index] = !updatedVisibilities[index];
    setDialogVisibilities(updatedVisibilities);
  };

  return (
    <View style={styles.container}>
      <Text>Review Set</Text>
      <Text>Title: {title}</Text>
      {notecards.map((notecard, i) => (
        <View key={i}>
          <Button
            buttonStyle={{backgroundColor: 'white'}}
            onPress={() => toggleDialog(i)}>
            <Text>Card: {i + 1}</Text>
            <Text>Front: {notecard[0]}</Text>
            <Text>Back: {notecard[1]}</Text>
          </Button>
          <NotecardDialog
            notecard={notecard}
            notecardIndex={i}
            isVisible={dialogVisibilities[i]}
            toggleDialog={() => toggleDialog(i)}/>
        </View>
      ))}
    </View>
  )
}

export default ReviewSet