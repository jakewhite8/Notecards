import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import { Input as BaseInput } from '@rneui/base';
import {
  Dialog,
  Icon,
  Input,
  InputProps,
  useTheme
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';
import PrimaryButton from './primaryButton';

type NotecardDialogComponentProps = {
  toggleDialog: () => void;
  notecard: [string, string];
  notecardIndex: number;
  isVisible: boolean;
  updateNotecardsFunction: (notecard: [string, string]) => void;
};

const NotecardDialog: React.FunctionComponent<NotecardDialogComponentProps> = (props) => {
  const styles = GlobalStyles
  const { theme } = useTheme();

  const [frontNotecardString, setFrontNotecard] = useState(props.notecard[0])
  const [backNotecardString, setBackNotecard] = useState(props.notecard[1])
  const [updateFrontNotecard, setUpdateFrontNotecard] = useState(false);
  const [updateBackNotecard, setUpdateBackNotecard] = useState(false);
  const [displaySaveButton, setDisplaySaveButton] = useState(false);

  interface WrappedInputProps extends InputProps {
    ref?: React.RefObject<TextInput & BaseInput>;
  }
  const inputProps = {}

  const dialogTitle = `Notecard ${props.notecardIndex + 1}`;
  const notecardChange = (value: string, notecardSide: string) => {
    if (notecardSide === 'front') {
      setFrontNotecard(value)
      // Compare input value to inital notecard value
      if (value === props.notecard[0]) {
        setUpdateFrontNotecard(false)
        setDisplaySaveButton(updateBackNotecard)
      } else {
        setUpdateFrontNotecard(true)
        setDisplaySaveButton(true)
      }
    } else {
      setBackNotecard(value)
      if (value === props.notecard[1]) {
        setUpdateBackNotecard(false)
        setDisplaySaveButton(updateFrontNotecard);
      } else {
        setUpdateBackNotecard(true)
        setDisplaySaveButton(true);
      }
    }
  }

  const saveAndCloseDialog = () => {
    props.updateNotecardsFunction([frontNotecardString, backNotecardString])
    props.toggleDialog()
  }

  return ( 
    <Dialog
      overlayStyle={{backgroundColor: theme.colors.primaryBackground}}
      isVisible={props.isVisible}
      onBackdropPress={props.toggleDialog}>
      <ScrollView>
        <Dialog.Title titleStyle={{color: theme.colors.primaryText}} title={dialogTitle}/>
        <Text style={{color: theme.colors.secondaryText}}>Front:</Text>
        <Input
          multiline
          {...(inputProps as WrappedInputProps)}
          inputStyle={[styles.inputFieldsStyle, {color: theme.colors.primaryText}]}
          onChangeText={(value) => {notecardChange(value, 'front')}}
          value={frontNotecardString}
        />
        <Text style={{color: theme.colors.secondaryText}}>Back:</Text>
        <Input
          multiline
          {...(inputProps as WrappedInputProps)}
          inputStyle={[styles.inputFieldsStyle, {color: theme.colors.primaryText}]}
          onChangeText={(value) => {notecardChange(value, 'back')}}
          value={backNotecardString}
        />
        { displaySaveButton &&
          <View>
            <PrimaryButton
              onPressFunction={saveAndCloseDialog}>
              <View style={styles.primaryButtonChildrenContainer}>
                <Text style={styles.primaryButtonChildrenText}>Save</Text>
                <Icon
                  type="entypo"
                  size={25}
                  name="save"/>
              </View>
            </PrimaryButton>
            <PrimaryButton
              onPressFunction={() => props.toggleDialog()}>
              <View style={styles.primaryButtonChildrenContainer}>
                <Text style={styles.primaryButtonChildrenText}>Cancel</Text>
                <Icon
                  type="foundation"
                  size={25}
                  name="prohibited"/>
              </View>
            </PrimaryButton>
          </View>
        }
      </ScrollView>
    </Dialog>
  )
}

export default NotecardDialog;