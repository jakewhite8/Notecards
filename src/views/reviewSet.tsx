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
import { useTranslation } from 'react-i18next';
import NotecardService from '../services/notecard';
import { AxiosResponse } from 'axios';

const styles = GlobalStyles;

type ReviewSetProps = NativeStackScreenProps<StackParamList, 'ReviewSet'>;

function ReviewSet( { navigation }: ReviewSetProps) {
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();
  const { theme } = useTheme();
  const [notecards, setNotecards] = useState(state.newNotecardSet.notecards)
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

  const submit = async () => {
    setSubmitLoading(true)
    const newNotecardSet = {
      title,
      notecards
    }
    if (newNotecardSet.title && newNotecardSet.notecards.length > 0) {
      NotecardService.createNewSet(newNotecardSet)
        .then((response: AxiosResponse) => {
          console.log(`Create notecard set response: ${response}`)
          setSubmitLoading(false);
        })
        .catch((error) => {
          console.error('Error creating new notecard set', error)
          setSubmitLoading(false);
        })
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={{color: theme.colors.primaryText}}>{t('title')}: {title}</Text>
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
            onPressFunction={() => submit()}
            loading={submitLoading}>
            <View style={styles.primaryButtonChildrenContainer}>
              <Text style={[
                styles.primaryButtonChildrenText,
                {color: theme.colors.primaryText}]}>{t('submit')}</Text>
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
                {color: theme.colors.primaryText}]}>{t('cancel')}</Text>
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