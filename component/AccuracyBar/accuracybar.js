import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import * as Progress from 'react-native-progress';

export default class AccuracyBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            indeterminate: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.accuracy != prevProps.accuracy)
            this.setState({ progress: this.props.accuracy })
    }

    componentDidMount() {
        this.setState({ progress: this.props.accuracy })
    }

    render() {
        return (
            <View style={{ flex: this.props.flexSize, justifyContent: 'center', alignItems: 'center', marginVertical: this.props.margin }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.welcome}>{this.props.algo}</Text>
                </View>
                <View style={styles.circles}>
                    <Progress.Circle
                        style={{ marginVertical: this.props.margin }}
                        progress={this.state.progress}
                        indeterminate={this.state.indeterminate}
                        showsText={true}
                        color={'#008080'}
                        size={responsiveWidth(30)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
        margin: 10,
    },
    circles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})