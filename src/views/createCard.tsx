import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useAppState } from '../context/GlobalState';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';
import PrimaryButton from '../components/primaryButton';
import NotecardInput from '../components/notecardInput';

type CreateCardProps = NativeStackScreenProps<StackParamList, 'CreateCard'>;

function CreateCard ({ navigation, route }: CreateCardProps) {
  const notecardTitle = route.params.cardTitle
  const styles = GlobalStyles;
  const { theme } = useTheme();

  const [frontNotecardString, setFrontNotecard] = useState('');
  const [backNotecardString, setBackNotecard] = useState('');
  const { state, dispatch } = useAppState();
  const [nextButtonLoading, setNextButtonLoading] = useState(false)

  const addCard = () => {
    setNextButtonLoading(true)

    const existingTitle = state.newNotecardSet.title
    // Make deep copy of New Notecards
    let newNotecards = [...state.newNotecardSet.notecards]

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

    Toast.show({
      type: 'success',
      text1: 'Notecard Added Successfully',
      visibilityTime: 1500
    });
    setNextButtonLoading(false)
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <ScrollView>
        <View style={styles.container}>
          <NotecardInput
            value={frontNotecardString}
            cardSide="front"
            onChangeFunction={setFrontNotecard} />
          <NotecardInput
            value={backNotecardString}
            cardSide="back"
            onChangeFunction={setBackNotecard} />
          <PrimaryButton
            title="Review Set"
            onPressFunction={() => navigation.navigate('ReviewSet')}
            >
          </PrimaryButton>
          <PrimaryButton
            title="Next Card"
            onPressFunction={addCard}
            loading={nextButtonLoading}
            >
          </PrimaryButton>
        </View>
        <Toast />
      </ScrollView>
    </View>
  )
}

export default CreateCard;