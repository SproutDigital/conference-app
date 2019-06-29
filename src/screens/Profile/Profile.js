'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, AsyncStorage, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import { postRoute, getRoute, getEmail, VerifyUserEndpoint, RequestNewTokenEndpoint, logout, VerificationStatusEndpoint} from '../../utils';



export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }
  componentWillMount(){
    logout();
  }

  handleOnboard = () => {
    return this.props.navigation.navigate('OnboardingProfile');
  }
  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View>
        <DisplayText
          styles={StyleSheet.flatten(styles.exitTxt)}
          text = {'ONBOARD'}
          onPress = {this.handleOnboard}
        />  
      </View>
    </SafeAreaView>
    
   )
  }
} 
