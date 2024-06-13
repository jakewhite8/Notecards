import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-reanimated-table';
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
  container: { flex: 1, padding: 16, paddingTop: 30 },
  head: {  height: 40  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
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

  const tableTitle = ['Jan', '', '', '', 'Feb', '', '', '']
  const tableHead = ['', '', 'Mon', '', 'Wed', '', 'Fri', '']
  const tableData = [
        ['1', '', '3', '', 'b', 'c', 'c'],
        ['a', '', 'c', '', 'b', 'c', 'c'],
        ['1', '', '3', '', 'b', 'c', 'x'],
        ['', '', '', '', '', '', ''],
        ['a', '', 'c', '', 'b', 'c', 'c'],
        ['1', '', '3', '', 'b', 'c', 'c'],
        ['a', '', 'c', '', 'b', 'c', 'c'],
        ['1', '', '3', '', 'b', 'c', 'x'],
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
          <View style={[stylesTable.container, {backgroundColor: theme.colors.secondaryBackground}]}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
              <Row data={tableHead} style={[stylesTable.head, {backgroundColor: theme.colors.secondaryBackground}]} textStyle={[stylesTable.text, {color: theme.colors.primaryText}]}/>
              <TableWrapper style={[stylesTable.wrapper, {backgroundColor: theme.colors.secondaryBackground}]}>
                <Col data={tableTitle} style={[stylesTable.title, {backgroundColor: theme.colors.secondaryBackground}]} textStyle={[stylesTable.text, {color: theme.colors.primaryText}]}/>
                <Rows data={tableData} flexArr={[1, 1, 1, 1, 1, 1, 1]} style={stylesTable.row} textStyle={[stylesTable.text, {color: theme.colors.primaryText}]}/>
              </TableWrapper>
            </Table>
          </View>
        </View>
    </View> 
  )
}

export default Activity;