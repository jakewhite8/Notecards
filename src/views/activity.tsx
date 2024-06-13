import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Table, Row, Rows } from 'react-native-reanimated-table';
import { useTheme } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import AnalyticTextField from '../components/analyticTextField';
import SampleActivityData from '../helpers/SampleActivityData';
import influxDB from '../services/influxDB';

const styles = GlobalStyles;
const sampleData = SampleActivityData;

const stylesTable = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

type ActivityProps = NativeStackScreenProps<StackParamList, 'Activity'>;

function Activity( { navigation, route }: ActivityProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();
  const [influxData, setInfluxData] = useState([]);
  const [influxLoading, setInfluxLoading] = useState(false)

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

  const tableHead = ['Head', 'Head2', 'Head3', 'Head4']
  const tableData = [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
      ]

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
        <View style={{ flexDirection:'row'} }>
          <View style={stylesTable.container}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={tableHead} style={stylesTable.head} textStyle={stylesTable.text}/>
              <Rows data={tableData} textStyle={stylesTable.text}/>
            </Table>
          </View>
        </View>
    </View> 
  )
}

export default Activity;