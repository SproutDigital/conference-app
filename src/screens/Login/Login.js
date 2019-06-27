'use strict';

import React, {Component} from 'react';
 import { View ,Text, Image,StyleSheet, ScrollView, Animated, Keyboard, KeyboardAvoidingView,Platform} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert, SubmitButton} from '../../components';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL }  from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {isEmailValid, postRoute, LoginEndpoint, saveToken, isEmpty} from '../../utils';
import Toast from 'react-native-easy-toast';
import colors from '../../assets/colors';
import Curve from './Curve';
import { NavigationActions, StackActions } from 'react-navigation';

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


  resetNavigationStack = () => {
    const navigateAction =  StackActions.reset({
       index: 0,
       actions: [
         NavigationActions.navigate({
           routeName: 'Profile',
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

     await postRoute (LoginEndpoint, data)
      .then((res) => {
        if (res.status == 'failure') {  
          return  this.setState({ 
            showLoading : false,
            title : 'Hello',
            message : res.message,
            showAlert : true,
          }); 
        }
        else {
          saveToken(res.token);
          this.setState({ 
            showLoading : false, 
          });
          return this.resetNavigationStack();    
        }
      });
  }
  
  render () {
    const { title, message, showAlert, showLoading } = this.state

    return(
    <View style={styles.container}> 
      <View style = {styles.curve}>
        <Curve/>
      </View>
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
                      inputType={'password'}
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
              
              <SubmitButton
                title={'Log in'}
                disabled={!this.toggleButtonState()}
                onPress={this.handleSignIn}
                imgSrc={require('../../assets/images/add_peopl.png')}
                btnStyle={styles.buttonWithImage}
                imgStyle={StyleSheet.flatten(styles.iconDoor)}
                titleStyle={StyleSheet.flatten(styles.buttonTxt)}
              />

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

