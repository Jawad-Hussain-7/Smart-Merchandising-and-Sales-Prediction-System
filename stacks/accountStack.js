import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Account from '../screens/account'
import EditProfile from '../screens/editProfile'
import ChangePassword from '../screens/changePassword'
import EditOutlet from '../screens/editOutlet'
import LocationPicker from '../components/LocationPicker/locationPicker'

const AccountNavigator = createStackNavigator(
    {
        Account: Account,
        EditProfile: EditProfile,
        ChangePassword: ChangePassword,
        EditOutlet: EditOutlet,
        LocationPicker: LocationPicker,
    },
    {
        defaultNavigationOptions:
        {
            header: null
        }
    }
);

const AccountContainer = createAppContainer(AccountNavigator);

export default class AccountStack extends React.Component {
    render() {
        return <AccountContainer />;
    }
}