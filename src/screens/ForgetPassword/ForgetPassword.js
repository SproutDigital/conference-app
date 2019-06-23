'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert } from '../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-easy-toast';
import styles from './styles';
// import SvgUri from 'react-native-svg-uri';
import LockSvg from './LockSvg';


export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state ={
      email : '',
      isEmailValid : false,
      showAlert : false,
      message : '',
      refreshing: false,
      showLoading: false,
    }
  }

  handleLoginRoute = () => {
    this.props.navigation.navigate('Login')
  }

  handleEmailChange = (email) => {
    if(email.length > 0) {
      this.setState({
        isEmailValid: true,
        email : email
      });
    }
    else {
      if (email.length < 1) {
        this.setState({
          isEmailValid : false
        });
      }
    }
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
   }

  toggleButtonState = () => {
    const { isEmailValid, } = this.state;

    if (isEmailValid) {
      return true;
    } 
    else {
      return false;
    }
  }

  render () {
    const {showLoading, showAlert, message} = this.state;
    return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior = 'padding'> 
          <LockSvg/>
          <View style = {styles.titleTxtView}>
            <DisplayText
              styles = {StyleSheet.flatten(styles.topTxt)}
              text = {'Forgot password?'}
            />
            <DisplayText
              styles = {StyleSheet.flatten(styles.bottomTxt)}
              text = {'Enter your Registered Email Address '}
            />
          </View>
          <View style = {styles.textInputView}> 
            <Image
              source={require('../../assets/images/email.png')}
              style={StyleSheet.flatten(styles.iconForm)}/> 
            <InputField
              placeholder={'Email'}
              placeholderTextColor = {colors.blackShade}
              textColor={colors.blackShade}
              inputType={'email'}
              onChangeText = {this.handleEmailChange}
              autoCapitalize = "none"
              height = {40}
              width = {'90%'}
              borderWidth = {1}
              borderColor = {colors.white}/> 
          </View>
      
          <View style = {styles.btnView}>
            <TouchableOpacity 
              onPress={this.handleRegistration}
              style = {styles.buttonWithImage}>
              <DisplayText
                styles = {StyleSheet.flatten(styles.buttonTxt)}
                text = {'Reset'}
                onPress={this.handleRegistration}
              />
              <Image
                source={require('../../assets/images/settings.png')}
                style={StyleSheet.flatten(styles.iconDoor)}/> 
            </TouchableOpacity>
            <Toast
              ref="toast"
              style={{backgroundColor: 'green'}}
              position='bottom'
              positionValue={200}
              fadeInDuration={750}
              fadeOutDuration={5000}
              opacity={0.8}
              textStyle={{color:'white'}}
            /> 

            {/* <ProgressDialog
              visible={showLoading}
              title="Processing"
              message="Please wait..."
            />
            <SingleButtonAlert
              title = {'Hello'} 
              message = {message}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showAlert}
            /> */}
          </View>
          {/* </ScrollView> */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    
   )
  }
} 
