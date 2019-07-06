'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, FlatList, Text,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import theme from '../../assets/theme'

export default class Sponsor extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
    }
  }
  
  handleGoBack = () => {
    return this.props.navigation.popToTop();
  }
  handleViewSponser = () => {
    return this.props.navigation.navigate('SponsorDetails');
  }
  renderRow = () => {
   
    return (
      <View style = {styles.listViewItem}>    
        
      </View>
    );
  }

  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.green_background}/>
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
            text = {"Sponsor List"}
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
          <InputField
            placeholder = {'Search Following'}
            placeholderTextColor = {theme.secondaryTextColor}
            textColor={theme.primaryTextColor}
            inputType={'name'}
            keyboardType={'default'}
            onChangeText = {this.handleNameChange}
            autoCapitalize = "words"
            height = {30}
            width = {'80%'}
            borderBottomWidth = {0}
            paddingLeft  = {8}
          /> 
        </View>
        {/* Add this disign to you flatlist after fetching your data */}
        <TouchableOpacity 
          onPress = {this.handleViewSponser}
          style = {styles.cardView}>
          <View style = {styles.sponsorImageView}>
            <Image
              source = {require('../../assets/images/mtn.png')}
              style = {StyleSheet.flatten(styles.sponsorImage)}
            />
          </View>
          <View style = {styles.txtView}>
            <DisplayText
              text = {"MTN Nigeria"}
              styles = {StyleSheet.flatten(styles.headerText)}
            />
 
             <Text  onPress = {() => this.handleFlatlist(item)} 
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
               style = {styles.subHeaderText}>
              {"Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tempor incididunt ut"}
            </Text>
            
            <View style={styles.buttonMoreView}>
              <DisplayText
                text = {"see more"}
                styles = {StyleSheet.flatten(styles.moreText)}
              />
              <TouchableOpacity style ={styles.iconView}>
                <Image
                  source = {require('../../assets/images/contactplusicon.png')}
                  style = {StyleSheet.flatten(styles.plusIcon)}
                />
              </TouchableOpacity>
            </View>
          </View>
          
        </TouchableOpacity>
        
      </View>  
      
    </SafeAreaView>
    
   )
  }
} 


// const mapStateToProps = (state, ownProps) =>{
//   return  {
//      // isLoggedIn: state.authreducer.isLoggedIn
//   }
// }

// const mapDispatchToProps = (dispatch) =>{
//   return{
//     setProfile: (data) =>{dispatch(addProfile(data))},
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Sponsor)

