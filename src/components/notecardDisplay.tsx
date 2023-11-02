import React from 'react';
import { View, Text } from 'react-native';
import {
  Card,
  Icon,
  useTheme
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';

const styles = GlobalStyles;

type NotecardDisplayComponentProps = {
  notecardSide: string;
  body: string;
  flipNotecardFunction: () => void;
};

const NotecardDisplay: React.FunctionComponent<NotecardDisplayComponentProps> = (props) => {
  const { theme } = useTheme();
  
  return (
    <Card
      containerStyle={styles.card}
      wrapperStyle={styles.cardWrapper}>
      <View style={styles.cardTitle}>
        <Card.Title>{props.notecardSide}</Card.Title>
        <Card.Divider />
      </View>
      <View style={styles.cardBody}>
        <Text>{props.body}</Text>
      </View>
      <View style={styles.cardIcon}>
        <Icon
          type="fontawesome"
          size={25}
          color={theme.colors.icon}
          onPress={props.flipNotecardFunction}
          name={props.notecardSide == 'Front' ? 'rotate-right' : 'rotate-left'}/>
      </View>
    </Card>
  )
}

export default NotecardDisplay;