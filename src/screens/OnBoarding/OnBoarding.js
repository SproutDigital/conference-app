'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, AsyncStorage, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';


export default class OnBoarding extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }


  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View>
        
      </View>
    </SafeAreaView>
    
   )
  }
} 
