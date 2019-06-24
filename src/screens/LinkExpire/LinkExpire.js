'use strict';
import React, {Component} from 'react';
import { View, TouchableOpacity, SafeAreaView, StatusBar, Image, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import ExpireSvg from './ExpireSvg';

export default class LinkExpire extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  handleBack = () => {
    this.props.navigation.goBack();
  }

  render () {
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
              text = {'Link Expired!'}
            />
            <DisplayText
              styles = {StyleSheet.flatten(styles.bottomTxt)}
              text = {'Click to resend New verification \npassword link '}
            />
          </View>

          <View style = {styles.btnView}>
            <TouchableOpacity 
              onPress={this.handleReset}
              style = {styles.buttonWithImage}>
              <DisplayText
                styles = {StyleSheet.flatten(styles.buttonTxt)}
                text = {'Resend'}
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