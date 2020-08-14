import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    YellowBox
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import InternalHeader from '../components/InternalHeader/internalHeader'
import StoreImage from '../components/StoreImage/storeImage'
import AdHeading from '../components/AdHeading/adHeading'
import UserInfoBox from '../components/UserInfoBox/userInfoBox'
import PostButton from '../components/PostButton/postButton'

export default class BroadcastInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null, data: null, userObj: null
        }
        this.initState = this.state
        YellowBox.ignoreWarnings(['Setting a timer']);
        console.disableYellowBox = true;
    }

    componentWillMount = () => {
        this.setState({
            id: this.props.navigation.getParam('docID'), data: this.props.navigation.getParam('docData'),
            userObj: this.props.navigation.getParam('userObj').docData
        })
    }

    goToChat = () => {
        this.props.navigation.navigate('Chat', {otherUser:this.state.userObj})
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <InternalHeader name={'Broadcast Details'} flexSize={1} action={() => { this.props.navigation.goBack() }} />
                <View style={{ flex: 10 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <StoreImage uri={this.state.data.photoURL} height={25} width={100} radius={3} margin={1} />
                        <View style={{ flex: 1, paddingHorizontal:responsiveWidth(3) }}>
                            <AdHeading name={'Description'} fontSize={responsiveFontSize(0.4)} margin={responsiveHeight(1)} />
                            <Text style={styles.desc}>{this.state.data.description}</Text>
                            <AdHeading name={'Uploaded By'} fontSize={responsiveFontSize(0.4)} margin={responsiveHeight(2)} />
                            <UserInfoBox margin={responsiveHeight(1)} flexSize={1} type={'name'} value={this.state.userObj.firstName + ' ' + this.state.userObj.lastName} />
                            <UserInfoBox margin={responsiveHeight(1)} flexSize={1} type={'email'} value={this.state.userObj.email} />
                            <UserInfoBox margin={responsiveHeight(1)} flexSize={1} type={'phoneNumber'} value={this.state.userObj.phoneNumber} />
                            <PostButton buttonText={'Reply'} action={this.goToChat} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    desc: {
        fontSize: responsiveFontSize(2),
        textAlign: 'justify'
    }
})