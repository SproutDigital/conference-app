'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, AsyncStorage, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import { postRoute, getRoute, getEmail, } from '../../utils';



export default class PeopleMain extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
    }
  }


  handleGoBack = () => {
    return this.props.navigation.goBack();
  }



  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default"/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          onPress={this.handlePressBack} 
          style = {styles.headerImage}>
          <Image
            onPress={this.handlePressBack} 
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <DisplayText
            text = {'People'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
      <View>
        
      </View>
    </SafeAreaView>
    
   )
  }
} 
