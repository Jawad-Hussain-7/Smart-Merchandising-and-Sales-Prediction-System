import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { LineChart } from 'react-native-chart-kit'

export default class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartConfig: {
                backgroundColor: "#f2f2f2",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: responsiveWidth(100),
                },
                propsForDots: {
                    r: responsiveHeight(0.2),
                    strokeWidth: responsiveWidth(1),
                    stroke: "#008080"
                },
                propsForLabels: {
                    fontSize: responsiveFontSize(1.5)
                }
            },
            data: {
                labels: this.props.labels,
                datasets: [{ data: this.props.data }]
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical:this.props.margin }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent:'flex-start' }}>
                <LineChart
                    data={this.state.data}
                    width={responsiveWidth(100)}
                    height={responsiveHeight(50)}
                    verticalLabelRotation={0}
                    chartConfig={this.state.chartConfig}
                    fromZero={true}
                    style={{ flex: 1 }}
                />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent:'flex-start', marginTop:responsiveHeight(-8) }}>
                    <Text>{this.props.heading}</Text>
                </View>
            </View>
        )
    }
}