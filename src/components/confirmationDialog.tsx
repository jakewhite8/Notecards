import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import {
  Dialog,
  Icon,
  useTheme
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';
import PrimaryButton from './primaryButton';

type ConfirmationDialogComponentProps = {
  toggleDialog: () => void;
  continue: () => void;
  confirmationTitle: string;
  confirmationText: string;
  isVisible: boolean;
};

const ConfirmationDialog: React.FunctionComponent<ConfirmationDialogComponentProps> = (props) => {
  const styles = GlobalStyles
  const { theme } = useTheme();
  const {t, i18n} = useTranslation();

  return ( 
    <Dialog
      overlayStyle={{backgroundColor: theme.colors.primaryBackground}}
      isVisible={props.isVisible}
      onBackdropPress={props.toggleDialog}>
      <ScrollView>
        <Dialog.Title titleStyle={{color: theme.colors.primaryText}} title={props.confirmationTitle}/>
        <Text style={{color: theme.colors.secondaryText}}>{props.confirmationText}</Text>
        <View>
          <PrimaryButton
            onPressFunction={() => props.continue()}>
            <View style={styles.primaryButtonChildrenContainer}>
              <Text style={styles.primaryButtonChildrenText}>{t('continue')}</Text>
              <Icon
                type="entypo"
                size={25}
                name="home"/>
            </View>
          </PrimaryButton>
          <PrimaryButton
            onPressFunction={() => props.toggleDialog()}>
            <View style={styles.primaryButtonChildrenContainer}>
              <Text style={styles.primaryButtonChildrenText}>{t('cancel')}</Text>
              <Icon
                type="foundation"
                size={25}
                name="prohibited"/>
            </View>
          </PrimaryButton>
        </View>
      </ScrollView>
    </Dialog>
  )
}

export default ConfirmationDialog;