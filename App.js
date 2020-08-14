import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Login from './screens/login'
import ForgetPassword from './screens/forgetPassword'
import DashboardTab from './stacks/dashboardTab'

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDsEm_Yl_SONM8q0hNgagOJAljYUUrbTRs",
  authDomain: "rixby-1.firebaseapp.com",
  databaseURL: "https://rixby-1.firebaseio.com",
  projectId: "rixby-1",
  storageBucket: "rixby-1.appspot.com",
  messagingSenderId: "563591331358",
  appId: "1:563591331358:web:110f520d9e77fdf34a780f",
  measurementId: "G-5Q960K46E9"
};
if(!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

const RootStack= createStackNavigator( //Navigation Stack
  {
    Login:Login,
    ForgetPassword:ForgetPassword,
    DashboardTab:DashboardTab,
  },
  {
    defaultNavigationOptions:
    {
      header:null
    }
  }
);
const AppNavigator=createAppContainer(RootStack)

export default class App extends Component {
  render(){
    return(
      <AppNavigator/>
    )
  }
}