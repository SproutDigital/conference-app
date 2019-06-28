'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, Text, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';


export default class OnboardingSocial extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  handleOnboard = () => {
    // return this.props.navigation.navigate('OnboardingProfile');
  }
  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colorAccent}/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          style = {styles.headerImage}>
          <Image
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <DisplayText
            text={'ONBOARDING SOCIAL'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>

      <View>
        <DisplayText
          styles={StyleSheet.flatten(styles.exitTxt)}
          text = {'ONBOARDIN SOCIALS'}
        />  
      </View>
    </SafeAreaView>
    
   )
  }
} 
