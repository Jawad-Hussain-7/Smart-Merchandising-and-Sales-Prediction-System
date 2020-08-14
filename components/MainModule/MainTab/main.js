import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, Image, TouchableOpacity, BackHandler} from 'react-native';
import MainTab from "./maintab"

export default class Main extends Component {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp();return true});
    } 
     componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MainTab/>
            </View>
        );
    }
}