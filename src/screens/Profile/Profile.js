'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { DrawerActions } from "react-navigation";
import {WebView} from 'react-native';




export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
    }
  }
  
  toggleDrawer = () => {
    //Props to open/close the drawer
    // this.props.navigation.toggleDrawer();
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  };
  

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
            source = {require('../../assets/images/inapp_logo.png')}
            style = {StyleSheet.flatten(styles.headerLogoIcon)}
          />
      </View>
      </View>
      {/* <View>
        <DisplayText
          styles={StyleSheet.flatten(styles.exitTxt)}
          text = {'Profile'}
          onPress = {this.handleLogout}
        />  
      </View> */}
      <WebView
        source={{uri: 'https://awim19.africanwomeninmedia.com/feedback-and-survey/'}}
        style={{marginTop: 10}}
        javaScriptEnabled={true}

      />
    </SafeAreaView>
    
   )
  }
} 
