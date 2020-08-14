import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    YellowBox
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import MainHeader from '../components/MainHeader/mainHeader'
import DefaultAdCard from '../components/DefaultAdCard/defaultAdCard'

import * as firebase from 'firebase'
import 'firebase/firestore'

export default class AdList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ads: []
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
        console.disableYellowBox = true;
    }

    /*componentWillMount = () => {
        firebase.firestore().collection('Ads').get().then(async snapshot => {
            let arr = this.state.ads
            snapshot.docs.forEach(async doc => {
                let temp = { docID: doc.id, docData: doc.data() }
                arr.push(temp)
                this.setState({ ads: arr })
            })
        }).catch(err => console.log(err))
    }*/

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MainHeader flexSize={1} heading={'System Ads'} />
                <View style={{ flex: 7 }}>
                    <FlatList
                        data={this.state.ads}
                        extraData={this.state.ads}
                        initialNumToRender={2}
                        refreshing={true}
                        renderItem={({ item }) =>
                            <DefaultAdCard
                                adID={item.docID}
                                data={item.docData}
                                pageType={'normal'}
                                radius={responsiveHeight(3)}
                                thumbnailWidth={responsiveWidth(88.5)}
                                margin={responsiveHeight(1)}
                                width={responsiveWidth(90)}
                                action={() => console.log('nothing')}
                            />}
                        keyExtractor={item => item.docID}
                    />

                </View>
            </View>
        )
    }
}