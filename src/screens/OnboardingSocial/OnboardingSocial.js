'use strict';
import React, {Component} from 'react';
import { View, ScrollView, FlatList, Modal, TextInput,TouchableWithoutFeedback,SafeAreaView, StatusBar, Image, TouchableOpacity, Text, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import data from '../../utils/Countries';

const defaultFlag = data.filter(
  obj => obj.name === 'Nigeria'
  )[0].flag

export default class OnboardingSocial extends Component {
  constructor(props) {
    super(props);
    this.state ={
      flag : defaultFlag,
      phoneNumber : '',
      modalVisible : false,
      nationalityModalVisible : false,
    }
  }
  componentWillMount () {
    // Default render of country flag
    const defaultFlag = data.filter(obj => obj.name === 'Nigeria')[0].flag;
    this.setState({
      flag :defaultFlag,
    })

  }

  handlePhoneChange = (text) => {
    if(text.length > 0) {
      this.setState({
        isValidPhoneNumber: true,
        phoneNumber : text
      });
    }
    else {
      if (text.length < 1) {
        this.setState({
          isValidPhoneNumber : false
        });
      }
    }
  }

  // phone number onchage text
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }

  async selectCountry(country) {
    // Get data from Countries.js  
    const countryData = await data
    try {
      // Get the country code
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      // Get the country flag
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag
      //get country code name

      // const countryCodeName = await countryData.filter(
      //   obj => obj.name === country
      // )[0].code

      // Update the state then hide the Modal

      this.setState({ 
        phoneNumber: countryCode, 
        flag: countryFlag, 
        // nameCode : countryCodeName,
      })
      await this.hideModal()
    }
    catch (err) {
      console.log(err)
    }
  }

  showModal() {
    this.setState({ 
      modalVisible: true 
    })
  }
  hideModal() {
    this.setState({ 
      modalVisible: false 
    })
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus()
  }

  handleOnboard = () => {
    // return this.props.navigation.navigate('OnboardingProfile');
  }
  
  render () {
    const { title, message, showAlert, showLoading, flag } = this.state
    const countryData = data

   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colorAccent}/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          style = {styles.headerImage}>
          <Image
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <DisplayText
            text={'ONBOARDING SOCIAL'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>

      <ScrollView 
        style={{flex:1, padding : 20}}
        showsVerticalScrollIndicator={false}>
          
        {/* Phone input with country code */}
        <View style = {styles.formView}>
          <DisplayText
            text={'Phone Number'}
            styles = {styles.formHeaderTxt}
          /> 
          <View style = {styles.phoneView}>
            {/* <View style = {styles.flag}> */}
            <TouchableOpacity 
              style = {styles.modalTp}
              onPress={() => this.showModal()}>
              <Text
                style = {styles.flagstyles} 
                onPress={() => this.showModal()}>
                {flag}
              </Text>
              {/* <Icon
                active
                name='md-arrow-dropdown'
                style={[styles.iconStyle, { marginLeft: 5 }]}
                onPress={() => this.showModal()}
              /> */}
              <Image
                onPress={() => this.showModal()}
                source = {require('../../assets/images/down_arrow.png')}
                style = {StyleSheet.flatten(styles.downArrow)}
              />
            </TouchableOpacity>
            {/* </View> */}
            <TextInput
              style={styles.input}
              placeholder='+2348012341234'
              placeholderTextColor='#adb4bc'
              keyboardType={'phone-pad'}
              returnKeyType='done'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={false}
              ref='PhoneInput'
              value={this.state.phoneNumber}
              onChangeText={(val) => {
                if (this.state.phoneNumber === ''){
                  // render NIG phone code by default when Modal is not open
                  this.onChangeText('phoneNumber', '+234' + val)
                } else {
                  // render country code based on users choice with Modal
                  this.onChangeText('phoneNumber', val)
                }}
              }
            />
            <TouchableOpacity 
                  style = {{paddingLeft : 8}}
                  onPress = {this.handleEdit}>
                <Image
                  onPress = {this.handleEdit}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
            </TouchableOpacity>
          </View>
        </View>
        {/* Modal for country code and flag */}
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={this.hideModal}
          visible={this.state.modalVisible}>
          <View style={{ flex : 1, paddingLeft : 20, paddingRight : 20}}>
            <View style={{ flex: 7, marginTop: 10 }}>
              {/* Render the list of countries */}
              <FlatList
                data={countryData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={
                  ({ item }) =>
                  <TouchableWithoutFeedback onPress={() => this.selectCountry(item.name)}>
                    <View style={styles.countryStyle}>
                      <Text style={styles.textStyle}>
                        {item.flag} {item.name} ({item.dial_code})
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                }
              />
            </View>
            <View style={styles.closeButtonStyle}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => this.hideModal()}>
              <Text style={styles.textBtn}>
                Close
              </Text>
            </TouchableOpacity>
            </View>
            
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
    
   )
  }
} 
