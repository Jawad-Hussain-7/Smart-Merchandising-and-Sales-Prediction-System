import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    FlatList,
    ScrollView,
    YellowBox
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import InternalHeader from '../components/InternalHeader/internalHeader'
import UserInfoBox from '../components/UserInfoBox/userInfoBox'

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userObjID: this.props.navigation.getParam('userObjID'),
            userObj: this.props.navigation.getParam('userObj'),
            imageUrl: null,
            name: null,
            userInfoData: null,
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
        console.disableYellowBox = true;
    }

    componentWillMount = () => {
        let userInfoData = [
            { key: 'userID', val: this.state.userObjID },
            { key: 'email', val: this.state.userObj.email },
        ]
        if ('phoneNumber' in this.state.userObj)
            userInfoData.push({ key: 'phoneNumber', val: this.state.userObj.phoneNumber })
        userInfoData.push({ key: 'account', val: this.state.userObj.account })
        userInfoData.push({ key: 'type', val: this.state.userObj.type })
        this.setState({
            userInfoData: userInfoData,
            name: this.state.userObj.firstName + ' ' + this.state.userObj.lastName
        })
        if ('photoURL' in this.state.userObj)
            this.setState({ imageUrl: this.state.userObj.photoURL })
    }

    renderImage = () => {
        return (
            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}  >
                <Image style={styles.iconCat} source={{ uri: this.state.imageUrl }} />
            </View>
        )
    }

    renderIcon = () => {
        return (
            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: '#008080', borderRadius: responsiveHeight(100), width: responsiveWidth(18), height: responsiveHeight(9), alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesome5 name={'user-tie'} color={'white'} size={responsiveHeight(5)} />
                </View>
            </View>
        )
    }

    render() {
        let image;
        if (this.state.imageUrl == '' || !this.state.imageUrl)
            image = this.renderIcon()
        else
            image = this.renderImage()
        return (
            <View style={{ flex: 1 }}>
                <InternalHeader name={'User Profile'} flexSize={1} action={() => this.props.navigation.goBack()} />
                <View style={{ flex: 10 }}>
                    <ScrollView>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: responsiveHeight(3) }}>
                            {image}
                            <View style={{ flex: 1.3, justifyContent: "center" }}>
                                <Text style={styles.txt}>{this.state.name}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', marginVertical: responsiveHeight(3) }}>
                            <FlatList
                                data={this.state.userInfoData}
                                renderItem={({ item }) =>
                                    <View style={{ flex: 1 }}>
                                        <UserInfoBox
                                            flexSize={1}
                                            margin={responsiveHeight(1)}
                                            width={90}
                                            type={item.key}
                                            value={item.val}
                                        />
                                    </View>}
                                keyExtractor={item => item.key}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconCat: {
        height: responsiveHeight(9),
        width: responsiveWidth(18),
        borderRadius: responsiveWidth(80),
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: responsiveFontSize(2.3),
    }
});