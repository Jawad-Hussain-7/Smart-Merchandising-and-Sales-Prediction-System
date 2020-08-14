import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Login from './components/MainModule/Login/login'
import Signup from './components/MainModule/Signup/signup'
import Tags from './components/MainModule/Tags/tags'
import Splashscreen from './components/MainModule/Splashscreen/splashscreen'
import ForgetPassword from './components/MainModule/ForgetPassword/forgetPassword'
import Main from './components/MainModule/MainTab/main'
import EmailVerification from './components/MainModule/EmailVerification/emailVerification'

const RootStack= createStackNavigator( //Navigation Stack
  {
    Login:Login,
    Tags:Tags,
    Main:Main,
    Splashscreen:Splashscreen,
    EmailVerification:EmailVerification,
    Signup:Signup,
    ForgetPassword:ForgetPassword,
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