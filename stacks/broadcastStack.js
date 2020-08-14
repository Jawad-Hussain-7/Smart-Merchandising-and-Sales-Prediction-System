import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import BroadcastList from '../screens/boradcastList'
import BroadcastInfo from '../screens/broadcastInfo'
import Chat from '../screens/chat'

const BoradcastNavigator = createStackNavigator(
    {
        BroadcastList:BroadcastList,
        BroadcastInfo:BroadcastInfo,
        Chat:Chat,
    },
    {
        defaultNavigationOptions:
        {
            header: null
        }
    }
);

const BroadcastContainer = createAppContainer(BoradcastNavigator);

export default class BroadcastStack extends React.Component {
    render() {
        return <BroadcastContainer />;
    }
}