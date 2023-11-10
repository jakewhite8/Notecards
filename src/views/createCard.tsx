import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { Text, View, TextInput, ScrollView } from 'react-native';
import { Input as BaseInput } from '@rneui/base';
import {
  Button,
  Card,
  Input,
  InputProps,
  useTheme
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import Toast from 'react-native-toast-message';
import PrimaryButton from '../components/primaryButton';

type CreateCardProps = NativeStackScreenProps<StackParamList, 'CreateCard'>;

function CreateCard ({ navigation, route }: CreateCardProps) {
  const notecardTitle = route.params.cardTitle
  const styles = GlobalStyles;
  const { theme } = useTheme();

  interface WrappedInputProps extends InputProps {
    ref?: React.RefObject<TextInput & BaseInput>;
  }
  const inputProps = {}
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
          <Card
            containerStyle={[styles.card, {backgroundColor: theme.colors.primaryBackground, marginTop: 20}]}
            wrapperStyle={styles.cardWrapper}>
            <View style={styles.cardTitle}>
              <Card.Title style={{color: theme.colors.secondaryText}}>Front of Notecard</Card.Title>
              <Card.Divider />
            </View>
            <View style={styles.cardCreateBody}>
              <Input
                multiline
                {...(inputProps as WrappedInputProps)}
                containerStyle={{ width: '90%', height: '100%' }}
                style={[styles.inputFieldsStyle, { color: theme.colors.primaryText }]}
                onChangeText={setFrontNotecard}
                placeholder="Insert the contents of the front of the notecard here"
                placeholderTextColor={theme.colors.secondaryText}
                inputContainerStyle={{ borderColor: theme.colors.primaryBackground, height: '100%' }}
                value={frontNotecardString}
              />
            </View>
          </Card>
          <Card
            containerStyle={[styles.card, {backgroundColor: theme.colors.primaryBackground}]}
            wrapperStyle={styles.cardWrapper}>
            <View style={styles.cardTitle}>
              <Card.Title style={{color: theme.colors.secondaryText}}>Back of Notecard</Card.Title>
              <Card.Divider />
            </View>
            <View style={styles.cardCreateBody}>
              <Input
                multiline
                {...(inputProps as WrappedInputProps)}
                containerStyle={{ width: '90%', height: '100%' }}
                style={[styles.inputFieldsStyle, { color: theme.colors.primaryText }]}
                onChangeText={setBackNotecard}
                placeholder="Insert the contents of the back of the notecard here"
                placeholderTextColor={theme.colors.secondaryText}
                inputContainerStyle={{ borderColor: theme.colors.primaryBackground, height: '100%' }}
                value={backNotecardString}
              />
            </View>
          </Card>
          <PrimaryButton
            title="Review Set"
            onPressFunction={() => navigation.navigate('ReviewSet')}
            >
          </PrimaryButton>
          <PrimaryButton
            title="Next Card"
            onPressFunction={addCard}
            >
          </PrimaryButton>
        </View>
        <Toast />
      </ScrollView>
    </View>
  )
}

export default CreateCard;