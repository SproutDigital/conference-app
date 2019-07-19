'use strict';

import React, {Component} from 'react';
 import { View, Image,StyleSheet, Animated, Keyboard, KeyboardAvoidingView,Platform} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert, SubmitButton, Preloader} from '../../components';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL }  from './styles';
import {isEmailValid, sendRoute, LoginEndpoint, saveProfile, isEmpty} from '../../utils';
import Toast from 'react-native-easy-toast';
import colors from '../../assets/colors';
import { NavigationActions, StackActions } from 'react-navigation';
import theme from '../../assets/theme';
import CheckBox from 'react-native-check-box';
import {connect} from 'react-redux';
import { addProfile } from '../../redux/actions/ProfileActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUsernameValid: false,
      isPasswordValid: false,
      showAlert: false,
      showLoading: false,
      isChecked: false,
      email : '',
      title: '',
      message: '',
      isEmailFocused:false,
      isPasswordFocused:false,
      
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
    this.setState(prevState=>({
        isChecked:!prevState.isChecked,
    })
    )
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
    const {email, password, isChecked} = this.state;
    if(!isEmailValid(email)) {
      return this.setState({
        showAlert:true,
        message: 'Invalid Email Address'
      });
    }
    else if(isEmpty(password)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Password'
      });
    }
    else if(!isChecked) {
      return this.setState({
        showAlert:true,
        message: 'Please check the Box to Continue'
      })
    }
    
    this.setState({
      showLoading: true,
    });

    let data = await JSON.stringify({
      'password' : password, 
      'email' : email.toLowerCase(), 
    });

     await sendRoute (LoginEndpoint, data)
      .then((res) => {
        if(typeof res.status == 'undefined') {
          this.props.setProfile(res.payload.profile);
          if(!res.payload.verified) {
            saveProfile(res.payload.id, res.payload.name, res.token, false);
            this.setState({ 
              showLoading : false, 
            });
            return this.resetNavigationStack('Verification');         
          }
          else if(res.payload.verified) {
            saveProfile(res.payload.id, res.payload.name, res.token, true);
            this.setState({ 
              showLoading : false, 
            });
            return this.props.navigation.navigate('OnBoard') ; 

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



   
  
  render () {
    const { title, message, showAlert, showLoading, isChecked } = this.state

    return(
    <View style={styles.container}> 
     
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding">
                 
          <View style = {styles.imageView}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={StyleSheet.flatten(styles.logoIcon)}/> 
          </View>
            <View>
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
                    keyboardType={'email'}
                    onChangeText = {this.handleEmailChange}
                    autoCapitalize = "none"
                    height = {40}
                    width = {'90%'}
                    borderWidth = {1}
                    blurOnSubmit={false}
                    borderColor = {theme.colorAccent}
                    returnKeyType = {"next"}
                    blurOnSubmit={false}
                    onFocus={()=>this.setState({isEmailFocused:true})}
                    onBlur={()=>this.setState({isEmailFocused:false})}
                    onSubmitEditing={() => { 
                      this.passwordRef && this.passwordRef.focus()
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
                    refs={(input) => { this.passwordRef = input; }}
                    returnKeyType={'done'}
                    blurOnSubmit={false}
                    onFocus={()=>this.setState({isPasswordFocused:true})}
                    onBlur={()=>this.setState({isPasswordFocused:false})}
                    onSubmitEditing={() => { 
                      this.handleSignIn();
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
                title={'Log in'}
                disabled={!this.toggleButtonState()}
                onPress={this.handleSignIn}
                imgSrc={require('../../assets/images/loginIcon.png')}
                btnStyle={styles.buttonWithImage}
                imgStyle={StyleSheet.flatten(styles.iconDoor)}
                titleStyle={StyleSheet.flatten(styles.buttonTxt)}
              />
              <View style = {StyleSheet.flatten(styles.signupLinkView)}>
                <DisplayText
                  text={'Forgot Password?'}
                  styles = {styles.forgotPwd}
                  onPress = {this.handleForgetPassword}/>
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
            <Preloader
              modalVisible={showLoading}
             animationType="fade"
            />
            <SingleButtonAlert
              title = {title} 
              message = {message}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showAlert}/>
        </KeyboardAvoidingView>
        {/* </ScrollView> */}

      </View>
    )
  } 
} 


const mapStateToProps = (state, ownProps) =>{
  return  {
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      setProfile: (data) =>{dispatch(addProfile(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

