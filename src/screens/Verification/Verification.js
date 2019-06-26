'use strict';
import React, {Component} from 'react';
import { TouchableOpacity, View, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import {DisplayText, SingleButtonAlert, SubmitButton, OtpInputs} from '../../components';
import styles from './styles';
import OtpInputs from 'react-native-otp-inputs'
import colors from '../../assets/colors';
import { VerificationEndpoint, postRoute } from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';


export default class Verification extends Component {
  constructor(props) {
    super(props);

    this.state ={
      otp : '',
      showAlert: false,
      showLoading: false,
      title: '',
      message: '',    
    }
  }
  componentDidMount () {

  }

  handleCloseVerification = () => {
    return this.props.navigation.navigate('Register')
  }
  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }
  handleSend = () => {
    this.setState({
      showLoading: true,
    });
    const {otp } = this.state,
    {navigation} = this.props,
    id = navigation.getParam('id', 'no_id'),
    phone = 'phone',
    endPoint = `${VerificationEndpoint}${id}/${phone}`;

    
    let data = JSON.stringify({
      'otp' : otp,
    });
    console.log({endPoint: endPoint});
    postRoute(endPoint, data)
      .then((res) => {
        console.log({resppp : res})
        if (typeof res.message !== 'undefined' ) {  
          return  this.setState({ 
            showLoading : false,
            title : 'Hello',
            message : res.message,
            showAlert : true,
          }); 
        }
        else{
          console.log({success : res})
          this.setState({ 
            showLoading : false, 
          }); 
          this.props.navigation.navigate('Verification');
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

    // return this.props.navigation.navigate('ResetCode')
  }
  handleResend = () => {

  }
render() {
  const {showAlert, showLoading, title, message} = this.state;
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
          text={'Enter Verification Code'}
          styles = {styles.Verification}
        />
        <DisplayText
          text={'A text message with 6 digit code'}
          styles = {styles.msgText}
        />
        <DisplayText
          text={'was send to your phone'}
          styles = {styles.msgText2}
        />
      </View>

        {/* <OtpInputs /> */}

        <KeyboardAvoidingView style={styles.optView}>
          <OtpInputs handleChange={code => 
          this.setState({
            otp : code,
          })} 
          focusedBorderColor = {colors.green_background}
          numberOfInputs={5} />
        </KeyboardAvoidingView>
        <View style = {styles.textView}>
          <DisplayText
            text={'Didn\'t get text?'}
            styles = {styles.msgText}
          />
          <DisplayText
            text={'RESENT'}
            styles = {styles.resend}
            onPress = {this.handleResend}            
          />
          <SubmitButton
            title={'Send'}
            onPress = {this.handleSend}
            buttonBorder = {styles.buttonBorder}
            titleStyle={styles.btnText}
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
      </SafeAreaView>
    );
  }
}