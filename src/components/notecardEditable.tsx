import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Card,
  Icon,
  useTheme
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';
import { useTranslation } from 'react-i18next';

const styles = GlobalStyles;
const notecardEditableStyles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'column',
    height: '100%'
  },
  cardTitleContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardTitleIcon: {
    flex: 0.1,
  },
  cardTitleText: {
    flex: 0.8,
  },
  cardBodyContainer: {
    flex: 0.45
  },
  cardBodyText: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

type NotecardEditableComponentProps = {
  cardNumber: number;
  toggleDialogFunction: () => void;
  notecard: [string, string];
};

const NotecardEditable: React.FunctionComponent<NotecardEditableComponentProps> = (props) => {
  const { theme } = useTheme()
  const {t, i18n} = useTranslation();
  return (
    <Card
      containerStyle={[styles.card, {
        backgroundColor: theme.colors.primaryBackground
      }]}
      wrapperStyle={notecardEditableStyles.cardWrapper}>
      <View style={notecardEditableStyles.cardTitleContainer}>
        <View style={notecardEditableStyles.cardTitleIcon}>
        </View>
        <View style={notecardEditableStyles.cardTitleText}>
          <Card.Title style={{color: theme.colors.primaryText}}>{t('notecard')}: {props.cardNumber}</Card.Title>
        </View>
        <View style={notecardEditableStyles.cardTitleIcon}>
          <Icon
            name="edit"
            type="entypo"
            color="blue"
            size={20}
            onPress={props.toggleDialogFunction}
          />
        </View>
      </View>
      <View style={notecardEditableStyles.cardBodyContainer}>
        <Card.Divider />
        <Text style={[notecardEditableStyles.cardBodyText, {color: theme.colors.primaryText}]}>{t('front')}:</Text>
        <Text style={{color: theme.colors.primaryText}}>{props.notecard[0]}</Text>
      </View>
      <View style={notecardEditableStyles.cardBodyContainer}>
        <Card.Divider />
        <Text style={[notecardEditableStyles.cardBodyText, {color: theme.colors.primaryText}]}>{t('back')}:</Text>
        <Text style={{color: theme.colors.primaryText}}>{props.notecard[1]}</Text>
      </View>
    </Card>
  )
}

export default NotecardEditable