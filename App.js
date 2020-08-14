import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import MainHeader from './component/MainHeader/mainHeader'
import Graph from './component/Graph/graph'
import AccuracyBar from './component/AccuracyBar/accuracybar'
import DataTable from './component/DataTable/dataTable'

var dataset = require('./utility/sales_dataset.json')
var dataset_columns = require('./utility/sales_dataset_columns.json')
import { predict, getRefinedOrders, autoRegression, getAccuracy } from './utility/salesPrediction'
import brain from './utility/brain';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [],
      data: null,
      labels: [],
      brainData: null, brainLabels: null, arAcc: 0, brainAcc: 0
    }
  }

  componentWillMount = async () => {
    await getRefinedOrders(dataset).then(async orderObj => {
      let temp = orderObj.list.slice(0, 21)
      let testArr = orderObj.list.slice(21)
      orderObj.list = temp
      this.setState({ data: temp })
      console.log(temp.slice(10, 20))
      let config = {
        predictionSteps: 8,
        step: 9,
        serie: orderObj.list
      }
      await predict(config).then(async predictionObj => {
        console.log(predictionObj.prediction)
        this.setState({
          brainData: predictionObj.prediction,//predictionObj.serie.concat(predictionObj.prediction),
          brainLabels: orderObj.labels
        })
        await getAccuracy(testArr, predictionObj.prediction).then(acc => {
          this.setState({ brainAcc: acc })
        })
      })
      await autoRegression(orderObj.arr, config.predictionSteps).then(async forecast => {
        this.setState({ arData: forecast.predictions })  //orderObj.list.concat(forecast.predictions)
        await getAccuracy(testArr, forecast.predictions).then(acc => {
          this.setState({ arAcc: acc })
        })
      })
    }).catch(err => console.log(err))
  }

  renderOriginalGraph = () => {
    return (
      <View>
        <Graph
          labels={this.state.labels}
          data={this.state.data}
          heading={"Original Data"}
          margin={responsiveHeight(5)}
        />
      </View>
    )
  }

  renderARGraph = () => {
    return (
      <View>
        <Graph
          labels={this.state.labels}
          data={this.state.arData}
          heading={"Autoregression"}
          margin={responsiveHeight(5)}
        />
      </View>
    )
  }

  renderBrainGraph = () => {
    return (
      <View>
        <Graph
          labels={this.state.labels}
          data={this.state.brainData}
          heading={"Brain.js"}
          margin={responsiveHeight(3)}
        />
      </View>
    )
  }

  render() {
    let brainGraph, ARGraph, originalGraph;
    if (this.state.data)
      originalGraph = this.renderOriginalGraph()
    else
      originalGraph = <ActivityIndicator size={responsiveHeight(8)} color="#008080" style={{ marginVertical: responsiveHeight(2) }} />
    if (this.state.brainData)
      brainGraph = this.renderBrainGraph()
    else
      brainGraph = <ActivityIndicator size={responsiveHeight(8)} color="#008080" style={{ marginVertical: responsiveHeight(2) }} />
    if (this.state.arData)
      ARGraph = this.renderARGraph()
    else
      ARGraph = <ActivityIndicator size={responsiveHeight(8)} color="#008080" style={{ marginVertical: responsiveHeight(2) }} />
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <MainHeader flexSize={1} />
        <View style={{ flex: 8 }}>
          <ScrollView>

            {originalGraph}

            {brainGraph}

            {ARGraph}

            <Text style={styles.heading}>Accuracy</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <AccuracyBar flexSize={1} algo={'Brain.js'} accuracy={this.state.brainAcc} />
              <AccuracyBar flexSize={1} algo={'Autoregression'} accuracy={this.state.arAcc} />
            </View>

            <DataTable data={dataset} margin={responsiveHeight(10)} />

          </ScrollView>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: responsiveFontSize(3),
    color: '#008080',
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
    textAlign: 'center'
  },
});