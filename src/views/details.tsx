import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useTheme } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes'
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../components/primaryButton'

const styles = GlobalStyles;

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type DetailsProps = NativeStackScreenProps<StackParamList, 'Details'>;

// navigation and route prop is passed in to every screen component
function Details( { navigation, route }: DetailsProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();

  const notecardSet = state.currentNotecardSet

  interface NotecardSet {
    title: string;
    notecards: Array<[string, string]>;
  }

  const startNotecard = (notecardSet: NotecardSet) => {
    navigation.navigate('Notecard', {name: `${notecardSet.title} ${t('notecardSet')}`, cardId: route.params.card.cardId})
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <PrimaryButton
        title={t('start')}
        onPressFunction={() => startNotecard(notecardSet)} >
      </PrimaryButton>
    </View> 
  )
}

export default Details;