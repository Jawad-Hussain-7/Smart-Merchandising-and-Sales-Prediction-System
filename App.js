import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './screens/login'
import ForgetPassword from './screens/forgetPassword'
import Signup from './screens/signup'
import SuperAdminDashboard from './screens/superAdminDashboard'
import MarketeerAdminDashboard from './screens/marketeerAdminDashboard'
import EmailVerification from './screens/emailVerification'
import NewMarketeer from './screens/newMarketeer'
import NewOutlet from './screens/newOutlet'
import NewMarketeerAdmin from './screens/newMarketeerAdmin'
import LocationPicker from './screens/locationPicker'
import HotAds from './screens/hotAds'
import UserProfile from './screens/userProfile'

import * as firebase from 'firebase'
import { decode, encode } from 'base-64'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

var firebaseConfig = {
  apiKey: "AIzaSyDsEm_Yl_SONM8q0hNgagOJAljYUUrbTRs",
  authDomain: "rixby-1.firebaseapp.com",
  databaseURL: "https://rixby-1.firebaseio.com",
  projectId: "rixby-1",
  storageBucket: "rixby-1.appspot.com",
  messagingSenderId: "563591331358",
  appId: "1:563591331358:web:5108babce75a8fec4a780f",
  measurementId: "G-63DZDGC1M0"
};

if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig)

const RootStack = createStackNavigator( //Navigation Stack
  {
    Login: Login,
    ForgetPassword: ForgetPassword,
    Signup: Signup,
    SuperAdminDashboard: SuperAdminDashboard,
    EmailVerification:EmailVerification,
    NewMarketeer:NewMarketeer,
    NewOutlet:NewOutlet,
    LocationPicker:LocationPicker,
    NewMarketeerAdmin:NewMarketeerAdmin,
    MarketeerAdminDashboard:MarketeerAdminDashboard,
    HotAds:HotAds,
    UserProfile:UserProfile,
  },
  {
    defaultNavigationOptions:
    {
      header: null
    }
  }
);
const AppNavigator = createAppContainer(RootStack)

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}