import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AdList from '../screens/adList'
import Houses from '../screens/newHouseAd'
import Vehicles from '../screens/newVehicleAd'
import HardwareElectronics from '../screens/newElectronicHardwareAd'
import LocationPicker from '../screens/locationPicker'
import Deal from '../screens/deal'

const AdNavigator = createStackNavigator(
    {
        AdList: AdList,
        Houses: Houses,
        Vehicles: Vehicles,
        HardwareElectronics: HardwareElectronics,
        LocationPicker:LocationPicker,
        Deal:Deal
    },
    {
        defaultNavigationOptions:
        {
            header: null
        }
    }
);

const AdContainer = createAppContainer(AdNavigator);

export default class AdStack extends React.Component {
    render() {
        return <AdContainer />;
    }
}