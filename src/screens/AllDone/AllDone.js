'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, AsyncStorage, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import HoldHands from './HoldHands';
import { NavigationActions, StackActions } from 'react-navigation';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }
  componentDidMount(){
    setTimeout(() => {
      this.resetNavigationStack();
    }, 2000);
    // logout();
  }

  resetNavigationStack = () => {
    const navigateAction =  StackActions.reset({
       index: 0,
       actions: [
         NavigationActions.navigate({
           routeName: 'DashBoard',
         }),
       ],
     });
     this.props.navigation.dispatch(navigateAction);
 
   }


  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style = {styles.imageView}>
      <Image
        source = {require('../../assets/images/celebrate.png')}
        style = {StyleSheet.flatten(styles.celebrateImage)}
      />
      </View>
      <View style = {styles.textView}>
        <DisplayText
          styles={StyleSheet.flatten(styles.firstTxt)}
          text = {' Greate '}
        />  
         <DisplayText
          styles={StyleSheet.flatten(styles.secondText)}
          text = {'You Are All Done!'}
        />
      </View>
      <View style ={{width : '100%', position: 'absolute',bottom:-10}}>
        <HoldHands/>
      </View>
    </SafeAreaView>
    
   )
  }
} 
