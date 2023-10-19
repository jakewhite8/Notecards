import React, { useState } from 'react';
import { Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet } from 'react-native';
import { Input as BaseInput } from '@rneui/base';
import {
  Button,
  Dialog,
  Icon,
  Input,
  InputProps
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';


type NotecardDialogComponentProps = {
  toggleDialog: () => void;
  notecard: [string, string];
  notecardIndex: number;
  isVisible: boolean;
  updateNotecardsFunction: (notecard: [string, string]) => void;
};

const NotecardDialog: React.FunctionComponent<NotecardDialogComponentProps> = (props) => {
  const styles = GlobalStyles

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
      overlayStyle={dialogStyles.dialog}
      isVisible={props.isVisible}
      onBackdropPress={props.toggleDialog}>
      <ScrollView>
        <Dialog.Title title={dialogTitle} />
        <Text>Front:</Text>
        <Input
          multiline
          {...(inputProps as WrappedInputProps)}
          inputStyle={styles.inputFieldsStyle}
          onChangeText={(value) => {notecardChange(value, 'front')}}
          value={frontNotecardString}
        />
        <Text>Back:</Text>
        <Input
          multiline
          {...(inputProps as WrappedInputProps)}
          inputStyle={styles.inputFieldsStyle}
          onChangeText={(value) => {notecardChange(value, 'back')}}
          value={backNotecardString}
        />
        { displaySaveButton &&
          <View>
            <Button
              containerStyle={styles.button}
              onPress={saveAndCloseDialog}>{'Save '} 
              <Icon
                type="entypo"
                size={25}
                name="save"/>
            </Button>
            <Button
              containerStyle={styles.button}
              onPress={() => props.toggleDialog()}>{'Cancel '}
              <Icon
                type="foundation"
                size={25}
                name="prohibited"/>
            </Button>
          </View>
        }
      </ScrollView>
    </Dialog>
  )
}

const dialogStyles = StyleSheet.create({
  dialog: {
    backgroundColor: '#fff'
  }
})

export default NotecardDialog;