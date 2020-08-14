import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SuperAdminDashboard from '../screens/superAdminDashboard'
import NewMarketeer from '../screens/newMarketeer'
import NewOutlet from '../screens/newOutlet'
import NewMarketeerAdmin from '../screens/newMarketeerAdmin'
import LocationPicker from '../screens/locationPicker'

const SuperAdminNavigator = createStackNavigator(
    {
        SuperAdminDashboard:SuperAdminDashboard,
        NewMarketeer:NewMarketeer,
        NewMarketeerAdmin:NewMarketeerAdmin,
        NewOutlet:NewOutlet,
        LocationPicker:LocationPicker,
    },
    {
        defaultNavigationOptions:
        {
            header: null
        }
    }
);

const SuperAdminContainer = createAppContainer(SuperAdminNavigator);

export default class SuperAdminStack extends React.Component {
    render() {
        return <SuperAdminContainer />;
    }
}