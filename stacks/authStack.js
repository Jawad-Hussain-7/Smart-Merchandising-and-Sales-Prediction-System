import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/login'
import ForgetPassword from '../screens/forgetPassword'
import Signup from '../screens/signup'
import EmailVerification from '../screens/emailVerification'

const AuthNavigator = createStackNavigator(
    {
        Login:Login,
        ForgetPassword:ForgetPassword,
        EmailVerification:EmailVerification,
        Signup:Signup
    },
    {
        defaultNavigationOptions:
        {
            header: null
        }
    }
);

const AuthContainer = createAppContainer(AuthNavigator);

export default class AuthStack extends React.Component {
    render() {
        return <AuthContainer />;
    }
}