import React from 'react';
import { Text } from 'react-native';
import { Dialog } from '@rneui/themed';


type NotecardDialogComponentProps = {
  toggleDialog: () => void;
  notecard: [string, string];
  notecardIndex: number;
  isVisible: boolean;
};

const NotecardDialog: React.FunctionComponent<NotecardDialogComponentProps> = (props) => {
  const dialogTitle = `Notecard ${props.notecardIndex + 1}`;
  return ( 
    <Dialog
      isVisible={props.isVisible}
      onBackdropPress={props.toggleDialog}>
      <Dialog.Title title={dialogTitle} />
      <Text>Front: {props.notecard[0]}</Text>
      <Text>Back: {props.notecard[1]}</Text>
    </Dialog>
  )
}

export default NotecardDialog;