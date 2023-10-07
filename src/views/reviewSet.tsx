import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { Text, View } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';

const styles = GlobalStyles

type ReviewSetProps = NativeStackScreenProps<StackParamList, 'ReviewSet'>;

function ReviewSet( { navigation }: ReviewSetProps) {
  const { state, dispatch } = useAppState();
  const notecards = state.newNotecardSet.notecards;
  const title = state.newNotecardSet.title;

  return (
    <View style={styles.container}>
      <Text>Review Set</Text>
      <Text>Title: {title}</Text>
      {notecards.map((notecard, i) => (
        <View key={i}>
          <Text>Card: {i + 1}</Text>
          <Text>Front: {notecard[0]}</Text>
          <Text>Back: {notecard[1]}</Text>
        </View>
      ))}
    </View>
  )
}

export default ReviewSet