import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { Input as BaseInput } from '@rneui/base';
import {
  Dialog,
  Input,
  InputProps
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';


type NotecardDialogComponentProps = {
  toggleDialog: () => void;
  notecard: [string, string];
  notecardIndex: number;
  isVisible: boolean;
};

const NotecardDialog: React.FunctionComponent<NotecardDialogComponentProps> = (props) => {
  const styles = GlobalStyles

  const [frontNotecardString, setFrontNotecard] = useState(props.notecard[0])
  const [backNotecardString, setBackNotecard] = useState(props.notecard[1])

  interface WrappedInputProps extends InputProps {
    ref?: React.RefObject<TextInput & BaseInput>;
  }
  const inputProps = {}

  const dialogTitle = `Notecard ${props.notecardIndex + 1}`;

  return ( 
    <Dialog
      isVisible={props.isVisible}
      onBackdropPress={props.toggleDialog}>
      <Dialog.Title title={dialogTitle} />
      <Text>Front:</Text>
      <Input
        multiline
        {...(inputProps as WrappedInputProps)}
        containerStyle={styles.inputFieldsStyle}
        onChangeText={setFrontNotecard}
        value={frontNotecardString}
      />
      <Text>Back:</Text>
      <Input
        multiline
        {...(inputProps as WrappedInputProps)}
        containerStyle={styles.inputFieldsStyle}
        onChangeText={setBackNotecard}
        value={backNotecardString}
      />
    </Dialog>
  )
}

export default NotecardDialog;