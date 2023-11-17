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
import { useTranslation } from 'react-i18next';

type CreateCardProps = NativeStackScreenProps<StackParamList, 'CreateCard'>;

function CreateCard ({ navigation, route }: CreateCardProps) {
  const notecardTitle = route.params.cardTitle
  const styles = GlobalStyles;
  const { theme } = useTheme();
  const {t, i18n} = useTranslation();

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
      text1: t('notecardCreatedSuccessfully'),
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
            title={t('reviewSet')}
            onPressFunction={() => navigation.navigate('ReviewSet')}
            >
          </PrimaryButton>
          <PrimaryButton
            title={t('nextNotecard')}
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