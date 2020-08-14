import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    YellowBox,
    RefreshControl
} from 'react-native';

import { FloatingAction } from "react-native-floating-action";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import MainHeader from '../components/MainHeader/mainAppHeader'
import ProfileCard from '../components/ProfileCard/profileCard'

import { logout } from '../utility/authUtility'
import * as firebase from 'firebase'
import 'firebase/firestore'

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actions: [
                {
                    text: "New Outlet",
                    icon: <MaterialIcons name={'store'} color={'white'} size={responsiveHeight(4)} />,
                    name: "NewOutlet",
                    position: 3,
                    color: '#008080',
                    textBackground: '#4c516d',
                    textColor: 'white'
                },
                {
                    text: "New Marketeer",
                    icon: <MaterialCommunityIcons name={'account-tie'} color={'white'} size={responsiveHeight(4)} />,
                    name: "NewMarketeer",
                    position: 2,
                    color: '#008080',
                    textBackground: '#4c516d',
                    textColor: 'white'
                },
                {
                    text: "New Marketeer Admin",
                    icon: <MaterialCommunityIcons name={'account-child'} color={'white'} size={responsiveHeight(4)} />,
                    name: "NewMarketeerAdmin",
                    position: 1,
                    color: '#008080',
                    textBackground: '#4c516d',
                    textColor: 'white'
                },
            ], users: []
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
        console.disableYellowBox = true;
    }

    componentWillMount = () => {
        this.setState({refreshing:true})
        let types = ['Super User', 'Marketeer', 'Marketeer Admin']
        firebase.firestore().collection('Users').where('account', '==', 'local')
            .where('type', 'in', types).get().then(snapshots => {
                let arr = this.state.users
                snapshots.docs.forEach(doc => {
                    let temp = { docID: doc.id, docData: doc.data() }
                    arr.push(temp)
                    this.setState({ users: arr })
                })
            })
            this.setState({refreshing:false})
    }

    signout = async () => {
        await logout().then(() => {
            this.props.navigation.navigate('Login')
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MainHeader flexSize={1} />
                <View style={{ flex: 8, alignItems: 'center' }}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.componentWillMount}
                                colors={['#008080', '#4c516d']}
                            />}
                        data={this.state.users}
                        extraData={this.state.users}
                        initialNumToRender={1}
                        refreshing={true}
                        renderItem={({ item }) =>
                            <ProfileCard
                                userObj={item.docData}
                                userObjID={item.docID}
                                imageUrl={item.docData.photoURL}
                                name={item.docData.firstName + ' ' + item.docData.lastName}
                                action={(userObjID, userObj) => this.props.navigation.navigate('UserProfile', { userObjID: userObjID, userObj: userObj })}
                            />}
                        keyExtractor={item => item.docID}
                    />
                </View>
                <FloatingAction
                    buttonSize={responsiveHeight(8)}
                    style={styles.floatingDock}
                    color={'#008080'}
                    actions={this.state.actions}
                    onPressItem={name => {
                        this.props.navigation.navigate(name)
                    }}
                    distanceToEdge={responsiveWidth(5)}
                />
                <TouchableOpacity style={styles.logoutBtn} onPress={this.signout}>
                    <AntDesign name={'logout'} color={'white'} size={responsiveHeight(3)} />
                </TouchableOpacity>
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
    logoutBtn: {
        backgroundColor: '#008080',
        position: 'absolute',
        width: responsiveWidth(15.5),
        height: responsiveHeight(8.2),
        borderRadius: responsiveHeight(100),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 15,
        top: responsiveHeight(85.5),
        left: responsiveWidth(5),
    }
});  