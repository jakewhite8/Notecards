import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import GlobalStyles from '../styles/GlobalStyles';
import { View, Text, ScrollView } from 'react-native';
import {
  Button,
  Card,
  Icon
} from '@rneui/themed';
import { useAppState } from '../context/GlobalState';
import { useState } from 'react';

const styles = GlobalStyles;

type NotecardProps = NativeStackScreenProps<StackParamList, 'Notecard'>;

function Notecard( {navigation, route }: NotecardProps) {
  const [count, setCount] = useState(0)
  const [displayFrontNotecard, setDisplayFrontNotecard] = useState(true)
  const { state, dispatch } = useAppState();
  const notecards = state.currentNotecardSet.notecards

  function shuffleNotecards(arr: Array<[string, string]>) {
    const result = [];
    // Clone the input array
    const clone = arr.slice();

    while (clone.length > 0) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * clone.length);
      // Remove notecard from clone and set that notecard equal to randomNotecard
      const randomNotecard = clone.splice(randomIndex, 1)[0];
      // Add the random notecard to the result array
      result.push(randomNotecard);
    }
    return result;
  }

  // Initialize shuffledNotecards
  const [shuffledNotecards, setShuffledNotecards] = useState<Array<[string, string]>>(
    shuffleNotecards(notecards)
  );

  const reset = () => {
    setCount(0);
    setShuffledNotecards(shuffleNotecards(notecards))
  };

  const changeCard = (card: number) => {
    setDisplayFrontNotecard(true)
    setCount(card)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Text>Notecard {count + 1 }/{notecards.length}</Text>
          <View>
          { displayFrontNotecard ? 
          <Card containerStyle={styles.card}>
            <Card.Title>Front</Card.Title>
            <Card.Divider />
            <Text>{shuffledNotecards[count][0]}</Text>
            <Icon
              type="fontawesome"
              size={25}
              color={'#f4511e'}
              onPress={()=> setDisplayFrontNotecard(!displayFrontNotecard)}
              name="rotate-right"/>
          </Card>
          :
          <Card containerStyle={styles.card}>
            <Card.Title>Back</Card.Title>
            <Card.Divider />
            <Text>{shuffledNotecards[count][1]}</Text>
              <Icon
                type="fontawesome"
                size={25}
                color={'#f4511e'}
                onPress={()=> setDisplayFrontNotecard(!displayFrontNotecard)}
                name="rotate-left"/>
          </Card>
          }
          </View>
          <View style={styles.buttonContainer}>
            {count > 0 && (
              <Button
                title="Previous Card"
                containerStyle={styles.button}
                onPress={() => changeCard(count - 1)}>
              </Button>
            )}
            {count < (notecards.length - 1) ? (
              <Button
                title="Next Card"
                containerStyle={styles.button}
                onPress={() => changeCard(count + 1)}>
              </Button>
            ) : (
              <Button
                title="Restart"
                containerStyle={styles.button}
                onPress={() => reset()}>
              </Button>
            )}
          </View>
          <View>
            <Button
              title="Home"
              containerStyle={styles.button}
              onPress={() => navigation.navigate('Home')}>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Notecard;