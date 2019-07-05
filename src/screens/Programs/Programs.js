'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, Text, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
// import { postRoute, getRoute, getEmail, VerifyUserEndpoint, } from '../../utils';

export default class Programs extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }
  componentWillMount(){
    // logout();
  }

  handleOnboard = () => {
    return this.props.navigation.navigate('OnboardingProfile');
  }
  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
    <StatusBar
      barStyle="light-content"
      backgroundColor={theme.colorAccent}/>
    <View style = {styles.navBar}>
      <TouchableOpacity
        onPress={this.handleGoBack} 
        style = {styles.headerImage}>
        <Image
          onPress={this.handleGoBack} 
          source = {require('../../assets/images/back.png')}
          style = {StyleSheet.flatten(styles.headerIcon)}
        />
      </TouchableOpacity>
      <View style = {styles.nameView}>
        <DisplayText
          text = {"PROGRAMS"}
          styles = {StyleSheet.flatten(styles.txtHeader)}
        />
      </View>
    </View>
    <View style = {styles.viewBody}>
      <View style={styles.searchView}>
        <Image
          source = {require('../../assets/images/search.png')}
          style = {StyleSheet.flatten(styles.searchIcon)}
        />

      </View>
      {/* Add this disign to you flatlist after fetching your data */}
      <TouchableOpacity 
        onPress = {this.handleViewSponser}
        style = {styles.cardView}>
        <View style = {styles.cardHeaderView}>
          
          <View>
            <DisplayText
              text = {"The Business of Branding"}
              styles = {StyleSheet.flatten(styles.headerText)}
            />
          </View>
          <TouchableOpacity style = {styles.buttonView}>
            <DisplayText
              text = {"workshop"}
              styles = {StyleSheet.flatten(styles.btnText)}
            /> 
          </TouchableOpacity>
        </View>
        
      </TouchableOpacity>
      
    </View>  
    
  </SafeAreaView>
    
   )
  }
} 
