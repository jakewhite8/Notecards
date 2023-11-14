import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { 
  ScrollView,
  Text,
  View 
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useState } from 'react';
import {
  Icon,
  useTheme
} from '@rneui/themed';
import NotecardDialog from '../components/notecardDialog';
import NotecardEditable from '../components/notecardEditable';
import PrimaryButton from '../components/primaryButton';

const styles = GlobalStyles;

type ReviewSetProps = NativeStackScreenProps<StackParamList, 'ReviewSet'>;

function ReviewSet( { navigation }: ReviewSetProps) {
  const { state, dispatch } = useAppState();
  const { theme } = useTheme();
  const [notecards, setNotecards] = useState(state.newNotecardSet.notecards)
  const [character, setCharacter] = useState('none')
  const [characterCount, setCharacterCount] = useState(0)
  const [submitLoading, setSubmitLoading] = useState(false)
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

  const getCharacter = async () => {
    setSubmitLoading(true)
    try {
      const response = await         
      fetch(`https://www.anapioficeandfire.com/api/characters?page=${characterCount}&pageSize=1`);
      const json = await response.json();
      setCharacterCount(characterCount + 1)
      setCharacter(json[0].aliases);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <ScrollView>
        <View style={styles.container}>
          <Text>Character loaded:</Text>
          <Text>{character}</Text>
          <Text style={{color: theme.colors.primaryText}}>Review Set</Text>
          <Text style={{color: theme.colors.primaryText}}>Title: {title}</Text>
          {notecards.map((notecard, i) => (
            <ScrollView key={i}>
              <NotecardEditable
                cardNumber={i+1}
                toggleDialogFunction={() => toggleDialog(i)}
                notecard={notecard} />
              <NotecardDialog
                notecard={notecard}
                notecardIndex={i}
                isVisible={dialogVisibilities[i]}
                toggleDialog={() => toggleDialog(i)}
                updateNotecardsFunction={(updatedNotecard: [string, string]) => updateNotecards(i, updatedNotecard)}/>
            </ScrollView>
          ))}
          <PrimaryButton
            onPressFunction={() => getCharacter()}
            loading={submitLoading}>
            <View style={styles.primaryButtonChildrenContainer}>
              <Text style={[
                styles.primaryButtonChildrenText,
                {color: theme.colors.primaryText}]}>Submit</Text>
              <Icon
                color={theme.colors.primaryText}
                type="antdesign"
                size={25}
                name="enter"/>
            </View>
          </PrimaryButton>
          <PrimaryButton
            onPressFunction={() => navigation.navigate('Home')}>
            <View style={styles.primaryButtonChildrenContainer}>
              <Text style={[
                styles.primaryButtonChildrenText,
                {color: theme.colors.primaryText}]}>Cancel</Text>
              <Icon
                color={theme.colors.primaryText}
                type="foundation"
                size={25}
                name="prohibited"/>
            </View>
          </PrimaryButton>
        </View>
      </ScrollView>
    </View>
  )
}

export default ReviewSet