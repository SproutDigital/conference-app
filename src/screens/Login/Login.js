'use strict';

import React, {Component} from 'react';
 import { View ,Text, Image,StyleSheet, ScrollView, Animated, Keyboard, KeyboardAvoidingView,Platform} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert, SubmitButton} from '../../components';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL }  from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { saveProfile} from '../../utils';
import Toast from 'react-native-easy-toast';
import colors from '../../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUsernameValid: false,
      isPasswordValid: false,
      showAlert: false,
      showLoading: false,
      username : '',
      title: '',
      message: '',
      
    };
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);

  }

   async componentWillMount () {

    if (Platform.OS=='ios'){
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }
    else{
      this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };


  keyboardDidShow = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardDidHide = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT,
    }).start();
  };
  onBlur() {
  }
 

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }
  handleSignIn = () => {
    alert('You Clicked me!')
  } 

  handleEmailChange = (username) => {
    if(username.length > 0) {
      this.setState({
        isUsernameValid: true,
        username : username
      });
    }
    else {
      if (username.length < 1) {
        this.setState({
          isUsernameValid : false
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
    const { isUsernameValid, isPasswordValid} = this.state;

    if ( isUsernameValid && isPasswordValid) {
      return true;
    } 
    else {
      return false;
    }
  }

  handleRegistration = () => {
    return this.props.navigation.navigate('Register');
  }
  handleForgetPassword = () => {
    return this.props.navigation.navigate('ForgetPassword');
  }
  
  render () {
    const { title, message, showAlert, showLoading } = this.state

    return(
    <View style={styles.container}> 

      <Text style={styles.logoTxt} >
        ignite
      </Text>
        
        <ScrollView style={{flex:1}}>
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="padding"
            >
            <View style = {styles.textinputCont}>
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
                  text = {'Log in'}
                  onPress={this.handleSignIn}
                />
                <Image
                  source={require('../../assets/images/loginIcon.png')}
                  style={StyleSheet.flatten(styles.iconDoor)}/> 
              </TouchableOpacity>

            </View>
              
            <SingleButtonAlert
              title = {title} 
              message = {message}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showAlert}
            />
          </KeyboardAvoidingView>
        </ScrollView>
        <View style = {StyleSheet.flatten(styles.signupLinkView)}>
          <DisplayText
            text={'Forgot Password?'}
            styles = {styles.forgotPwd}
            onPress = {this.handleForgetPassword}
          />
          
        </View>
     </View>
   )
   
  }
  
} 

