'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, AsyncStorage, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';

export default class OnboardingProfile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
    }
  }

  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.green_background}/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          onPress={this.toggleDrawer} 
          style = {styles.headerImage}>
          <Image
            onPress={this.toggleDrawer} 
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
        
        <DisplayText
          text={'Investments'}
          styles = {StyleSheet.flatten(styles.txtHeader)}
        />
      </View>
      </View>
      <View>
        <DisplayText
          styles={StyleSheet.flatten(styles.exitTxt)}
          text = {'ONBOARDING PROFILE'}
          onPress = {this.handleLogout}
        />  
      </View>
    </SafeAreaView>
    )
  }
} 
