'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {DisplayText, InputField, SubmitButton, Preloader, SuccessAlert, ErrorAlert } from '../../components';
import colors from '../../assets/colors';
import styles from './styles';
import {isEmailValid, sendRoute, RegisterEndpoint, getExpoToken, isEmpty} from '../../utils';
import WomanSvg from './WomanSvg';
import { NavigationActions, StackActions } from 'react-navigation';
import CheckBox from 'react-native-check-box';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state ={
      password : '',
      email : '',
      name: '',
      role: '',
      isEmailValid : false,
      isPasswordValid : false,
      isNameValid : false,
      message : '',
      successMessage : '',
      errorMessage : '',
      showSuccessAlert : false,
      showErrorAlert : false,
      refreshing: false,
      showLoading: false,
      role: '',
      isActive: false,
      isEmailFocused: false,
      isNameFocused:false,
      isPasswordFocused:false,
      isChecked: false,
    }

    this.fullname = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();

  }

  handleCheckBox = () => {
    this.setState(prevState=>({
        isChecked:!prevState.isChecked,
      })
    )
  }

  resetNavigationStack = () => {
   const navigateAction =  StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      ],
    });
    this.props.navigation.dispatch(navigateAction);

  }

  handleLoginRoute = () => {
      this.props.navigation.navigate('Login');
    //this.props.navigation.navigate('DashBoard');
  }

  handleFocus = () => this.setState({isFocused: true})

  handleBlur = () => this.setState({isFocused: false})

  handleNameChange = (name) => {

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

  handleCloseNotification = () => {
    return this.setState({
       showSuccessAlert : false,
       showErrorAlert : false
     })
   }

  toggleButtonState = () => {
    const { isEmailValid, isPasswordValid, isNameValid} = this.state;

    if (isEmailValid && isNameValid && isPasswordValid) {
      return true;
    } 
    else {
      return false;
    }
  }

  handleRegistration = async()=>{
    const {email, name, password, isChecked} = this.state;
    let expoToken = await getExpoToken();

    if(isEmpty(name)) {
      return this.setState({
        showErrorAlert:true,
        errorMessage: 'Enter Valid Name'
      })
    }
    else if(!isEmailValid(email)) {
      return this.setState({
        showErrorAlert:true,
        errorMessage: 'Invalid Email Address'
      })
    }
    else if(isEmpty(password)) {
      return this.setState({
        showErrorAlert:true,
        errorMessage: 'Enter Valid Password'
      })
    }
    else if(!isChecked) {
      return this.setState({
        showErrorAlert:true,
        errorMessage: 'Please check the Box to Continue'
      })
    }
    
    this.setState({
      showLoading: true,
    });

    let data = await JSON.stringify({
      'password' : password, 
      'email' : email.toLowerCase(), 
      'name' : name, 
      'expo_token' : expoToken,
      'isVerified' : true,
    });

     await sendRoute (RegisterEndpoint, data)
      .then((res) => {
        if (res.status !== 'success') {  
          return  this.setState({ 
            showLoading : false,
            title : 'Hello',
            errorMessage : res.message,
            showErrorAlert : true,
          }); 
        }
        else {
          //saveEmail(email);
          this.setState({ 
            showLoading : false, 
          });
          return this.resetNavigationStack();    
        }
      });
  }

  render () {
    const {showLoading, isChecked, successMessage, errorMessage, showSuccessAlert, showErrorAlert} = this.state;
    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default"/>
             
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior = 'padding'> 
              <View style= {{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={StyleSheet.flatten(styles.logoIcon)}/> 
              </View>
              <View>
                <View style = {[styles.textInputView,{ borderColor: this.state.isNameFocused
                 ? colors.green
                 : colors.whiteShade}]}> 
                  <Image
                    source={require('../../assets/images/name.png')}
                    style={StyleSheet.flatten(styles.iconForm)}/> 
                  <InputField
                    placeholder={'Full Name'}
                    placeholderTextColor = {colors.blackShade}
                    textColor={colors.blackShade}
                    inputType={'text'}
                    onChangeText = {this.handleNameChange}
                    autoCapitalize = "words"
                    height = {40}
                    width = {'90%'}
                    borderWidth = {1}
                    borderColor = {colors.white}
                     returnKeyType = {"next"}
                     blurOnSubmit={false}
                     onFocus={()=>this.setState({isNameFocused:true})}
                     onBlur={()=>this.setState({isNameFocused:false})}
                     onSubmitEditing={() => { 
                       this.email && this.email.focus()
                     }}
                    /> 
                </View>
                <View style = {[styles.textInputView,{ borderColor: this.state.isEmailFocused
                 ? colors.green
                 : colors.whiteShade}]}> 
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
                    borderColor = {colors.white}
                    refs={(input) => { this.email = input; }}
                    returnKeyType = {"next"}
                     blurOnSubmit={false}
                     onFocus={()=>this.setState({isEmailFocused:true})}
                    onBlur={()=>this.setState({isEmailFocused:false})}
                     onSubmitEditing={() => { 
                       this.password && this.password.focus()
                     }}
                    /> 
                </View> 
                <View style = {[styles.textInputView,{ borderColor: this.state.isPasswordFocused
                 ? colors.green
                 : colors.whiteShade}]}> 
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
                    borderColor = {colors.white}
                    refs={(input) => { this.password = input; }}
                     returnKeyType = {"done"}
                     blurOnSubmit={false}
                     onFocus={()=>this.setState({isPasswordFocused:true})}
                    onBlur={()=>this.setState({isPasswordFocused:false})}
                     onSubmitEditing={() => { 
                      this.handleRegistration();
                     }}
                    /> 
                </View>
                
              </View>   
              <View style = {StyleSheet.flatten(styles.checkBoxView)}>
              <CheckBox
                style={styles.checkBox}
                onClick={this.handleCheckBox}
                isChecked={isChecked}
                // rightText={"I agree to the"}
              />
              <DisplayText
                text={'By continuing, you agree to our terms, \nconditions and privacy policy.'}
                styles = {styles.termCondition}
                onPress = {this.handleLogin}
              />
            </View>
                  
              <View style = {styles.btnView}>
                <SubmitButton
                  title={'Sign Up'}
                  disabled={!this.toggleButtonState()}
                  onPress={this.handleRegistration}
                  imgSrc={require('../../assets/images/add_peopl.png')}
                  btnStyle={styles.buttonWithImage}
                  imgStyle={StyleSheet.flatten(styles.iconDoor)}
                  titleStyle={StyleSheet.flatten(styles.buttonTxt)}
                />
                
                <View style = {StyleSheet.flatten(styles.signupLinkView)}>
                  <DisplayText
                    text={'Already have an Account? '}
                    styles = {styles.signupText}
                    onPress = {this.handleLoginRoute}
                  />
                  <DisplayText
                    text={'Log In'}
                    styles = {styles.createAccount}
                    onPress = {this.handleLoginRoute}
                  />
                </View>
                
                <Preloader
                  modalVisible={showLoading}
                  animationType="fade"
                />
               
                <SuccessAlert
                  title = {'Success!'} 
                  message = {successMessage}
                  handleCloseNotification = {this.handleCloseNotification}
                  visible = {showSuccessAlert}
                />

                <ErrorAlert
                  title = {'Error!'} 
                  message = {errorMessage}
                  handleCloseNotification = {this.handleCloseNotification}
                  visible = {showErrorAlert}
                />
              </View>
              {/* </ScrollView> */}
        </KeyboardAvoidingView>
        <View style = {styles.footerView} >
          <WomanSvg/>
        </View>
      </SafeAreaView>
    )
  }
}

