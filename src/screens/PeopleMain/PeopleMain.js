'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView,TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import { postRoute, getRoute, getEmail, } from '../../utils';



export default class PeopleMain extends Component {
  constructor(props) {
    super(props);
    this.state ={
      photo : ''
    }
  }


  handleGoBack = () => {
    return this.props.navigation.goBack();
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
            text = {"PEOPLE"}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
      <View style = {styles.mainView}>
      <KeyboardAvoidingView
          style={styles.wrapper}
          behavior = 'padding'> 
        <ScrollView style={{flex:1, width : '100%'}}  
          showsVerticalScrollIndicator={false}>
          <View style = {styles.viewBody}>

            <View style={styles.roundImageView}>
            { 
               photo && photo.length > 0 ?
              <Image 
                resizeMode = 'contain'
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
              text = {item.name}
            />
             <DisplayText
              styles={StyleSheet.flatten(styles.jobName)}
              text = {item.job_title}
            />
            <View style = {styles.line}></View>

            {/*  User Role */}
            <View style = {styles.textViewUserRole}>
              <DisplayText
                styles={StyleSheet.flatten(styles.formHeaderTxt)}
                text = {'User Role'}
              />
              <View style = {styles.hanlenameView}>
                <DisplayText
                  styles={StyleSheet.flatten(styles.roleTitleText)}
                  text = {'Speaker'}
                />             
              </View>
            </View>
            {/* Short Bio */}
            <View style = {styles.textViewUserRole}>
              <DisplayText
                styles={StyleSheet.flatten(styles.formHeaderTxt)}
                text = {'Short Bio'}
              />
              <View style = {styles.hanlenameView}>
                <DisplayText
                  text = {item.short_bio}
                  styles = {StyleSheet.flatten(styles.bioTxt)}
                />            
              </View>
            </View>

            <View style = {styles.socialMediaView}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Social Media'}
              />
              {/*  facebook */}
              <View style = {styles.bodyView}>
                <View style={styles.socialView}>
                  <View style = {styles.textView}>
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
                  <View style = {styles.textView}>
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
                  <View style = {styles.textView}>
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
                  <View style = {styles.textView}>
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
                  <View style = {styles.textView}>
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
                  <View style = {styles.textView}>
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
