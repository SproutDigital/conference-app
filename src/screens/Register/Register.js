'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, StyleSheet, KeyboardAvoidingView,} from 'react-native';
import {DisplayText, InputField } from '../../components';
import colors from '../../assets/colors'
import styles from './styles';


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state ={
      password : '',
      email : '',
      name: '',
      isEmailValid : false,
      isPasswordValid : false,
      isNameValid : false,
      showAlert : false,
      message : '',
      refreshing: false,

    }
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
  handleEmailChange = (name) => {
    if(name.length > 0) {
      this.setState({
        isNameValid: true,
        name : name
      });
    }
    else {
      if (name.length < 1) {
        this.setState({
          isNameValid : false
        });
      }
    }
  }

  handlePasswordChange = (password) => {
    if (password.length > 0) {
      this.setState({
        isPasswordValid : true,
        password: password
      });
    }
    else {
      if ( password.length < 1 ) {
        this.setState({
          isPasswordValid : false
        })
      }
    }
  }

  toggleButtonState = () => {
    const { isEmailValid, isPasswordValid, isNameValid} = this.state;

    if ( isEmailValid && isNameValid && isPasswordValid) {
      return true;
    } 
    else {
      return false;
    }
  }


  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <ScrollView style={{flex:1}}>
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="padding"
            >
            <View style = {styles.textinputCont}>
              <View style = {styles.textInputView}> 
                <Image
                  source={require('../../assets/images/name.png')}
                  style={StyleSheet.flatten(styles.iconForm)}/> 
                    <InputField
                      placeholder={'Name'}
                      placeholderTextColor = {colors.blackShade}
                      textColor={colors.blackShade}
                      inputType={'email'}
                      keyboardType={'default'}
                      onChangeText = {this.handleNameChange}
                      autoCapitalize = "none"
                      height = {40}
                      width = {'90%'}
                      borderWidth = {1}
                      borderColor = {colors.white}
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
                      keyboardType={'email'}
                      onChangeText = {this.handleEmailChange}
                      autoCapitalize = "none"
                      height = {40}
                      width = {'90%'}
                      borderWidth = {1}
                      borderColor = {colors.white}
                  /> 
              </View>
              <View style = {styles.textInputView}> 
                <Image
                  source={require('../../assets/images/padlock.png')}
                  style={StyleSheet.flatten(styles.iconForm)}/> 
                    <InputField
                      placeholder={'Password'}
                      placeholderTextColor = {colors.blackShade}
                      textColor={colors.blackShade}
                      inputType={'name'}
                      keyboardType={'default'}
                      onChangeText = {this.handlePasswordChange}
                      autoCapitalize = "none"
                      height = {40}
                      width = {'90%'}
                      borderWidth = {1}
                      borderColor = {colors.white}
                  /> 
              </View>
            </View>         
            <View style = {styles.btnView}>

              {/* <SubmitButton
                title={'LOGIN'}
                
                // disabled={!this.toggleButtonState()}
                onPress={this.handleSignIn}
              /> */}
              <TouchableOpacity 
                onPress={this.handleSignIn}
                style = {styles.buttonWithImage}>
                <DisplayText
                  styles = {StyleSheet.flatten(styles.buttonTxt)}
                  text = {'Sign Up'}
                  onPress={this.handleSignIn}
                />
                <Image
                  source={require('../../assets/images/add_peopl.png')}
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

              <ProgressDialog
                visible={showLoading}
                title="Processing"
                message="Please wait..."
              />
              <SingleButtonAlert
                title = {title} 
                message = {message}
                handleCloseNotification = {this.handleCloseNotification}
                visible = {showAlert}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
    </SafeAreaView>
    
   )
  }
} 
