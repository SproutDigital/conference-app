'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, AsyncStorage, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';


export default class DashBoard extends Component {
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
            source = {require('../../assets/images/menu.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
        
        <Image
          onPress={this.toggleDrawer} 
          source = {require('../../assets/images/inapp_logo.png')}
          style = {StyleSheet.flatten(styles.headerIcon)}
        />
      </View>
      </View>
      <View>
        <DisplayText
          styles={StyleSheet.flatten(styles.exitTxt)}
          text = {'Dashboard'}
          onPress = {this.handleLogout}
        />  
      </View>
    </SafeAreaView>
    
   )
  }
} 
