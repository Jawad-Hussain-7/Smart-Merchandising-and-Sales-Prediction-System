import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    YellowBox
} from 'react-native';

import { FloatingAction } from "react-native-floating-action";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'

import MainHeader from '../components/MainHeader/mainHeader'

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actions: [
                {
                    text: "New Outlet",
                    icon: <MaterialIcons name={'store'} color={'white'} size={responsiveHeight(4)} />,
                    name: "outlet",
                    position: 2,
                    color: '#008080',
                    textBackground: '#4c516d',
                    textColor: 'white'
                },
                {
                    text: "New Marketeer",
                    icon: <MaterialCommunityIcons name={'account-tie'} color={'white'} size={responsiveHeight(4)} />,
                    name: "NewMarketeer",
                    position: 1,
                    color: '#008080',
                    textBackground: '#4c516d',
                    textColor: 'white'
                },
            ]
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
        console.disableYellowBox = true;
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MainHeader flexSize={1} heading={'Settings'} />
                <View style={{ flex: 7 }}>

                </View>
                <FloatingAction
                    buttonSize={responsiveHeight(8)}
                    style={styles.floatingDock}
                    color={'#008080'}
                    actions={this.state.actions}
                    onPressItem={name => {
                        this.props.navigation.navigate('SuperAdminDashboard')
                    }}
                    distanceToEdge={responsiveWidth(5)}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    floatingDock: {
        backgroundColor: '#008080',
        position: 'absolute',
        width: responsiveWidth(14.5),
        height: responsiveHeight(7.5),
        borderRadius: responsiveHeight(10),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 15,
        top: responsiveHeight(80),
        left: responsiveWidth(81),
    },
});  