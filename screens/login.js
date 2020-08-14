import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  YellowBox
} from 'react-native';

import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient'

import { login } from '../utility/authUtility'
import * as firebase from 'firebase'
import 'firebase/firestore'

import DialogBox from '../components/DialogBox/dialogBox'
import DefaultTextInput from '../components/DefaultTextInput/defaultTextInput'
import PostButton from '../components/PostButton/postButton'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '', password: '',

      errem: false, errpass: false,

      formEmptyDialog: false, formErrorDialog: false,
      loginDialog: false, loginMessage: '',
    }
    this.initialState = this.state
    this.isFormEmpty = this.isFormEmpty.bind(this)
    this.isErrorFree = this.isErrorFree.bind(this)
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.disableYellowBox = true;
  }

  emailPasswordLogin = async () => {
    if (!this.isFormEmpty() && this.isErrorFree()) {
      await login(this.state.email, this.state.password).then(async () => {
        var user = firebase.auth().currentUser;
        if (user) {
          await firebase.firestore().collection('Users').where('userID', '==', user.uid).get().then(snapshots => {
            if (snapshots.empty)
              console.log('empty')
            snapshots.docs.forEach(doc => {
              let obj = doc.data()
              console.log(obj.type)
              if (obj.type == 'Super Admin')
                this.props.navigation.navigate('SuperAdminDashboard')
              else if (obj.type = 'Marketeer Admin') {
                console.log()
                this.props.navigation.navigate('MarketeerAdminDashboard')
              }
              else {
                this.setState({ loginMessage: "Invalid Email or Password" })
                this.setState({ loginDialog: true })
              }
              this.setState(this.initialState)
            })
          }).catch(err => { throw err })
        }
        else {
          firebase.auth().signOut()
          this.props.navigation.navigate('EmailVerification')
        }
      }).catch(error => {
        console.log(error)
        this.setState({ loginMessage: error.message })
        this.setState({ loginDialog: true })
      })
    }
  }

  isFormEmpty = () => {
    if (this.state.email != '' && this.state.password != '')
      return false
    this.setState({ formEmptyDialog: true })
    return true
  }

  isErrorFree = () => {
    if (!this.state.errem && !this.state.errpass)
      return true
    this.setState({ formErrorDialog: true })
    return false
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <DialogBox resetState={() => this.setState({ formErrorDialog: false })} showDialog={this.state.formErrorDialog} title={'Login Failed'} description={'The form has not been filled correctly'} />
        <DialogBox resetState={() => this.setState({ formEmptyDialog: false })} showDialog={this.state.formEmptyDialog} title={'Login Failed'} description={'Please fill the form in order to continue'} />
        <DialogBox resetState={() => this.setState({ loginDialog: false })} showDialog={this.state.loginDialog} title={'Login Failed'} description={this.state.loginMessage} />

        <View style={{ flex: 0.8 }}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.3, y: 0 }} colors={['#008080', '#4c516d']} style={styles.gradient}>
            <View style={styles.triangleContainer}>
              <View style={styles.triangle}></View>
            </View>
          </LinearGradient>
        </View>

        <View style={{ flex: 0.8, alignItems: 'center', marginTop: responsiveHeight(-15), position: 'relative', zIndex: 3 }}>
          <Image style={styles.logo} source={require('../images/x.png')}></Image>
        </View>

        <View style={{ flex: 1, alignItems: 'center', marginTop: responsiveHeight(-5) }}>
          <DefaultTextInput marginVertical={responsiveHeight(2)} name={'Email'} value={this.state.email} errorMessage={'Invalid email address format'} setErrorState={(val) => this.setState({ errem: val })} setValueState={(val) => this.setState({ email: val })} regex={/[A-Za-z]+([A-Za-z0-9]|[.]|[_])*[@][A-Za-z]+[.]com$/} width={90} />
          <DefaultTextInput marginVertical={responsiveHeight(1)} name={'Password'} value={this.state.password} errorMessage={'Password must contain atleast 8 characters'} setErrorState={(val) => this.setState({ errpass: val })} setValueState={(val) => this.setState({ password: val })} regex={/^.{8,30}$/} width={90} secureTextEntry={true} />
        </View>

        <View style={{ flex: 0.1, alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: responsiveHeight(-8) }}>
          <Text onPress={() => { this.setState(this.initialState); this.props.navigation.navigate('ForgetPassword') }} style={styles.forgetPassword}>Forgot your password?</Text>
        </View>

        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
          <PostButton flexSize={1} buttonText={'LOGIN'} action={this.emailPasswordLogin} />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  gradient: {
    position: 'relative',
    zIndex: 1,
    flex: 1
  },
  triangleContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'transparent'
  },
  triangle: {
    borderTopWidth: responsiveWidth(0),
    borderRightWidth: responsiveWidth(50),
    borderBottomWidth: responsiveWidth(25),
    borderLeftWidth: responsiveWidth(50),
    borderTopColor: 'transparent',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent'
  },
  logo: {
    flex: 1,
    width: responsiveWidth(40),
    height: responsiveHeight(20),
    resizeMode: 'contain'
  },
  forgetPassword: {
    color: '#4c516d',
    fontSize: responsiveFontSize(1.6),
    marginHorizontal: responsiveWidth(8)
  },
})