'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView, Text,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import {connect} from 'react-redux';
import theme from '../../assets/theme';

export default class SponsorDetails extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      photo : '',
    }
  }

  handleGoBack = () => {
    return this.props.navigation.navigate('Sponsor');
  }

  render () {
    const {photo , isFacebookFocused} = this.state
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default"/>
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
            text = {"SPONSOR"}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
      <View style = {styles.mainView}>
      <KeyboardAvoidingView
          style={styles.wrapper}
          behavior = 'padding'> 
        <ScrollView style={{flex:1, width : '100%'}} showsVerticalScrollIndicator={false}>
          <View style = {styles.viewBody}>

            <View style={styles.roundImageView}>
            { 
              photo && photo.length > 0 ?
              <Image 
                source={{ uri: photo }} 
                style={styles.imageStyle} 
                /> 
                : 
              <Image
                resizeMode = 'contain'
                style = {styles.imageStyle}
                source = {require('../../assets/images/name.png')}
                />
                
              }
              <TouchableOpacity 
                style = { styles.cameraTouch}
                // onPress={this._pickImage}
                >
                <Image
                  // onPress={this._pickImage}
                  source = {require('../../assets/images/camera.png')}
                  style = {StyleSheet.flatten(styles.cameraIcon)}
                />
              </TouchableOpacity>
            </View>
            <DisplayText
              styles={StyleSheet.flatten(styles.profileNameTxt)}
              text = {'MTN Nigeria'}
            />
            <View style = {styles.line}></View>
            <DisplayText
              styles={StyleSheet.flatten(styles.formHeaderTxt)}
              text = {'About'}
            />
            <DisplayText
              styles={StyleSheet.flatten(styles.aboutTxt)}
              text = {'Lorem ipsum imsum use computers or hand an tools to ipsum lo posters, websites,logos, bro n chures, maoregazines and many other materials to communicate ideas and information.'}
            />
            <View style = {styles.socialMediaView}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Social Media'}
              />
              {/*  facebook */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {styles.textInputView}>
                  <View style = {styles.hanlenameView}>
                    <Image
                      source = {require('../../assets/images/facebook.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <DisplayText
                      styles={StyleSheet.flatten(styles.socialTitleText)}
                      text = {'Official MTN Nigeria'}
                    />
 
                  </View>
                </View>
             
              </View>
            </View>
            {/* Twitter */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {styles.textInputView}>
                  <View style = {styles.hanlenameView}>
                    <Image
                      source = {require('../../assets/images/twitter.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <DisplayText
                      styles={StyleSheet.flatten(styles.socialTitleText)}
                      text = {'TwitterMTNNigeria'}
                    />
 
                  </View>
                </View>
             
              </View>
            </View>
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {styles.textInputView}>
                  <View style = {styles.hanlenameView}>
                    <Image
                      source = {require('../../assets/images/linkedin.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <DisplayText
                      styles={StyleSheet.flatten(styles.socialTitleText)}
                      text = {'Linkin MTN '}
                    />
 
                  </View>
                </View>
             
              </View>
            </View>
              {/* Instagram */}
              <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {styles.textInputView}>
                  <View style = {styles.hanlenameView}>
                    <Image
                      source = {require('../../assets/images/instagram.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <DisplayText
                      styles={StyleSheet.flatten(styles.socialTitleText)}
                      text = {'InsMTN Nigeria'}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* phone */}
            <View style = {styles.bodyViewPhone}>
              <View style={styles.socialView}>
                <View style = {styles.textInputView}>
                  <DisplayText
                    styles={StyleSheet.flatten(styles.titleText)}
                    text = {'Phone Number'}
                  />
                  <View style = {styles.hanlenameView}>
                    <Image
                      source = {require('../../assets/images/call.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <DisplayText
                      styles={StyleSheet.flatten(styles.socialTitleText)}
                      text = {'+234-9087654567'}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* website */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {styles.textInputView}>
                  <DisplayText
                    styles={StyleSheet.flatten(styles.titleText)}
                    text = {'Website'}
                  />
                  <View style = {styles.hanlenameView}>                    
                   <View style = {styles.dot}></View>               
                    <DisplayText
                      styles={StyleSheet.flatten(styles.socialTitleText)}
                      text = {'www.mtnnigeria.ng'}
                    />
                  </View>
                </View>
              </View>
            </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  
    )
  }
} 
