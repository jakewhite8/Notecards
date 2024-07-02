import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTheme } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes'
import { NotecardSet } from '../types/DataInterfaces'
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../components/primaryButton'
import Loading from '../components/loading'
import NotecardService from '../services/notecard';
import { AxiosResponse } from 'axios';
import ConfirmationDialog from '../components/confirmationDialog';
import DeleteButton from '../components/deleteButton';

const styles = GlobalStyles;

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type DetailsProps = NativeStackScreenProps<StackParamList, 'Details'>;

// navigation and route prop is passed in to every screen component
function Details( { navigation, route }: DetailsProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true)
  const [confirmationVisibility, setConfirmationVisibility] = useState(false)

  const notecardSet = state.currentNotecardSet

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DeleteButton onClick={() => setConfirmationVisibility(true)} />
      ),
    });
    // Get the Notecards that belong to the selected Notecard set
    const notecard = route.params.card
    NotecardService.getNotecards(state.user, notecard["ID"])
      .then((response: AxiosResponse) => {
        const notecards = response.data.notecards.map((notecard) => {
          return [notecard.front, notecard.back]
        })
        // Update current Notecard set
        dispatch({
          type: 'UPDATE_CURRENT_NOTECARDSET',
          payload: {
            title: notecard.title,
            id: notecard["ID"],
            notecards: notecards
          }
        })
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(`getNotecards error: ${error}`)
        setIsLoading(false)
        Toast.show({
          type: 'error',
          text1: t('notecardLoadingError'),
          visibilityTime: 1500
        });
      })
  }, [navigation])

  const startNotecard = (notecardSet: NotecardSet) => {
    navigation.navigate('Notecard', {name: `${notecardSet.title} ${t('notecardSet')}`, cardId: notecardSet.id})
  }

  if (isLoading) {
    return <Loading />
  }

  const deleteNotecard = () => {
    setConfirmationVisibility(false)
    setIsLoading(true)
    NotecardService.deleteNotecard(state.user, state.currentNotecardSet.id)
      .then((response: AxiosResponse) => {
        setIsLoading(false)
        navigation.navigate('Home')
      })
      .catch((error) => {
        console.log(`deleteNotecard error: ${error}`)
        setIsLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Delete Error',
          visibilityTime: 1500
        });
      })
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <PrimaryButton
        title={t('start')}
        onPressFunction={() => startNotecard(notecardSet)} >
      </PrimaryButton>
      <Toast />
      <ConfirmationDialog
        toggleDialog={() => setConfirmationVisibility(false)}
        continue={() => deleteNotecard()}
        confirmationTitle={t('confirmation')}
        confirmationText={t('confirmationDeleteNotecardSet')}
        isVisible={confirmationVisibility}
        />
    </View> 
  )
}

export default Details;