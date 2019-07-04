'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, Text,TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {DisplayText, InputField, SubmitButton, SingleButtonAlert } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { DrawerActions } from "react-navigation";
import Carousel from 'react-native-carousel';
import theme from '../../assets/theme';


export default class Organisers extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      contactAddress : '',
      phoneNumber : '',
      isContactAddressValid : false,
      isPhoneNumberValid : false
    }
    this.contact_address = React.createRef();
    this.phone_number = React.createRef();

  }
  
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

  render () {
    const {contactAddress} = this.state;
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
          <Carousel 
            indicatorAtBottom={true}
            indicatorColor="#FFFFFF"
            indicatorSize={20}
            indicatorSpace={15}
            indicatorText= '•'
            delay={8000}
            width={375}>
            <View style={styles.slideCarosel}>
              <Text>Page 1</Text>
            </View>
            <View style={styles.slideCarosel}>
              <Text>Page 2</Text>
            </View>
            <View style={styles.slideCarosel}>
              <Text>Page 3</Text>
            </View>
          </Carousel>
        </View>
            <View style={styles.srollContent}>
              <DisplayText
                text = {'Social Conference  , Kenya'}
                styles = {StyleSheet.flatten(styles.aboutHeaderTxt)}
              />
              <DisplayText
                text = {' pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'}
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
                  text = {'Block 6, Djibouti Crescent, Wuse II, Abuja.'}
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
                  text = {'+2348051909878'}
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
                  text = {'organizer@charteredgroup.co.uk'}
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
                  text = {'www.standardcharteredgroup.co.uk'}
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
                  text = {'www.Twitter: Standardgroupuk \nLinkedIn: Standardcharteredgroup.co.uk'}
                />
              </View>
              <View style = {styles.buttonView}>
                <TouchableOpacity>
                  <Image
                    source = {require('../../assets/images/call.png')}
                    style = {StyleSheet.flatten(styles.buttonCall)}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
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
