'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert, SubmitButton } from '../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-easy-toast';
import styles from './styles';
import {isEmailValid, postRoute, RegisterEndpoint, getExpoToken, saveEmail, isEmpty} from '../../utils';
import WomanSvg from './WomanSvg';
import { NavigationActions, StackActions } from 'react-navigation';

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
      showAlert : false,
      message : '',
      refreshing: false,
      showLoading: false,
      role: '',
      isActive: false,

    }
  }


  resetNavigationStack = (message) => {
   const navigateAction =  StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'ActivateEmail',
          params: {'message': message},
        }),
      ],
    });
    this.props.navigation.dispatch(navigateAction);

  }

  handleLoginRoute = () => {
    this.props.navigation.navigate('Login')
  }

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
       showAlert : false
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
    const {email, name, password, role} = this.state;
    let expoToken = await getExpoToken();

    if(isEmpty(name)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Name'
      })
    }
    else if(!isEmailValid(email)) {
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
      'name' : name, 
      'expo_token' : expoToken,
    });

     await postRoute (RegisterEndpoint, data)
      .then((res) => {
        console.log({res})
        if (res.status !== 'success') {  
          return  this.setState({ 
            showLoading : false,
            title : 'Hello',
            message : res.message,
            showAlert : true,
          }); 
        }
        else {
          saveEmail(email);
          this.setState({ 
            showLoading : false, 
          });
          return this.resetNavigationStack(res.message);    
        }
      });
  }
  
  render () {
    const {showLoading, showAlert, message, isActive} = this.state;
    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default"/>
       
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior = 'padding'> 
              <View>
                <View style = {styles.textInputView}> 
                  <Image
                    source={require('../../assets/images/name.png')}
                    style={StyleSheet.flatten(styles.iconForm)}/> 
                  <InputField
                    placeholder={'Full Name'}
                    placeholderTextColor = {colors.blackShade}
                    textColor={colors.blackShade}
                    inputType={'text'}
                    onChangeText = {this.handleNameChange}
                    autoCapitalize = "none"
                    height = {40}
                    width = {'90%'}
                    borderWidth = {1}
                    borderColor = {colors.white}/> 
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
                {/* <View style = {styles.textInputView}> 
                  <Image
                    source={require('../../assets/images/padlock.png')}
                    style={StyleSheet.flatten(styles.iconForm)}/> 
                  <Picker
                    selectedValue={this.state.role}
                    style={styles.textInputView}
                    onValueChange={role => this.setState({ role })}>
                    <Picker.Item label="attendee" value="attendee" />
                    <Picker.Item label="speaker" value="speaker" />
                    <Picker.Item label="sponsor" value="sponsor" />
                    <Picker.Item label="user" value="user" />

                  </Picker>
                </View> */}
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
                  title = {'Hello'} 
                  message = {message}
                  handleCloseNotification = {this.handleCloseNotification}
                  visible = {showAlert}
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
// const mapStateToProps = (state, ownProps) =>{
//   return  {
//       registered:true
//   }
// }
// const mapDispatchToProps = (dispatch) =>{
//   return{
//     onSignUp:(status) =>{dispatch(setRegistrationStatus(status))}
//   }
// }

//export default Register

