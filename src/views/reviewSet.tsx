import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { Text, View, ScrollView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useState } from 'react';
import {
  Card,
  Dialog,
  Icon
} from '@rneui/themed';
import NotecardDialog from '../components/notecardDialog'

const styles = GlobalStyles

type ReviewSetProps = NativeStackScreenProps<StackParamList, 'ReviewSet'>;

function ReviewSet( { navigation }: ReviewSetProps) {
  const { state, dispatch } = useAppState();
  const [notecards, setNotecards] = useState(state.newNotecardSet.notecards)
  const title = state.newNotecardSet.title;

  const [dialogVisibilities, setDialogVisibilities] = useState(Array(notecards.length).fill(false));
  const toggleDialog = (index: number) => {
    const updatedVisibilities = [...dialogVisibilities];
    updatedVisibilities[index] = !updatedVisibilities[index];
    setDialogVisibilities(updatedVisibilities);
  };

  const updateNotecards = (index: number, notecard: [string, string]) => {
    const updatedNotecards = [...notecards];
    updatedNotecards[index] = notecard
    setNotecards(updatedNotecards)
    dispatch({
      type: 'UPDATE_NEW_NOTECARDSET',
      payload: {
        title: title,
        notecards: updatedNotecards
      }
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Text>Review Set</Text>
          <Text>Title: {title}</Text>
          {notecards.map((notecard, i) => (
            <View key={i}>
              <Card
                containerStyle={styles.card}>
                <Card.Title>
                  <Text>Card: {i + 1}</Text>
                  <Icon
                    name="edit"
                    type="entypo"
                    color="blue"
                    size={20}
                    onPress={() => toggleDialog(i)}
                  />
                </Card.Title>
                <Card.Divider />
                <Text>Front:</Text>
                <Text>{notecard[0]}</Text>
                <Card.Divider />
                <Text>Back:</Text>
                <Text>{notecard[1]}</Text>
              </Card>
              <NotecardDialog
                notecard={notecard}
                notecardIndex={i}
                isVisible={dialogVisibilities[i]}
                toggleDialog={() => toggleDialog(i)}
                updateNotecardsFunction={(updatedNotecard: [string, string]) => updateNotecards(i, updatedNotecard)}/>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default ReviewSet