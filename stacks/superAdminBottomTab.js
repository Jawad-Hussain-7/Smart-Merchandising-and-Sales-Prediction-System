import React, { Component } from "react";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import UserList from '../screens/userList'
import AdList from '../screens/adList'
import Settings from '../screens/settings'
import NewMarketeer from '../screens/newMarketeer'

const TabNavigator = createBottomTabNavigator(
{
    Users:{
        screen:UserList,
        navigationOptions:{
            tabBarLabel:"Users",
            tabBarIcon:({tintColor}) => (
                <MaterialCommunityIcons name={'account-tie'} color={tintColor} size={responsiveHeight(4)}/>
            )
        }
    },
    Ads:{
        screen:AdList,
        navigationOptions:{
            tabBarLabel:"Ads",
            tabBarIcon:({tintColor}) => (
                <FontAwesome name={'list-alt'} color={tintColor} size={responsiveHeight(3)}/>
            )
        }
    },
    Settings:{
        screen:Settings,
        navigationOptions:{
            tabBarLabel:"Settings",
            tabBarIcon:({tintColor}) => (
                <Ionicons name={'ios-settings'} color={tintColor} size={responsiveHeight(4)}/>
            )
        }
    },
    NewMarketeer:{
        screen:NewMarketeer,
        navigationOptions:{
            tabBarLabel:"New Marketeer",
            tabBarIcon:({tintColor}) => (
                <Ionicons name={'ios-settings'} color={tintColor} size={responsiveHeight(4)}/>
            )
        }
    },
},
{
    tabBarOptions:{
        activeTintColor: '#008080',
        inactiveTintColor:'#4c516d',
        showIcon:true,
        style:{
            backgroundColor:'white',
            borderWidth:0
        }
    }
}
);

const MainTab=createAppContainer(TabNavigator);

export default class SuperAdminButtomTab extends Component {
    render(){
      return(
        <MainTab/>
      )
    }
  }