import React, { Component } from "react";
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import dashboardStyles from '../../CommonStyles/dashboardStyles'
import DefaultStoreCard from '../../CommonModules/DefaultStoreCard/defaultStoreCard'
import DefaultAdCard from '../../CommonModules/DefaultAdCard/defaultAdCard'
import * as firebase from 'firebase'
import 'firebase/firestore'

export default class RentDashboard extends Component {
    render() {
        return (
            <ScrollView style={{ flex: 1, paddingVertical: responsiveHeight(1) }}>
                <View style={dashboardStyles.card}>
                    <Text style={dashboardStyles.cardTitle}>Hot Outlets</Text>
                    <ScrollView horizontal={true}>
                        <View style={dashboardStyles.cardHeader}>
                            <DefaultStoreCard flexSize={1} name={'gsgghrdrhdrhdrdvdsd'} cover={require('../../../Images/40.jpg')} logo={require('../../../Images/x.png')} />
                            <DefaultStoreCard flexSize={1} name={'gsggsd'} cover={require('../../../Images/st.jpg')} logo={require('../../../Images/st.jpg')} />
                            <DefaultStoreCard flexSize={1} name={'gsggsd'} cover={require('../../../Images/40.jpg')} logo={require('../../../Images/x.png')} />
                            <DefaultStoreCard flexSize={1} name={'gsggsd'} cover={require('../../../Images/40.jpg')} logo={require('../../../Images/x.png')} />
                            <DefaultStoreCard flexSize={1} name={'gsggsd'} cover={require('../../../Images/40.jpg')} logo={require('../../../Images/x.png')} />
                        </View>
                    </ScrollView>
                </View>

                <View style={dashboardStyles.card}>
                    <Text style={dashboardStyles.cardTitle}>Hot Ads</Text>
                    <ScrollView horizontal={true}>
                        <View style={dashboardStyles.cardHeader}>
                            <DefaultAdCard radius={responsiveHeight(3)} thumbnailWidth={responsiveWidth(52.5)} width={responsiveWidth(54)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                            <DefaultAdCard radius={responsiveHeight(3)} thumbnailWidth={responsiveWidth(52.5)} width={responsiveWidth(54)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/43.jpg')} />
                            <DefaultAdCard radius={responsiveHeight(3)} thumbnailWidth={responsiveWidth(52.5)} width={responsiveWidth(54)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/40.jpg')} />
                            <DefaultAdCard radius={responsiveHeight(3)} thumbnailWidth={responsiveWidth(52.5)} width={responsiveWidth(54)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/40.jpg')} />
                        </View>
                    </ScrollView>
                </View>

                <View style={dashboardStyles.card}>
                    <Text style={dashboardStyles.cardTitle}> Related Adds</Text>
                    <ScrollView>
                        <View style={dashboardStyles.relatedAdsCard}>
                            <DefaultAdCard radius={responsiveHeight(2.5)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(87.5)} width={responsiveWidth(90)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                            <DefaultAdCard radius={responsiveHeight(2.5)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(88.5)} width={responsiveWidth(90)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/40.jpg')} />
                            <DefaultAdCard radius={responsiveHeight(2.5)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(88.5)} width={responsiveWidth(90)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/40.jpg')} />
                            <DefaultAdCard radius={responsiveHeight(2.5)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(88.5)} width={responsiveWidth(90)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/40.jpg')} />
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        );
    }
}