import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  FlatList,
  YellowBox,
  RefreshControl
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import MainHeader from '../components/MainHeader/mainHeader'
import BroadcastCard from '../components/BroadcastCard/broadcastCard'

import { getBroadcasts } from '../utility/firestoreUtility'

export default class BroadcastList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storeObj: null, broadcasts: []
    }
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.disableYellowBox = true;
  }

  componentWillMount = async () => {
    this.setState({ refreshing: true })
    storeObj = await AsyncStorage.getItem('storeObj');
    storeObj = JSON.parse(storeObj)
    this.setState({ storeObj: storeObj })
    await getBroadcasts(storeObj.docID, val => this.setState({ broadcasts: val })).catch(err => console.log(err))
    this.setState({ refreshing: false })
  }

  goToBroadcast = (docID, docData, userObj) => {
    this.props.navigation.navigate('BroadcastInfo', { docID: docID, docData: docData, userObj: userObj })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MainHeader flexSize={1} />
        <View style={{ flex: 8 }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.componentWillMount}
                colors={['#008080', '#4c516d']}
              />}
            data={this.state.broadcasts}
            extraData={this.state.broadcasts}
            initialNumToRender={2}
            refreshing={true}
            renderItem={({ item }) =>
              <BroadcastCard
                broadcastID={item.docID}
                data={item.docData}
                radius={responsiveHeight(2.5)}
                margin={responsiveHeight(1)}
                thumbnailWidth={responsiveWidth(88.5)}
                width={responsiveWidth(90)}
                action={this.goToBroadcast}
              />}
            keyExtractor={item => item.docID}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
})