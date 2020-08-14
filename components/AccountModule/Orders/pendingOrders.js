import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

import { responsiveHeight, responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather'

class Item extends Component {
    render () {
      return (
        <View style={styles.box}>
          <View style={styles.imageContainer} >
            <Image style={styles.image} source={this.props.imagePath}/>
          </View >
          <View style={styles.infoContainer} >
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.price}>Rs.{this.props.price}</Text>
            <Text style={styles.location}>{this.props.location}</Text>
          </View>
          <TouchableOpacity style={styles.removeBtn} >
            <Feather name={'more-vertical'} color={'black'} size={responsiveHeight(4)}/> 
          </TouchableOpacity>
        </View>
      )
    }
  }

export default class DeliveredOrders extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return ( 
      <View style={{flex:1}}>
        <ScrollView>
              <Item title={'Wagon R'} price={'1,200,000'} location={'Islamabad,Pakistan'} imagePath={require('../../../Images/43.jpg')} />
              <Item title={'Wagon R'} price={'1,200,000'} location={'Islamabad,Pakistan'} imagePath={require('../../../Images/43.jpg')} />
              <Item title={'Wagon R'} price={'1,200,000'} location={'Islamabad,Pakistan'} imagePath={require('../../../Images/43.jpg')} />
              <Item title={'Wagon R'} price={'1,200,000'} location={'Islamabad,Pakistan'} imagePath={require('../../../Images/43.jpg')} />
              <Item title={'Wagon R'} price={'1,200,000'} location={'Islamabad,Pakistan'} imagePath={require('../../../Images/43.jpg')} />
              <Item title={'Wagon R'} price={'1,200,000'} location={'Islamabad,Pakistan'} imagePath={require('../../../Images/43.jpg')} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    box:{
      flex: 1,
      flexDirection:'row',
      backgroundColor:'white',
      borderColor: '#DCDCDC',
      borderBottomWidth: responsiveWidth(1),
      paddingVertical:responsiveHeight(1),
      paddingHorizontal:responsiveWidth(3)
    
    },
    imageContainer:{
      flex: 2.5,
      justifyContent:'center',
      alignItems:'center',
      resizeMode:'contain',
      marginRight:responsiveWidth(4)
    },
    image:{
      flex:1,
      width: responsiveWidth(49),
      height:responsiveHeight(20),
      resizeMode:'contain'
    },
    infoContainer:{
      flex: 2, 
      justifyContent:'center',
      paddingVertical:responsiveHeight(2),
    },
    title:{
      flex:1,
      fontSize:responsiveFontSize(2),
      justifyContent:'center'
    },
    price:{
      flex:1,
      fontSize:responsiveFontSize(2),
      color:"green",
      justifyContent:'center'
    },
    location:{
      flex:1,
      fontSize:responsiveFontSize(2),
      justifyContent:'center'
    },
    removeBtn:{
      flex:0.3,
      alignItems:'center'
    }
  });  