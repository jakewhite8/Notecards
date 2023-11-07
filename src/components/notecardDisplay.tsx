import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
    <TouchableOpacity
      onPress={props.flipNotecardFunction}
      >
      <Card
        containerStyle={[styles.card, {backgroundColor: theme.colors.primaryBackground}]}
        wrapperStyle={styles.cardWrapper}>
        <View style={styles.cardTitle}>
          <Card.Title style={{color: theme.colors.primaryText}}>{props.notecardSide}</Card.Title>
          <Card.Divider />
        </View>
        <View style={styles.cardBody}>
          <TouchableOpacity activeOpacity={1}>
            <Text style={{color: theme.colors.primaryText}}>{props.body}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardIcon}>
          <Icon
            type="fontawesome"
            size={25}
            color={theme.colors.icon}
            name={props.notecardSide == 'Front' ? 'rotate-right' : 'rotate-left'}/>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default NotecardDisplay;