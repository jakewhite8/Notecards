import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { useTheme } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes'
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../components/primaryButton'

const styles = GlobalStyles;

type LoginProps = NativeStackScreenProps<StackParamList, 'Login'>;

function Login( { navigation, route }: LoginProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();

  const login = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <PrimaryButton
        title={t('login')}
        onPressFunction={login} >
      </PrimaryButton>
    </View> 
  )
}

export default Login;