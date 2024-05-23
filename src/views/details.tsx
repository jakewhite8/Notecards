import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTheme } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes'
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../components/primaryButton'
import Loading from '../components/loading'
import NotecardService from '../services/notecard';
import { AxiosResponse } from 'axios';

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

  const notecardSet = state.currentNotecardSet

  useEffect(() => {
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
  }, [])

  interface NotecardSet {
    title: string;
    notecards: Array<[string, string]>;
  }

  const startNotecard = (notecardSet: NotecardSet) => {
    navigation.navigate('Notecard', {name: `${notecardSet.title} ${t('notecardSet')}`, cardId: route.params.card["ID"]})
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <PrimaryButton
        title={t('start')}
        onPressFunction={() => startNotecard(notecardSet)} >
      </PrimaryButton>
      <Toast />
    </View> 
  )
}

export default Details;