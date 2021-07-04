'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, 
   Animated,Dimensions, Linking, Platform} from 'react-native';
import {DisplayText} from '../../components';
import styles from './styles';
import {connect} from 'react-redux';


const deviceWidth = Dimensions.get('window').width;

class Organisers extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      contactAddress : '',
      phoneNumber : '',
      isContactAddressValid : false,
      isPhoneNumberValid : false,
      data: this.props.data,
    }
    this.contact_address = React.createRef();
    this.phone_number = React.createRef();
   // this.fetchProfile();

  }
  animVal = new Animated.Value(0);

  handleGoBack = () => {
    return this.props.navigation.goBack();
  }
  contactAddressChange = (contactAddress) => {
    if(contactAddress.length > 0) {
      this.setState({
        isContactAddressValid: true,
        contactAddress
      });
    }
    else {
      if (contactAddress.length < 1) {
        this.setState({
          isCsontactAddressValid : false
        });
      }
    }
  }
  handlePhoneNumberChange = (phoneNumber) => {
    if(phoneNumber.length > 0) {
      this.setState({
        isPhoneNumberValid: true,
        phoneNumber
      });
    }
    else {
      if (phoneNumber.length < 1) {
        this.setState({
          isPhoneNumberValid : false
        });
      }
    }
  }


  dialCall=()=> {
 
    let phoneNumber = '',
    number = this.state.data.company.phone;
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    }
    else {
      phoneNumber = `telprompt:${number}`;
    }
 
    Linking.openURL(phoneNumber);
  };


  webSiteLink(){
    const {data} = this.state
    if(data.company.website) {
      return(
          <DisplayText
            styles={[StyleSheet.flatten(styles.textInfo), {color:'blue' }]}
            text = {data.company.website}
            onPress={() => Linking.openURL(`https://${data.company.website}`).catch(err => console.log('An error occurred', err))}
          />
      )
    }
    else  {
      return(
          <DisplayText
            styles={StyleSheet.flatten(styles.textInfo)}
            text = {''}
          />
      )
    }
    
  }


  render () {
    const { data} = this.state;
    let d = data.company.phone ? false : true;
    let emailStatus = data.company.email ? false : true;


    let imageArray = [],
     images = data.header_image;

    images.forEach((image, i) => {
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          style={{ width: deviceWidth, marginTop:0, height:200 }}
        />
      )
      imageArray.push(thisImage) 
    });
    
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
            text = {"ABOUT ORGANISERS"}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
        
      <View style={styles.viewBody}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior = 'padding'> 
        <ScrollView 
          style={{flex:1}}
          showsVerticalScrollIndicator={false}
          >
          <View style = {styles.sliderView}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
              pagingEnabled
              onScroll={
                Animated.event(
                  [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
                )
              }
            >

            {imageArray}

            </ScrollView>
           </View>
            <View style={styles.srollContent}>
              <DisplayText
                text = {data.company.name ? data.company.name : '' }
                styles = {StyleSheet.flatten(styles.aboutHeaderTxt)}
              />
              <DisplayText
                text = {data.company.short_bio ? data.company.short_bio : ''}
                styles = {StyleSheet.flatten(styles.aboutBodyTxt)}
              />
          </View>
            <View style = {styles.formContainer}>         
              <View style = {styles.formView}>
                <DisplayText
                  styles={StyleSheet.flatten(styles.titleText)}
                  text = {'Contact Address'}
                />
                <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {data.company.address ? data.company.address : ''}
                />

              </View>
              {/* Phone number */}
              <View style = {styles.formView}>
                <DisplayText
                  styles={StyleSheet.flatten(styles.titleText)}
                  text = {'Phone Number'}
                />
                <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {data.company.phone ? data.company.phone.toString() : ''}
                />
              </View>
              {/* Email Address Texf */}
              <View style = {styles.formView}>
                <DisplayText
                  styles={StyleSheet.flatten(styles.titleText)}
                  text = {'Email Address'}
                />
                <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {data.company.email ? data.company.email : ''}
                />
              </View>
              {/* Website text */}
              <View style = {styles.formView}>
                <DisplayText
                  styles={StyleSheet.flatten(styles.titleText)}
                  text = {'Website'}
                />
                 {this.webSiteLink()}
               
              </View>
              {/* Social Media */}
              <View style = {styles.formView}>
                <DisplayText
                  styles={StyleSheet.flatten(styles.titleText)}
                  text = {'Social Media'}
                />
              
                {/* <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {`Facebook: ${data.facebook_visible ? data.facebook: '*******'} \nInstagram: ${data.instagram_visible ? data.instagram: '*******'} \nTwitter: ${data.twitter_visible ? data.twitter  : '*******'} \nLinkedIn: ${data.linkedin_visible ? data.linkedin : '********'}`}
                /> */}
                {data.company.facebook_visible ?
                  <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {`Facebook: ${data.company.facebook}`}
                />
                : null
                }
                
                {data.company.instagram_visible ?
                  <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {`Instagram: ${ data.company.instagram}`}
                />
                 : null
                }
                
                { data.company.twitter_visible ?
                  <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {`Twitter: ${data.company.twitter}`}
                />
                 : null
                }
                
                { data.company.linkedin_visible ? 
                  <DisplayText
                    styles={StyleSheet.flatten(styles.textInfo)}
                    text = {`LinkedIn: ${data.company.linkedin}`}
                  />
                  : null
                }
                
              </View>
              <View style = {styles.buttonView}>
                {/* <Icons 
                  disabled={data.phone ? false : true}
                  onPress ={this.dialCall(data.phone)}
                  name ={}
                  btnstyle ={styles.buttonCall} 
                  iconColor ={'white'} 
                  iconSize={24} */}
                
                <TouchableOpacity
                  style = {[{opacity: d ? 0.2 : null}]}
                  disabled = {d}
                  onPress ={this.dialCall}
                >
                  <Image
                    source = {require('../../assets/images/call.png')}
                    style = {StyleSheet.flatten(styles.buttonCall)}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style = {[{opacity: emailStatus ? 0.2 : null}]}
                  disabled = {emailStatus}
                  onPress={() => Linking.openURL(`mailto:${data.company.email}`) }
                    title="support@example.com"
                  >
                  <Image
                    source = {require('../../assets/images/message.png')}
                    style = {StyleSheet.flatten(styles.buttonIcon)}
                  />
                </TouchableOpacity> 
              </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      </View>
      
    </SafeAreaView>
    
   )
  }
} 

const mapStateToProps = (state, ownProps) =>{
  return{
    
    data: state.EventReducer.eventProfile
  }
}

export default connect(mapStateToProps)(Organisers)
