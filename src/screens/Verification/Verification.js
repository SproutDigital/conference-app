'use strict';
import React, {Component} from 'react';
import { TouchableOpacity, View, StyleSheet, SafeAreaView, Image} from 'react-native';
import {DisplayText, SingleButtonAlert, SubmitButton, Preloader} from '../../components';
import styles from './styles';
import OtpInputs from 'react-native-otp-inputs';
import colors from '../../assets/colors';
import { sendRoute, getRoute, VerifyUserEndpoint, updateVerification, logout, RequestNewTokenEndpoint} from '../../utils';
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
   // logout();
  
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
    //logout();
    return this.props.navigation.navigate('BoardingScreen')
  }

  handleCloseVerification = () => {
    return this.props.navigation.navigate('Register')
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }

  submitVerificationCode = async() => {
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
           updateVerification()
          return this.props.navigation.navigate('OnBoard'); 
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

     await sendRoute (RequestNewTokenEndpoint, data)
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


  handleOTPChange = (token) => {
    this.setState({ token})
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
          text={'Enter 4 characters sent to'}
          styles = {styles.msgText}
        />
        <DisplayText
          text={email}
          styles = {styles.msgText2}
        />
      </View>


         <View style={styles.optView}>
          <OtpInputs 
            handleChange={this.handleOTPChange}
            focusedBorderColor = {colors.green_background}
            numberOfInputs={4} 
            inputStyles={styles.tokenText}
            keyboardType = {'phone-pad'}
        
          />

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
            />  */}
           <Preloader
              modalVisible={showLoading}
             animationType="fade"
            />
            <SingleButtonAlert
              title = {'Hello'} 
              message = {message}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showAlert}
            /> 
          </View>
        </View>

      </SafeAreaView>
    );
  }
}