'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView,TouchableOpacity,
   StyleSheet, Linking} from 'react-native';
import {DisplayText} from '../../components';
import styles from './styles';

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

  webSiteLink(){
    const item = this.props.navigation.getParam('item');
    if(item.website) {
      return(
        <DisplayText
          styles={[StyleSheet.flatten(styles.socialTitleText), {color:'blue' }]}
          text = {item.website}
          onPress={() => Linking.openURL(`https://${item.website}`).catch(err => console.log('An error occurred', err))}
        />
      )
    }
    else  {
      return(
          <DisplayText
            styles={StyleSheet.flatten(styles.socialTitleText)}
            text = {''}
          />
      )
    }
    
  }

  render () {
    const item = this.props.navigation.getParam('item');
    let photo = item.photo;
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
              {/* <TouchableOpacity 
                style = { styles.cameraTouch}
                // onPress={this._pickImage}
                >
                <Image
                  // onPress={this._pickImage}
                  source = {require('../../assets/images/camera.png')}
                  style = {StyleSheet.flatten(styles.cameraIcon)}
                />
              </TouchableOpacity> */}
            </View>
            <DisplayText
              styles={StyleSheet.flatten(styles.profileNameTxt)}
              text = {item.company_name}
            />
            <View style = {styles.line}></View>
            <DisplayText
              styles={StyleSheet.flatten(styles.formHeaderTxt)}
              text = {'About'}
            />
            <DisplayText
              styles={StyleSheet.flatten(styles.aboutTxt)}
              text = {item.short_bio}
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
                      text = {`${item.facebook_visible ? item.facebook: '*******'}`}
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
                      text = {`${item.twitter_visible ? item.twitter: '*******'}`}
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
                      text = {`${item.linkedin_visible ? item.linkedin: '*******'}`}
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
                      text = {`${item.instagram_visible ? item.instagram: '*******'}`}
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
                      text = {item.phone? item.phone.toString(): ''}
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
                    {this.webSiteLink()}
                    
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
