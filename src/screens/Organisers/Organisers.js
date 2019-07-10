'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, 
   Animated,Dimensions, Linking, Platform} from 'react-native';
import {DisplayText, Icons } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import { post, FetchCompanyEndpoint, getProfile} from '../../utils';


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
      dat: {}
    }
    this.contact_address = React.createRef();
    this.phone_number = React.createRef();
    this.fetchProfile();

  }
  animVal = new Animated.Value(0);

  // async componentDidMount() {

  // }

  handleGoBack = () => {
    return this.props.navigation.navigate('About');
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
    number = this.state.dat.phone;
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    }
    else {
      phoneNumber = `telprompt:${number}`;
    }
 
    Linking.openURL(phoneNumber);
  };



  fetchProfile =async()=>{
    let profile = await getProfile();
    let token = await profile.sessionToken;
    let body = await JSON.stringify({
      'query':{_id : '5d24720fc8ce0900171f03d6'},
    });
 
    await post (FetchCompanyEndpoint, body, token)
      .then((res) => {
        if(res.status == 'success') {
          this.setState({
            dat: res.data[0],
          });

        // this.props.setProfile(res.data[0]);
        //  if(isVerified == true && completed) {
        //    this.setState({
        //      restoring : false,
        //    });
        //    //return this.props.navigation.navigate('Menu');
        //  }
        //  else if(isVerified == false){
        //    this.setState({
        //      restoring : false,
        //    });
        //    return this.resetNavigationStack('Verification');
        //  }
        //  else {
        //    this.setState({
        //      restoring : false,
        //    });
        //    return this.props.navigation.navigate('OnBoard');
 
        //  }
 
        } 
        else {
          this.setState({ 
           showLoading : false, 
           message: res.message,
           showAlert: true,
           title: 'Hello'
         });
       }
      });
  }

  render () {
    const { dat} = this.state;

    const {data} = this.props;
    let d = dat.phone ? false : true;
    let emailStatus = dat.email ? false : true;


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
            showsVerticalScrollIndicator={false}>
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
                text = {dat.name ? dat.name : '' }
                styles = {StyleSheet.flatten(styles.aboutHeaderTxt)}
              />
              <DisplayText
                text = {dat.short_bio ? dat.short_bio : ''}
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
                  text = {dat.address ? dat.address : ''}
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
                  text = {dat.phone ? dat.phone.toString() : ''}
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
                  text = {dat.email ? dat.email : ''}
                />
              </View>
              {/* Website text */}
              <View style = {styles.formView}>
                <DisplayText
                  styles={StyleSheet.flatten(styles.titleText)}
                  text = {'Website'}
                />
                <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {dat.website ? dat.website : ''}
                />
              </View>
              {/* Social Media */}
              <View style = {styles.formView}>
                <DisplayText
                  styles={StyleSheet.flatten(styles.titleText)}
                  text = {'Social Media'}
                />
                <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {`Facebook: ${dat.facebook_visible ? dat.facebook: '*******'} \nInstagram: ${dat.instagram_visible ? dat.instagram: '*******'} \nTwitter: ${dat.twitter_visible ? dat.twitter  : '*******'} \nLinkedIn: ${dat.linkedin_visible ? dat.linkedin : '********'}`}
                />
              </View>
              <View style = {styles.buttonView}>
                {/* <Icons 
                  disabled={dat.phone ? false : true}
                  onPress ={this.dialCall(dat.phone)}
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
                  onPress={() => Linking.openURL(`mailto:${dat.email}`) }
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
    
    data: state.eventReducer.eventProfile
  }
}

export default connect(mapStateToProps)(Organisers)
