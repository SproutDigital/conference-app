'use strict';
import React, {Component} from 'react';
import { View, TouchableOpacity, SafeAreaView, StatusBar, Image, StyleSheet, Linking} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import ExpireSvg from './ExpireSvg';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { postRoute, logout, getEmail, VerificationStatusEndpoint} from '../../utils';

export default class ActivateEmail extends Component {
  constructor(props) {
    super(props);
    this.state ={
      email :'',
      showLoading: false,
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

  handleBack = () => {
    this.props.navigation.goBack();
  }


  checkEmailVerification = async() => {
    this.setState({
      showLoading: true,
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
            message : res.message,
            showAlert : true,
          }); 
        }
        else {
          if(res.verified) {
            this.setState({ 
              showLoading : false, 
            });
           // return this.resetNavigationStack(res.message); 
          }
          else {
           return this.setState({ 
              showLoading : false, 
            });
          }
             
        }
      });
  }

  render () {
    const { showLoading, email } = this.state;
    
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style = {styles.navBar}>
        <TouchableOpacity   
          onPress = {this.handleBack}
          style = {styles.backView}>
          <Image
            onPress = {this.handleBack}
            source={require('../../assets/images/back.png')}
            style={StyleSheet.flatten(styles.backIcon)}/> 
        </TouchableOpacity>
      </View>
      <View
        style={styles.wrapper}
        behavior = 'padding'> 
          <ExpireSvg/>
          <View style = {styles.titleTxtView}>
            <DisplayText
              styles = {StyleSheet.flatten(styles.topTxt)}
              text = {'Success!'}
            />
            <DisplayText
              styles = {StyleSheet.flatten(styles.bottomTxt)}
              text = {`Activation link has been sent to \n${email}!`}
            />
            <ProgressDialog
              visible={showLoading}
              title="Processing"
              message="Please wait..."
            />
          </View>

          <View style = {styles.btnView}>
            <TouchableOpacity 
              onPress={this.handleReset}
              style = {styles.buttonWithImage}>
              <DisplayText
                styles = {StyleSheet.flatten(styles.buttonTxt)}
                text = {'Activate'}
              />
              <Image
                source={require('../../assets/images/settings.png')}
                style={StyleSheet.flatten(styles.iconDoor)}/> 
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
} 