'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
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
      <StatusBar barStyle="default" /> 
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
          <View style = {{flexDirection : 'row'}}>
            
            <TouchableOpacity style = {styles.iconBotton}>
              <Image
                source = {require('../../assets/images/checklist.png')}
                style = {StyleSheet.flatten(styles.searchIcon)}
              />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.iconBottonSearch}>
              <Image
                source = {require('../../assets/images/search.png')}
                style = {StyleSheet.flatten(styles.checklistIcon)}
              />
            </TouchableOpacity>
            
          </View>
          
          <TouchableOpacity style = {styles.iconBottonFilter}>
            <Image
              source = {require('../../assets/images/filter.png')}
              style = {StyleSheet.flatten(styles.filterIcon)}
            />
          </TouchableOpacity>
          <InputField
            placeholder = {'Search Following'}
            placeholderTextColor = {theme.secondaryTextColor}
            textColor={theme.primaryTextColor}
            inputType={'name'}
            keyboardType={'default'}
            onChangeText = {this.handleNameChange}
            autoCapitalize = "words"
            height = {30}
            width = {'70%'}
            borderBottomWidth = {0}
            paddingLeft  = {8}
          /> 
          
        </View>
      {/* Add this disign to you flatlist after fetching your data */}
      <View 
        onPress = {this.handleViewSponser}
        style = {styles.cardView}>
        <View style = {styles.cardHeaderView}>
          <DisplayText
            text = {"The Business of Branding"}
            styles = {StyleSheet.flatten(styles.headerText)}
          />
          <TouchableOpacity style = {styles.buttonView}>
            <DisplayText
              text = {"workshop"}
              styles = {StyleSheet.flatten(styles.btnText)}
            /> 
          </TouchableOpacity>
        </View>
        <DisplayText
          text = {'Today 03:00pm - 05:00pm'}
          styles = {StyleSheet.flatten(styles.timeText)}
          />
        <View style = {styles.cardEventNames}>
          <Image
            source = {require('../../assets/images/male.png')}
            style = {StyleSheet.flatten(styles.maleIcon)}
          />
          <Image
            source = {require('../../assets/images/male.png')}
            style = {StyleSheet.flatten(styles.maleIcon)}
          />
          <DisplayText
            text = {' Barr. Josh Av'}
            styles = {StyleSheet.flatten(styles.nameText)}
            />
          <DisplayText
            text = {'Tammy J'}
            styles = {StyleSheet.flatten(styles.nameText)}
            />
        </View>
      </View>
  
    </View>  
    
  </SafeAreaView>
    
   )
  }
} 
