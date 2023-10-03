import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { Text, View } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const styles = GlobalStyles

type ReviewSetProps = NativeStackScreenProps<StackParamList, 'ReviewSet'>;

function ReviewSet( { navigation }: ReviewSetProps) {

  return (
    <View style={styles.container}>
      <Text>Review Set</Text>
    </View>
  )
}

export default ReviewSet