import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';

import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import LinearGradient from 'react-native-linear-gradient'
import MainHeader from '../components/MainHeader/mainHeader'

export default class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            tableHeaders: ['Name', 'Email', 'User Type', 'Account Type'],
            widthArr: [responsiveWidth(30), responsiveWidth(60), responsiveWidth(30), responsiveWidth(30)]
        }
    }

    componentWillMount = () => {
        let tableData = []
        for (let i = 1; i <= 50; i++) {
            let row = []
            tableData.push(['Jawad Hussain', 'restricted.area101@gmail.com', 'Super User', 'Google'])
            this.setState({ users: tableData })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MainHeader flexSize={1} heading={'System Users'} />
                <View style={{ flex: 5 }}>
                    <ScrollView horizontal={true}>
                        <Table>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.3, y: 0 }} colors={['#008080', '#4c516d']} style={{ flex: 1 }}>
                                <Row data={this.state.tableHeaders} widthArr={this.state.widthArr} textStyle={styles.headerTxt} style={styles.header} />
                            </LinearGradient>
                            <View style={{ flex: 7 }}>
                                <FlatList
                                    data={this.state.users}
                                    renderItem={({ item, index }) =>
                                        <Row
                                            key={index}
                                            data={item}
                                            widthArr={this.state.widthArr}
                                            textStyle={styles.rowTxt}
                                            style={[styles.row, index % 2 && { backgroundColor: '#E7E6E1' }]}
                                        />}
                                    keyExtractor={index => index}
                                />

                            </View>
                        </Table>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerTxt: {
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    header: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    rowTxt: {
        textAlign: 'center'
    },
    row: { 
        height: responsiveHeight(7), 
        backgroundColor: 'white' 
    }
});