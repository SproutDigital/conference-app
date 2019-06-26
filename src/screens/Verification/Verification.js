'use strict';
import React, {Component} from 'react';
import { TouchableOpacity, View, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import {DisplayText, SingleButtonAlert, SubmitButton} from '../../components';
import styles from './styles';
import OtpInputs from 'react-native-otp-inputs';
import colors from '../../assets/colors';
import { postRoute, getRoute, getEmail, VerifyUserEndpoint, RequestNewTokenEndpoint, logout, VerificationStatusEndpoint} from '../../utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Verification extends Component {
  constructor(props) {
    super(props);

    this.state ={
      token : '',
      showAlert: false,
      showLoading: false,
      title: '',
      message: '',   
      email: '',
      message: '',
    }
  }
  async componentDidMount() {
    let email = await getEmail();
    this.setState({
      email
    });
    let { params } = this.props.navigation.state;
    if(params == undefined) {
      this.checkEmailVerification();
    }
    //logout();
  }

  resetNavigationStack = (location) => {
    const navigateAction =  StackActions.reset({
       index: 0,
       actions: [
         NavigationActions.navigate({
           routeName: location,
         }),
       ],
     });
     this.props.navigation.dispatch(navigateAction);
 
   }

  handleBack = () => {
    this.props.navigation.goBack();
  }

  handleCloseVerification = () => {
    return this.props.navigation.navigate('Register')
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }

  checkEmailVerification = async() => {
    this.setState({
      showLoading: true,
      resolved: true,
    });

    let data = await JSON.stringify({
      'email' : this.state.email.toLowerCase(), 
    });

     await postRoute (VerificationStatusEndpoint, data)
      .then((res) => {
        console.log({res})
        if (res.status !== 'success') {  
          return  this.setState({ 
            showLoading : false,
            title : 'Hello',
            message: res.message,
            showAlert: true
          }); 
        }
        else {
          if(res.verified) {
            this.setState({ 
              showLoading : false, 
            });
            return this.resetNavigationStack('Profile'); 
          }
          else {
            return this.setState({ 
              showLoading : false, 

            });
          }   
        }
      });
  }

  submitVerificationCode = () => {
    this.setState({
      showLoading: true,
    });

    getRoute(`${VerifyUserEndpoint}${this.state.token}`, null)
      .then((res) => {
        console.log({res})
        if (res.status == 'failure') { 
          if(res.message== 'Acccount still not verified. Request for new token')  {
            return this.resetNavigationStack('LinkExpire'); 
          }
          else {
            return this.setState({ 
              showLoading : false,
              showAlert: true,
              title: 'Hello',
              message: res.message
            }); 
          }
          
        }
        else{
          this.setState({ 
            showLoading : false, 
          }); 
          return this.resetNavigationStack('Profile'); 
        }  
      })
      .catch((res) => {
        this.setState({
          showLoading : false,
          messageKey : 'Message',
          errorMessage : res.message,
          visible : true,
        });

      })

  }


  handleNewTokenRequest = async() => {
    this.setState({
      showLoading: true,
      resolved: true,
    });

    let data = await JSON.stringify({
      'email' : this.state.email.toLowerCase(), 
    });

     await postRoute (RequestNewTokenEndpoint, data)
      .then((res) => {
        if (res.status !== 'success') { 
          return  this.setState({ 
            showLoading : false,
            title : 'Hello',
            message: res.message,
            showAlert: true
          }); 
        }
        else {
          this.setState({ 
            showLoading : false, 
            showAlert: true,
            title : 'Hello',
            message: res.message,
          });
        }
      });
  }

 
render() {
  const {showAlert, showLoading, message, email} = this.state;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        onPress = {this.handleCloseVerification}
        style = {styles.closeView}>
        <Image
          source={require('../../assets/images/close.png')}
          style={StyleSheet.flatten(styles.closeIcon)}/>   
      </TouchableOpacity>
      <View style = {styles.textView}>
        <DisplayText
          text={' Verification Code Sent'}
          styles = {styles.Verification}
        />
        <DisplayText
          text={'Enter 6 digit code sent to'}
          styles = {styles.msgText}
        />
        <DisplayText
          text={email}
          styles = {styles.msgText2}
        />
      </View>

        {/* <OtpInputs /> */}

        <KeyboardAvoidingView style={styles.optView}>
          <OtpInputs handleChange={token => 
          this.setState({
            token
          })} 
          focusedBorderColor = {colors.green_background}
          numberOfInputs={6} 
          keyboardType = {'default'}/>
          <View style = {styles.btnView}>
            <SubmitButton
              title={'Verify'}
              onPress={this.submitVerificationCode}
              imgSrc={require('../../assets/images/add_peopl.png')}
              btnStyle={styles.buttonWithImage}
              imgStyle={StyleSheet.flatten(styles.iconDoor)}
              titleStyle={StyleSheet.flatten(styles.buttonTxt)}
              disabled={false}
            />
            
             <View style = {styles.textView}>
              <DisplayText
                text={'Didn\'t get code?'}
                styles = {styles.msgText}
              />
              <DisplayText
                text={'Resend'}
                styles = {styles.resend}
                onPress = {this.handleNewTokenRequest}            
              />
            </View> 
            {/* <Toast
              ref="toast"
              style={{backgroundColor: 'green'}}
              position='bottom'
              positionValue={200}
              fadeInDuration={750}
              fadeOutDuration={5000}
              opacity={0.8}
              textStyle={{color:'white'}}
            /> */ }
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
        </KeyboardAvoidingView>

      </SafeAreaView>
    );
  }
}