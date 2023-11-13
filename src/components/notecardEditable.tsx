import React from 'react';
import { Text } from 'react-native';
import {
  Card,
  Icon,
  useTheme
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';
const styles = GlobalStyles;

type NotecardEditableComponentProps = {
  cardNumber: number;
  toggleDialogFunction: () => void;
  notecard: [string, string];
};

const NotecardEditable: React.FunctionComponent<NotecardEditableComponentProps> = (props) => {
  const { theme } = useTheme()
  return (
    <Card
      containerStyle={[styles.card, {backgroundColor: theme.colors.primaryBackground}]}>
      <Card.Title>
        <Text style={{color: theme.colors.primaryText}}>Card: {props.cardNumber}</Text>
        <Icon
          name="edit"
          type="entypo"
          color="blue"
          size={20}
          onPress={props.toggleDialogFunction}
        />
      </Card.Title>
      <Card.Divider />
      <Text style={{color: theme.colors.primaryText}}>Front:</Text>
      <Text style={{color: theme.colors.primaryText}}>{props.notecard[0]}</Text>
      <Card.Divider />
      <Text style={{color: theme.colors.primaryText}}>Back:</Text>
      <Text style={{color: theme.colors.primaryText}}>{props.notecard[1]}</Text>
    </Card>
  )
}

export default NotecardEditable