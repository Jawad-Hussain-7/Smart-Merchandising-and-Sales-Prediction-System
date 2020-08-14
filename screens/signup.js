import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import PostButton from '../components/PostButton/postButton'

import { signup } from '../utility/authUtility'
import { setUserFirestoreObj } from '../utility/firestoreUtility'
//import * as admin from 'firebase-admin'

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: 'Laddan', lastName: 'Jafri', password: '11111111',
            type: 'Super Admin', account: 'local',
        }
    }

    singUpAdmin = async () => {
        /*let email='jawadhussain7@yahoo.com'
        await signup(email, this.state.password, this.state.firstName + ' ' + this.state.lastName).then(async () => {
            await setUserFirestoreObj(this.state)
        }).catch(err => console.log(err))*/
        /*admin.auth().updateUser(Y6BrZJ17xRXBe6f2mZDdW96FgUx2, {
            emailVerified: true,
        }).then(() => console.log('done')).catch(er => console.log(er))*/
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <PostButton buttonText={'SIGNUP'} action={this.singUpAdmin} />
                </View>
                <View style={{ flex: 4 }} />
            </View>
        )
    }
}