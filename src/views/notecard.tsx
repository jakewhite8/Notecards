import { useState, useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import GlobalStyles from '../styles/GlobalStyles';
import { View, Text, ScrollView } from 'react-native';
import {
  Button,
  useTheme
} from '@rneui/themed';
import { useAppState } from '../context/GlobalState';
import NotecardView from '../components/notecardView';
import PrimaryButton from '../components/primaryButton';
import { useTranslation } from 'react-i18next';
import influxCredentials from '../services/influxDB';
import {InfluxDB, Point} from '@influxdata/influxdb-client'

const styles = GlobalStyles;

type NotecardProps = NativeStackScreenProps<StackParamList, 'Notecard'>;

function Notecard( {navigation, route }: NotecardProps) {
  const [count, setCount] = useState(0)
  const [viewCount, setViewCount] = useState(1)
  const viewCountRef = useRef(viewCount)
  const [displayFrontNotecard, setDisplayFrontNotecard] = useState(true)
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();
  const notecards = state.currentNotecardSet.notecards
  const { theme } = useTheme();

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
    setViewCount(viewCount + 1)
  }

  const updateInfluxDbViewCount = (viewCount: number) => {
    const token = influxCredentials.TOKEN;
    const org = influxCredentials.ORG
    const bucket = influxCredentials.BUCKET
    const url = influxCredentials.URL
    const userId = state.user.id;

    const influxDB = new InfluxDB({url, token})
    const writeApi = influxDB.getWriteApi(org, bucket)
    const point = new Point('notecard')
      .floatField('notecardCount', viewCount)
      .floatField('userId', userId)
    writeApi.writePoint(point)
    writeApi.close()
  }

  useEffect(() => {
    viewCountRef.current = viewCount
  }, [viewCount])

  useEffect(() => {
    // Unmount Function
    return () => {
      updateInfluxDbViewCount(viewCountRef.current)
    }
  }, [])

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{padding: 10}}>
            <Text style={{color: theme.colors.primaryText}}>{t('notecard')} {count + 1 }/{notecards.length}</Text>
          </View>
          <ScrollView>
            { displayFrontNotecard ? 
            <NotecardView 
              notecardSide='Front'
              body={shuffledNotecards[count][0]}
              flipNotecardFunction={() => setDisplayFrontNotecard(!displayFrontNotecard)} />
            :
            <NotecardView 
              notecardSide='Back'
              body={shuffledNotecards[count][1]}
              flipNotecardFunction={() => setDisplayFrontNotecard(!displayFrontNotecard)} />
            }
          </ScrollView>
          <View style={styles.buttonContainer}>
            {count > 0 && (
              <View>
                <PrimaryButton
                  title={t('previousNotecard')}
                  onPressFunction={() => changeCard(count - 1)} >
                </PrimaryButton>
              </View>
            )}
            {count < (notecards.length - 1) ? (
              <View>
                <PrimaryButton
                  title={t('nextNotecard')}
                  onPressFunction={() => changeCard(count + 1)} >
                </PrimaryButton>
              </View>
            ) : (
              <View>
                <PrimaryButton
                  title={t('restart')}
                  onPressFunction={() => reset()} >
                </PrimaryButton>
              </View>
            )}
          </View>
          <View>
            <PrimaryButton
              title={t('home')}
              onPressFunction={() => navigation.navigate('Home')} >
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Notecard;