'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView,TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';

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
   headerStatus() {
    const item = this.props.navigation.getParam('item');
    if(item.facebook_visible || item.twitter_visible || item.instagram_visible || item.linkedin_visible ) {
      return(
        <DisplayText
          styles={StyleSheet.flatten(styles.titleText)}
          text = {'Social Media'}
        />
      )
    }
  }
  webSiteLink(){
    const item = this.props.navigation.getParam('item');
    if(item.website) {
      return(
        <View style = {styles.bodyView}>
        <View style={styles.socialView}>
          <View style = {styles.textView}>
            <DisplayText
              styles={StyleSheet.flatten(styles.titleText)}
              text = {'Website'}
            />
            <View style = {styles.hanlenameView}>                    
            <View style = {styles.dot}></View>               
              <DisplayText
                styles={[StyleSheet.flatten(styles.socialTitleText), {color:'blue' }]}
                text = {item.website}
                onPress={() => Linking.openURL(`https://${item.website}`).catch(err => console.log('An error occurred', err))}
              />
            </View>
          </View>
        </View>
      </View> 
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
                resizeMode = 'cover'
                source={{ uri: photo }} 
                style={styles.imageStyle} 
                /> 
                : 
              <Image
                resizeMode = 'cover'
                style = {styles.imageStyle}
                source = {require('../../assets/images/name.png')}
                />
                
              }
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
            {
              item.event.length ?
                <View style = {styles.textViewUserRole}>
                  <DisplayText
                    styles={StyleSheet.flatten(styles.formHeaderTxt)}
                    text = {'Role'}
                  />
                  <View style = {styles.hanlenameView}>
                    <DisplayText
                      styles={StyleSheet.flatten(styles.roleTitleText)}
                      text = {item.event[0].event_role}
                    />             
                  </View>
                </View>
              : null
            }
            
            {/* Short Bio */}
            { item.short_bio ?
              <View style = {styles.textViewUserRole}>
              <DisplayText
                styles={StyleSheet.flatten(styles.formHeaderTxt)}
                text = {'Bio'}
              />
              <View style = {styles.hanlenameView}>
                <DisplayText
                  text = {item.short_bio}
                  styles = {StyleSheet.flatten(styles.bioTxt)}
                />            
              </View>
            </View>
              : null
            }
            
            <View style = {styles.socialMediaView}>
              {this.headerStatus()}
              {/*  facebook */}
              { item.facebook_visible ?
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
                : null
              }
              
              {/* Twitter */}
              { item.twitter_visible ?

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
                : null
              }
              
              {
                 item.linkedin_visible ? 
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
              : null

              }
                {/* Instagram */}
               {
                 item.instagram_visible ? 
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
                : null


               }
              {/* phone */}
               {
                 item.phone ?
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
               : null
               }
              {/* website */}
              {this.webSiteLink()}

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  
    )
  }
} 