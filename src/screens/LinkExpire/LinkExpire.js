'use strict';
import React, {Component} from './node_modules/react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, AsyncStorage, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';


export default class LinkExpire extends Component {
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
