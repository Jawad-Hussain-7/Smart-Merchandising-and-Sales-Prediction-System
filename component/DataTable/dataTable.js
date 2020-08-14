import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Table, TableWrapper, Row } from 'react-native-table-component';

export default class DataTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            widthArr: [responsiveWidth(50), responsiveWidth(50)]
        }
    }

    render() {
        return (
            <View style={{ flex: this.props.flexSize, justifyContent: 'center', alignItems: 'center', marginTop: this.props.margin }}>
                <Text style={styles.heading}>Dataset</Text>
                <Table>
                    <Row data={["Date", "Sales"]} widthArr={this.state.widthArr} style={styles.header} textStyle={styles.text} />
                </Table>
                <Table>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) =>
                            <Row
                                key={index}
                                data={[item["ORDERDATE"], item["SALES"]]}
                                widthArr={this.state.widthArr}
                                style={[styles.row, index % 2 && { backgroundColor: '#E7E6E1' }]}
                                textStyle={styles.rowTxt}
                            />
                        }
                        keyExtractor={item => item.YearMonth}
                    />
                </Table>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: responsiveFontSize(3),
        color: '#008080',
        fontWeight: 'bold',
        marginBottom:responsiveHeight(2)
    },
    header: {
        height: responsiveHeight(6),
        backgroundColor: '#008080'
    },
    text: {
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    row: {
        height: responsiveHeight(6),
        backgroundColor: 'white'
    },
    rowTxt: {
        fontSize: responsiveFontSize(2.3),
        textAlign: 'center',
        color: 'black'
    }
});