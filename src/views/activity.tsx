import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import AnalyticTextField from '../components/analyticTextField';
import SampleActivityData from '../helpers/SampleActivityData';
import influxDB from '../services/influxDB';
import { CalendarList } from 'react-native-calendars';

const styles = GlobalStyles;
const sampleData = SampleActivityData;

type ActivityProps = NativeStackScreenProps<StackParamList, 'Activity'>;

function Activity( { navigation, route }: ActivityProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();
  const [influxData, setInfluxData] = useState([]);
  const [influxLoading, setInfluxLoading] = useState(false)
  const [calendarRange, setCalendarRange] = useState(1)
  const [marked, setMarked] = useState({})

  useEffect(() => {
    let res = [];
    setInfluxLoading(true)

    function queryRows() {
      const token = influxDB.TOKEN;
      const org = influxDB.ORG
      const bucket = influxDB.BUCKET
      const url = influxDB.URL
      const userId = state.user.id;

      // Query notecard activity data for the current user
      // from the past 30 days
      // One table with userId and notecardCount combined where userId = state.user.id
      const query = `from(bucket:"${bucket}")
              |> range(start: -720h)
              |> filter(fn: (r) => r._measurement == "notecard")
              |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
              |> filter(fn: (r) => r.userId == ${userId})`;

      const queryApi = new InfluxDB({url, token}).getQueryApi(org)
      let res = []
      queryApi.queryRows(query, {
        next: (row: string[], tableMeta: FluxTableMetaData) => {
          // create an object for each row
          const o = tableMeta.toObject(row)
          res.push(o)
        },
        error: (error: Error) => {
          setInfluxLoading(false)
          console.log("query failed- ", error);
        },
        complete: () => {
          setInfluxData(res)
          setInfluxLoading(false)
          setCalendarRange(4)
          setMarked({
            '2024-06-02': {marked: true},
            '2024-06-03': {marked: true},
            '2024-05-29': {marked: true}
          })
        },
      })
    }
    queryRows()
  }, []);

  const calculateNotecardsViewed = (data: array) => {
    if (data.length) {
      return data.reduce((sum, current) => sum + current.notecardCount, 0);
    }
    return 0
  }

  return (
    <View style={{backgroundColor: theme.colors.secondaryBackground, flex: 1}}>
      <View style={{ flexDirection:'row'} }>
        <View style={{flex: 0.33}}>
          <AnalyticTextField title="Total Cards Viewed" value={calculateNotecardsViewed(influxData)} loading={influxLoading} />
        </View>
        <View style={{flex: 0.33}}>
          <AnalyticTextField title="Current View Streak" value={sampleData.currentViewStreak} loading={false} />
        </View>
        <View style={{flex: 0.33}}>
          <AnalyticTextField title="Longest View Streak" value={sampleData.longestViewSteak} loading={false} />
        </View>
      </View>
      <View style={{
        flexDirection:'row',
        justifyContent: 'center',
      }}>
        <View style={{
          flex: 1,
        }}>
          <CalendarList
            futureScrollRange={0}
            pastScrollRange={calendarRange}
            displayLoadingIndicator={influxLoading}
            showScrollIndicator={true}
            markedDates={marked}
            dayComponent={({date, state, marking}) => {
              return (
                <View style={{
                  backgroundColor: marking ? 'green' : theme.colors.primaryBackground,
                  borderWidth: 5,
                  borderRadius: 5,
                }}>
                  <Text>{'     '}</Text>
                </View>
              );
            }}
            hideDayNames={true}
            style={{
              marginTop: 20,
              marginBottom: 20,
            }}
            theme={{
              calendarBackground: theme.colors.primaryBackground,
              monthTextColor: theme.colors.primaryText,
              indicatorColor: theme.colors.primaryText,
              textMonthFontSize: 16,
            }}
            horizontal={true}
            calendarWidth={320}
          />
        </View>
      </View>
    </View> 
  )
}

export default Activity;