import React, { Component } from "react";
import { Text, View, ScrollView, Image, StyleSheet, FlatList, YellowBox } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import dashboardStyles from '../../CommonStyles/dashboardStyles'
import DefaultStoreCard from '../../CommonModules/DefaultStoreCard/defaultStoreCard'
import DefaultAdCard from '../../CommonModules/DefaultAdCard/defaultAdCard'

import { getCurrentUid } from '../../Utility/utility'
import * as firebase from 'firebase'
import 'firebase/firestore'

export default class RentDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ads: [], recommended: [],
            db: firebase.firestore().collection('Ads')
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
        console.disableYellowBox = true;
    }

    componentWillMount = async () => {
        this.state.db.get().then(snapshot => {
            let i = 0;
            snapshot.docs.forEach(async doc => {
                let temp = { docID: doc.id, docData: doc.data() }
                let arr = [...this.state.ads]
                arr.push(temp)
                await this.setState({ ads: arr })
                if (i >= 19 && i <= 21) {
                    let rec = [...this.state.recommended]
                    rec.push(temp)
                    await this.setState({ recommended: rec })
                }
                i++;
            })
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, paddingVertical: responsiveHeight(1) }}>
                <View style={dashboardStyles.card}>
                    <Text style={dashboardStyles.cardTitle}>Hot Ads</Text>
                    <View style={[dashboardStyles.cardHeader, { height: responsiveHeight(35) }]}>
                        <FlatList
                            horizontal={true}
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
                                    thumbnailWidth={responsiveWidth(52.5)}
                                    width={responsiveWidth(54)}
                                    action={this.props.screenProps['navFun']}
                                />}
                            keyExtractor={item => item.docID}
                        />
                    </View>
                </View>

                <View style={[dashboardStyles.card, {marginTop:responsiveHeight(-2)}]}>
                    <Text style={[dashboardStyles.cardTitle, {marginBottom:responsiveHeight(1)}]}>Ads you might like</Text>
                        <FlatList
                            data={this.state.recommended}
                            extraData={this.state.recommended}
                            initialNumToRender={2}
                            refreshing={true}
                            renderItem={({ item }) =>
                                <DefaultAdCard
                                    adID={item.docID}
                                    data={item.docData}
                                    pageType={'normal'}
                                    radius={responsiveHeight(3)}
                                    thumbnailWidth={responsiveWidth(88.5)}
                                    width={responsiveWidth(90)}
                                    margin={responsiveHeight(1)}
                                    action={this.props.screenProps['navFun']}
                                />}
                            keyExtractor={item => item.docID}
                        />
                </View>

                {/*<View style={dashboardStyles.card}>
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
        </View>*/}
            </ScrollView>
        );
    }
}