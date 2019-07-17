'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { DrawerActions } from "react-navigation";



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
  handlePressBack = () => {
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
            text = {'PROGRAMS'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
      </View>
      </View>
      <View style = {styles.programView}>
        <ScrollView 
          style={{flex:1,}}
          showsVerticalScrollIndicator={false}>
          <View style = {styles.blueCard}>
            <DisplayText
              text = {'The Business of Branding'}
              styles = {StyleSheet.flatten(styles.headerCardTxt)}
            />
            <DisplayText
              text = {'23rd July, 2018 4:00pm'}
              styles = {StyleSheet.flatten(styles.cardDate)}
            />
          </View>
          {/* Description */}
          <View style = {styles.cardCategory}>
            <DisplayText
              text = {'Program and Event Description'}
              styles = {StyleSheet.flatten(styles.sponser)}
            />
            <DisplayText
              text = {'In software engineering, dependency injection is a technique whereby one object supplies the dependencies of another object. A "dependency" is an object that can be used, for example a service. Instead of a client specifying which service it will use, something tells the client what '}
              styles = {StyleSheet.flatten(styles.typeTxt)}
            />
          </View>
          

          <View style = {styles.cardCategory}>
            <DisplayText
              text = {'Category'}
              styles = {StyleSheet.flatten(styles.sponser)}
            />
            <DisplayText
              text = {'type'}
              styles = {StyleSheet.flatten(styles.typeTxt)}
            />
            <View style ={styles.catTypeView}>
              <View style = {styles.textCont}>
                <DisplayText
                  text = {'Technology'}
                  styles = {StyleSheet.flatten(styles.cartType)}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style = {styles.blueButton}>
            <DisplayText
              text = {'+ Add to my Program'}
              styles = {StyleSheet.flatten(styles.buttonTxt)}
            />
          </TouchableOpacity>
          {/* Rating */}
          <View style = {styles.cardSpeaker}>
            <DisplayText
              text = {'Rating'}
              styles = {StyleSheet.flatten(styles.sponser)}
            />
            <DisplayText
              text = {'*****'}
              styles = {StyleSheet.flatten(styles.sponserName)}
            />
          </View>

          {/* LOCATIO */}
          <View style = {styles.cardSpeaker}>
            <DisplayText
              text = {'Location'}
              styles = {StyleSheet.flatten(styles.sponser)}
            />
            <DisplayText
              text = {'Tap to see location'}
              styles = {StyleSheet.flatten(styles.sponserName)}
            />
          </View>

          <View style = {styles.cardSpeaker}>
            <DisplayText
              text = {'Speaker'}
              styles = {StyleSheet.flatten(styles.sponser)}
            />
            <DisplayText
              text = {'Mathew JJ \n'}
              styles = {StyleSheet.flatten(styles.sponserName)}
            />
          </View>
          
          {/* Attendy one Image */}
          <View style = {styles.attendyView}>
            <View style = {styles.imageView}>
              <Image
                source = {require('../../assets/images/sample_pics.png')}
                style = {StyleSheet.flatten(styles.headerIcon)}
              />
            </View>
            <View style = {styles.imageViewPlus}>
              <Image
                source = {require('../../assets/images/sample_pics.png')}
                style = {StyleSheet.flatten(styles.headerIcon)}
              />
            </View>
            <DisplayText
              text = {'4 Deleigate already attending'}
              styles = {StyleSheet.flatten(styles.attendyTxt)}
            />
          </View>
          {/* Attendy one Image */}
        </ScrollView>
      </View>
    </SafeAreaView>
    
   )
  }
} 