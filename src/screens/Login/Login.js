'use strict';

import React, {Component} from 'react';
 import { View , StyleSheet, ScrollView, Animated, Keyboard, KeyboardAvoidingView,Platform} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert, SubmitButton} from '../../components';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL }  from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { saveProfile } from '../Utils/Utils';
import Toast from 'react-native-easy-toast';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUsernameValid: false,
      isPasswordValid: false,
      showAlert: false,
      showLoading: false,
      username : '',
      passwordb: '',
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
  handleSignIn = async() => {
    const { username, password, } = this.state;

    this.setState({
      showLoading: true,
    });

    this.props.loginMutation({
      variables : {
        username, password, 
      }
    })
    .then(data => {
      let token = data.data.signIn.token,
        role = data.data.signIn.user.role
      
      if(role !== 'user') {
        return this.setState({
          showLoading : false,
          title : 'Hello',
          showAlert : true,
          message: 'You re not Authorized to Use this App'
        });
      }

      this.setState({
        showLoading : false
      });
      saveProfile(token)
       return this.refs.toast.show('Login Successful', 300, ()=>{
        this.props.navigation.navigate('Navigations')
       });
       
    })
    .catch(err => {
      return  this.setState({ 
        showLoading : false,
        title : 'Hello',
        message : err.message.split(':')[1],
        showAlert : true,
      });
    })
  }


  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }

  handleUsernameChange = (username) => {
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
  

  render () {
    const { title, message, showAlert, showLoading } = this.state

    return(
    <View style={styles.container}> 
      <Animated.Image source={require('../../assets/images/icon.png')} style={[styles.logo, { height: this.imageHeight }]} />
        <ScrollView style={{flex:1}}>
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="padding"
            >

            <InputField
              placeholder={'Email or Phone'}
              inputType = {'email'} 
              onChangeText ={this.handleUsernameChange}
              onBlur={this.onBlur}
            />

            <InputField
              placeholder={'Password'}
              inputType = {'password'} 
              onChangeText ={this.handlePasswordChange}
              onBlur={this.onBlur}
            />
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
                title={'LOGIN'}
                disabled={!this.toggleButtonState()}
                onPress={this.handleSignIn}
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
            text={'Dont have an account? Sign Up '}
            styles = {styles.signupText}
            onPress = {this.handleRegistration}
          />
        </View>
     </View>
   )
   
  }
  
} 

const loginMutation = gql`
  mutation SignIn( $username: String!, $password: String!, ) {
    signIn( username : $username, password: $password){
      token
      user {
        company_name
        surname
        role
      }
    }
  }
`
export default compose(
  graphql(loginMutation, {
    name : 'loginMutation',
  })
)(Login);
