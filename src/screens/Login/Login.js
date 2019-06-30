'use strict';

import React, {Component} from 'react';
 import { View ,Text, Image,StyleSheet, ScrollView, Animated, Keyboard, KeyboardAvoidingView,Platform} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert, SubmitButton} from '../../components';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL }  from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {isEmailValid, sendRoute, LoginEndpoint, saveProfile, saveEmail, isEmpty} from '../../utils';
import Toast from 'react-native-easy-toast';
import colors from '../../assets/colors';
import { NavigationActions, StackActions } from 'react-navigation';
import theme from '../../assets/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box'
import * as Facebook from 'expo-facebook';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUsernameValid: false,
      isPasswordValid: false,
      showAlert: false,
      showLoading: false,
      email : '',
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

  handleCheckBox = () => {
    this.setState({
        isChecked:!this.state.isChecked
    })
  }

  resetNavigationStack = (location) => {
    const navigateAction =  StackActions.reset({
       index: 0,
       actions: [
         NavigationActions.navigate({
           routeName: location,
           params: 'login',
         }),
       ],
     });
     this.props.navigation.dispatch(navigateAction);
 
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
  
  handleEmailChange = (email) => {
    if(email.length > 0) {
      this.setState({
        isUsernameValid: true,
        email : email
      });
    }
    else {
      if (email.length < 1) {
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


  handleSignIn = async()=>{
    const {email, password} = this.state;
   // let expoToken = await getExpoToken();

    if(!isEmailValid(email)) {
      return this.setState({
        showAlert:true,
        message: 'Invalid Email Address'
      })
    }
    else if(isEmpty(password)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Password'
      })
    }
    
    this.setState({
      showLoading: true,
    });

    let data = await JSON.stringify({
      'password' : password, 
      'email' : email.toLowerCase(), 
    });

     await sendRoute (LoginEndpoint, data, 'POST')
      .then((res) => {
        console.log({'login res': res})
        this.setState({ 
          showLoading : false, 
        });

        if(typeof res.status == 'undefined') {
          this.setState({ 
            showLoading : false, 
          });
          if(!res.payload.verified) {
            saveEmail(res.payload.email);
            return this.resetNavigationStack('Verification');         
          }
          else if(res.payload.verified) {
            saveProfile(res.payload.id, res.payload.name, res.token);
            return this.resetNavigationStack('OnboardingProfile');    
          }
        } 
        else {
          this.setState({ 
            showLoading : false, 
            message: res.message,
            showAlert: true,
            title: 'Hello'
          });
        }
      });
    }

  checkVerificationStatus =()=>{

  }
  
  render () {
    const { title, message, showAlert, showLoading } = this.state

    return(
    <View style={styles.container}> 
      {/* <View style = {styles.curve}>
        <Curve/>
      </View> */}
      {/* <Text style={styles.logoTxt} >
        ignite
      </Text> */}
      
        <View style = {styles.imageView}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={StyleSheet.flatten(styles.logoIcon)}/> 
        </View>
        <ScrollView 
            style={{flex:1,}}
            showsVerticalScrollIndicator={false}>          
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="padding"
            >
            <View >
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
                    borderColor = {theme.colorAccent}
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
                    inputType={'password'}
                    onChangeText = {this.handlePasswordChange}
                    autoCapitalize = "none"
                    height = {40}
                    width = {'90%'}
                    borderWidth = {1}
                    borderColor = {colors.white}/> 
              </View>
            </View>

            <View style = {StyleSheet.flatten(styles.checkBoxView)}>
              <CheckBox
                style={styles.checkBox}
                onClick={this.handleCheckBox}
                isChecked={this.state.isChecked}
                // rightText={"I agree to the"}
              />
              <DisplayText
                text={'By continuing, you agree to our terms, \nconditions and privacy policy.'}
                styles = {styles.termCondition}
                onPress = {this.handleLogin}
              />
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
              
              <SubmitButton
                title={'Log in'}
                disabled={!this.toggleButtonState()}
                onPress={this.handleSignIn}
                imgSrc={require('../../assets/images/loginIcon.png')}
                btnStyle={styles.buttonWithImage}
                imgStyle={StyleSheet.flatten(styles.iconDoor)}
                titleStyle={StyleSheet.flatten(styles.buttonTxt)}
              />
              <View style = { styles.signWithView}>
                <DisplayText
                  text={'Or Sign up with?'}
                  styles = {styles.signupWith}
                  onPress = {this.handleForgetPassword}
                />
                <View style = {styles.socialIconView}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/linkedin.png')}
                      style={StyleSheet.flatten(styles.socialIcons)}/> 
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/twitter.png')}
                      style={StyleSheet.flatten(styles.socialIcons)}/> 
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/facebook.png')}
                      style={StyleSheet.flatten(styles.socialIcons)}/> 
                  </TouchableOpacity>
                </View>
              </View>
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

