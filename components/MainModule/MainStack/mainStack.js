import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Main from '../MainTab/maintab'

const mainStack= createStackNavigator( //Navigation Stack
    {
      Main:Main
    },
    {
      defaultNavigationOptions:
      {
        header:null
      }
    }
  );
  const MainNavigator=createAppContainer(mainStack)
  
  export default class MainStack extends Component {
    render(){
      return(
        <MainNavigator/>
      )
    }
  }