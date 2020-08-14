import React, { Component } from 'react'
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
    Modal,
    YellowBox
} from 'react-native';

import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ImageView from "react-native-image-viewing";

import AdHeading from '../AdHeading/adHeading'
import AdHeader from '../AdHeader/adHeader'
import StickyHeader from '../AdStickyHeader/adStickyHeader'
import AdFooter from '../AdFooter/adFooter'
import AdDescription from '../AdDescription/adDescription'
import RatingAndReviewCard from '../RatingAndReviewCard/ratingAndReviewCard'
import UserRatingAndReview from '../UserRatingAndReview/userRatingAndReview'
import DefaultAdCard from '../DefaultAdCard/defaultAdCard'
import RatingButton from '../RatingButton/ratingButton'
import FeatureSection from '../InAdFeatureSection/inAdFeatureSection'

import { getUserFirestoreObj, getFirestoreUserByUid } from '../../Utility/utility'

export default class HouseAd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            features: null,
            ratingsAndReviews: this.props.navigation.getParam('reviewObj'),
            userFirestoreObj: null,
            adUserFirestoreObj: null,
            userReviewObj: this.props.navigation.getParam('myReview'),
            adObj: this.props.navigation.getParam('adObj')
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    componentWillMount = async () => {
        await getUserFirestoreObj().then(user => this.setState({ userFirestoreObj: user[1] }))
        await getFirestoreUserByUid(this.state.adObj['uid']).then(user => this.setState({ adUserFirestoreObj: user[1] }))
        /*this.setState({
            ratingsAndReviews: [
                { rating: 3.5, name: 'hello', review: 'ujghvhjvhjjhjfjfjjfyfftrrhrdgdrdrdrrddrrdyrdgdfgfdgfdgfdfdgfdgfdgfdgfdgfdgfdgfdgsgsgdggdgdgdffgrdfgrd', imageUrl: `https://placekitten.com/414/350`, date: '11/12/2020' },
                { rating: 2, name: 'hello', review: '', imageUrl: ``, date: '11/12/2020' },
                { rating: 5, name: 'hello', review: 'gsgsfggggggggggggggggggggggggggggggggggggggggggggjjjjjjjjjjjjjjjjjkjjjjjjjjjjjjjdgdggdgdgdffgrdfgrd', imageUrl: `https://placekitten.com/414/350`, date: '11/12/2020' },
            ]
        })*/
    }

    renderImage = () => {
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.setState({ displayImage: true })}>
                    <Image source={{ uri: this.state.adObj["imageUrl"], width: responsiveWidth(100), height: responsiveHeight(35) }} />
                </TouchableWithoutFeedback>
            </View>
        )
    }

    renderRatingAndReviewSection = () => {
        return (
            <View style={{ flex: 1 }}>
                <AdHeading fontSize={3} name={'Ratings and Reviews'} margin={responsiveHeight(2)} />
                <RatingAndReviewCard reviewObj={this.state.ratingsAndReviews} />
                <FlatList
                    data={this.state.ratingsAndReviews}
                    extraData={this.state.ratingsAndReviews}
                    renderItem={({ item }) =>
                        <UserRatingAndReview
                            name={item.name}
                            rating={item.rating}
                            review={item.review}
                            imageUrl={item.imageUrl}
                            date={item.date}
                        />}
                    keyExtractor={item => item.index}
                />
                <Text onPress={() => this.props.navigation.navigate('RatingsAndReviews', { back: '' })} style={{ marginVertical: responsiveHeight(2), color: '#008080', fontWeight: 'bold', fontSize: responsiveFontSize(2.2) }}>See all reviews</Text>
            </View>
        )
    }

    render() {
        let ratingHeading = '', number = "", ratingAndReviewSection = null;
        if (this.state.adUserFirestoreObj)
            number = this.state.adUserFirestoreObj["phoneNumber"]
        if (this.state.userReviewObj)
            ratingHeading = 'Your Rating and Review'
        else
            ratingHeading = 'Rate this ad'
        if (this.state.ratingsAndReviews.length)
            ratingAndReviewSection = this.renderRatingAndReviewSection()
        else
            ratingAndReviewSection = null
        return (
            <View style={{ flex: 1 }}>

                <Modal presentationStyle={'overFullScreen'} visible={this.state.displayImage} transparent={false}>
                    <ImageView images={[{ uri: this.state.adObj["imageUrl"] }]} imageIndex={0} visible={this.state.displayImage} onRequestClose={() => this.setState({ displayImage: false })} presentationStyle={'overFullScreen'} animationType={'fade'} />
                </Modal>

                <Modal visible={!this.state.displayImage} style={{ flex: 1 }} presentationStyle={'fullScreen'}>
                    <View style={{ flex: 12 }}>
                        <ParallaxScrollView
                            ref={ref => this.scrollListReftop = ref}
                            parallaxHeaderHeight={responsiveHeight(35)}
                            stickyHeaderHeight={responsiveHeight(8)}
                            renderForeground={this.renderImage}
                            renderStickyHeader={() =>
                                <StickyHeader
                                    action={() => this.props.navigation.goBack()}
                                    scrollToTop={() => this.scrollListReftop.scrollTo({ x: 0, y: 0, animated: true })}
                                />}
                        >
                            <View style={{ flex: 1, paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(2) }}>
                                <AdHeader type={this.state.adObj["Type"]} adID={this.state.adObj["adID"]} price={this.state.adObj["Price"]} title={this.state.adObj["Title"]} />

                                <AdHeading fontSize={3} name={'Description'} margin={responsiveHeight(1)} />
                                <AdDescription description={this.state.adObj["Description"]} />

                                <FeatureSection adObj={this.state.adObj} />

                                <AdHeading fontSize={3} name={'Rate this ad'} margin={responsiveHeight(2)} />
                                <RatingButton
                                    updateParent={myRObj => {
                                        let temp;
                                        if(this.state.ratingsAndReviews)
                                        temp=[]
                                        else
                                        temp=this.state.ratingsAndReviews
                                        temp.push(myRObj)
                                        this.setState({ 
                                            features: [...temp],
                                            userReviewObj: myRObj
                                        })
                                    }}
                                    adID={this.state.adObj["adID"]}
                                    reviewObj={this.state.userReviewObj}
                                />

                                {ratingAndReviewSection}

                                <AdHeading fontSize={3} name={'Recommendations'} margin={responsiveHeight(2)} />
                                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />

                            </View>
                        </ParallaxScrollView>
                    </View>

                    <AdFooter phoneNumber={number} enableDelivery={this.state.adObj['Deliverable']} flexSize={1} />

                </Modal>
            </View>
        )
    }
}