'use strict';
import React, {Component} from 'react';
import { View, ScrollView, FlatList, Switch, Modal, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback,SafeAreaView, StatusBar, Image, TouchableOpacity, Text, StyleSheet,} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert, SubmitButton } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import data from '../../utils/Countries';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-easy-toast';


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
      switchValueFb : true,
      switchValueTwit : true,
      switchValueLn : false,
      switchValueIn : false,
      title : '',
      message : '',
      showAlert : false,
      showLoading : false,

      phoneStatus:false,
      websiteStatus:false,
      facebookStatus:false,
      twitterStatus:false,
      linkedInStatus:false,
      instagramStatus:false,

      website:'',
      facebook:'',
      twitter:'',
      linkedIn:'',
      instagram:'',


    }
  }
  componentWillMount () {
    // Default render of country flag
    const defaultFlag = data.filter(obj => obj.name === 'Nigeria')[0].flag;
    this.setState({
      flag :defaultFlag,
    })

  }
  handleEdit = () => {
    alert('Can you edit me');
  }
  handleOnboardSocial = () => {
    return this.props.navigation.navigate('AllDone')
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
  // Switch Functions Facebook
  _handleToggleFbSwitch = () =>{
    this.setState(state => ({
      switchValueFb: !state.switchValueFb,
      })
    );
  }
  //Twigger toggle function
  _handleToggleTwitSwitch = () =>{
    this.setState(state => ({
      switchValueTwit: !state.switchValueTwit,
      })
    );
  }
  // Linkedin Toggle function
  _handleToggleLnSwitch = () =>{
    this.setState(state => ({
      switchValueLn: !state.switchValueLn,
      })
    );
  }
  // Instagram function
  _handleToggleInSwitch = () =>{
    this.setState(state => ({
      switchValueIn: !state.switchValueIn,
      })
    );
  }


  handleSubmitButton =async()=> {

    const {gender, nationality, biodata, company, interest, _id, token} = this.state;
    console.log({'stetsss': this.state})
    if(isEmpty(company)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Work Name'
      })
    }
    else if(isEmpty(biodata)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Bio data Information'
      })
    }

    // else if(isEmpty(interest)) {
    //   return this.setState({
    //     showAlert:true,
    //     message: 'Select Interest'
    //   })
    // }

    this.setState({
      showLoading: true,
    });

    let body = await JSON.stringify({
      'query':{_id},
      'update' : {gender, nationality, biodata, company, interest}   
    });

    await putRoute (ProfileUpdateEndpoint, body, token)
      .then((res) => {
        console.log({res})
        this.setState({ 
          showLoading : false, 
        });

        if(res.status == 'success') {
          this.setState({ 
            showLoading : false, 
          });
          return this.props.navigation.navigate('LastPage')        
        } 
        else {
          return this.setState({ 
           showLoading : false, 
           message: res.message,
           showAlert: true,
           title: 'Hello'
         });
       }
      });
  }
  
  handlePhoneStatus = () => {
    return this.setState(prevState => ({
      phoneStatus: !prevState.phoneStatus,
      websiteStatus:false,
      facebookStatus:false,
      twitterStatus:false,
      linkedInStatus:false,
      instagramStatus:false,
    }));
  }

  handleWebsiteStatus = () => {
    return this.setState(prevState => ({
      websiteStatus: !prevState.websiteStatus,
      phoneStatus:false,
      facebookStatus:false,
      twitterStatus:false,
      linkedInStatus:false,
      instagramStatus:false,
    }));
  }

  handleFacebookStatus = () => {
    return this.setState(prevState => ({
      facebookStatus: !prevState.facebookStatus,
      phoneStatus:false,
      websiteStatus:false,
      twitterStatus:false,
      linkedInStatus:false,
      instagramStatus:false,
    }));
  }


  handleTwitterStatus = () => {
    return this.setState(prevState => ({
      twitterStatus: !prevState.twitterStatus,
      phoneStatus:false,
      websiteStatus:false,
      facebookStatus:false,
      linkedInStatus:false,
      instagramStatus:false,
    }));
  }


  handlelinkedInStatus = () => {
    return this.setState(prevState => ({
      websiteStatus: !prevState.linkedInStatus,
      phoneStatus:false,
      websiteStatus:false,
      facebookStatus:false,
      twitterStatus:false,
      instagramStatus:false,
    }));
  }

  handleInstagramStatus = () => {
    return this.setState(prevState => ({
      facebookStatus: !prevState.instagramStatus,
      phoneStatus:false,
      websiteStatus:false,
      facebookStatus:false,
      twitterStatus:false,
      linkedInStatus:false,
    }));
  }
  
  render () {
    const { message, showAlert, showLoading, flag, phoneStatus, websiteStatus, facebookStatus, twitterStatus,linkedInStatus, instagramStatus } = this.state
    const countryData = data;

   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colorAccent}/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          style = {styles.headerImage}
          onPress={()=>this.props.navigation.navigate('OnboardingBio')}
          >
          
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

      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior = 'padding'> 
          <ScrollView 
          style={{flex:1,}}
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
              <Image
                onPress={() => this.showModal()}
                source = {require('../../assets/images/down_arrow.png')}
                style = {StyleSheet.flatten(styles.downArrow)}
              />
            </TouchableOpacity>
            {/* </View> */}
            <TextInput
              style={styles.input}
              //placeholder='+234'
              placeholderTextColor='#adb4bc'
              keyboardType={'phone-pad'}
              returnKeyType='done'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={false}
              ref='PhoneInput'
              value={this.state.phoneNumber}
              editable={phoneStatus}
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
              onPress = {this.handlePhoneStatus}>
              <Image
                onPress = {this.handlePhoneStatus}
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
        {/* website link */}
        <View style = {styles.nameInputView}>
          <DisplayText
            styles={StyleSheet.flatten(styles.titleText)}
            text = {'Website URL'}
          />
          <View style = {{flexDirection : 'row', width : '75%'}}>
            <View style = {styles.circleView}></View>
            <InputField
              placeholder={'www.ciromahassan.com'}
              placeholderTextColor = {theme.secondaryTextColor}
              textColor={theme.primaryTextColor}
              inputType={'default'}
              keyboardType={'website'}
              onChangeText = {(website)=>{this.setState({website})}}
              autoCapitalize = "words"
              height = {30}
              width = {'100%'}
              borderBottomWidth = {0}
              borderColor = {theme.colorAccent}
              editable = {websiteStatus}
              /> 
              <TouchableOpacity 
                style = {{paddingLeft : 8, paddingTop : 8}}
                onPress = {this.handleWebsiteStatus}>
              <Image
                onPress = {this.handleWebsiteStatus}
                source = {require('../../assets/images/edit.png')}
                style = {StyleSheet.flatten(styles.penIcon)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style = {styles.socialMediaView}>
          <View style = {styles.headerTxt}>
            <DisplayText
              styles={StyleSheet.flatten(styles.titleText)}
              text = {'Social Media'}
            />
            <DisplayText
              styles={StyleSheet.flatten(styles.publicText)}
              text = {'Public'}
            />
          </View>
          {/*  facebook */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {styles.textInputView}>
                  <View style = {{flexDirection : 'row', width : '75%'}}>
                    <Image
                      source = {require('../../assets/images/facebook.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <InputField
                      placeholder={'ciromahas'}
                      placeholderTextColor = {theme.secondaryTextColor}
                      textColor={theme.primaryTextColor}
                      inputType={'name'}
                      keyboardType={'default'}
                      onChangeText = {(facebook)=>{this.setState({facebook})}}
                      autoCapitalize = "words"
                      height = {30}
                      width = {'100%'}
                      borderBottomWidth = {0}
                      borderColor = {theme.colorAccent}
                      editable = {facebookStatus}

                      /> 
                    <TouchableOpacity 
                      style = {{paddingLeft : 8, paddingTop : 8}}
                      onPress = {this.handleFacebookStatus}>
                      <Image
                        onPress = {this.handleFacebookStatus}
                        source = {require('../../assets/images/edit.png')}
                        style = {StyleSheet.flatten(styles.penIcon)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style = {styles.toggleButtonView}>
                  <Switch
                    onValueChange={this._handleToggleFbSwitch}
                    value={this.state.switchValueFb}
                    trackColor = {theme.secondaryTextColor}
                    thumbColor = {theme.colorAccent}
                    />
                </View>
              </View>
            </View>
            {/* Twitter input */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {styles.textInputView}>
                  <View style = {{flexDirection : 'row', width : '75%'}}>
                    <Image
                      source = {require('../../assets/images/twitter.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <InputField
                      placeholder={'ciromahassan'}
                      placeholderTextColor = {theme.secondaryTextColor}
                      textColor={theme.primaryTextColor}
                      inputType={'name'}
                      keyboardType={'default'}
                      onChangeText = {(twitter)=>{this.setState({twitter})}}
                      autoCapitalize = "words"
                      height = {30}
                      width = {'100%'}
                      borderBottomWidth = {0}
                      borderColor = {theme.colorAccent}
                      editable={twitterStatus}
                      /> 
                    <TouchableOpacity 
                      style = {{paddingLeft : 8, paddingTop : 8}}
                      onPress = {this.handleTwitterStatus}>
                      <Image
                        onPress = {this.handleTwitterStatus}
                        source = {require('../../assets/images/edit.png')}
                        style = {StyleSheet.flatten(styles.penIcon)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style = {styles.toggleButtonView}>
                  <Switch
                    onValueChange={this._handleToggleTwitSwitch}
                    value={this.state.switchValueTwit}
                    trackColor = {theme.secondaryTextColor}
                    thumbColor = {theme.colorAccent}
                    />
                </View>
              </View>
            </View>
            {/* linked in */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {styles.textInputView}>
                  <View style = {{flexDirection : 'row', width : '75%'}}>
                    <Image
                      source = {require('../../assets/images/linkedin.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <InputField
                      placeholder={'Hassan_Ciroma'}
                      placeholderTextColor = {theme.secondaryTextColor}
                      textColor={theme.primaryTextColor}
                      inputType={'name'}
                      keyboardType={'default'}
                      onChangeText = {(linkedIn)=>{this.setState({linkedIn})}}
                      autoCapitalize = "words"
                      height = {30}
                      width = {'100%'}
                      borderBottomWidth = {0}
                      borderColor = {theme.colorAccent}
                      editable={linkedInStatus}
                      /> 
                    <TouchableOpacity 
                      style = {{paddingLeft : 8, paddingTop : 8}}
                      onPress = {this.handlelinkedInStatus}>
                      <Image
                        onPress = {this.handlelinkedInStatus}
                        source = {require('../../assets/images/edit.png')}
                        style = {StyleSheet.flatten(styles.penIcon)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style = {styles.toggleButtonView}>
                  <Switch
                    onValueChange={this._handleToggleLnSwitch}
                    value={this.state.switchValueLn}
                    trackColor = {theme.secondaryTextColor}
                    thumbColor = {theme.colorAccent}
                    />
                </View>
              </View>
            </View>
            {/* Instagram */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {styles.textInputView}>
                  <View style = {{flexDirection : 'row', width : '75%'}}>
                    <Image
                      source = {require('../../assets/images/instagram.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <InputField
                      placeholder={'CiromaHassan'}
                      placeholderTextColor = {theme.secondaryTextColor}
                      textColor={theme.primaryTextColor}
                      inputType={'name'}
                      keyboardType={'default'}
                      onChangeText = {(instagram)=>{this.setState({instagram})}}
                      autoCapitalize = "words"
                      height = {30}
                      width = {'100%'}
                      borderBottomWidth = {0}
                      borderColor = {theme.colorAccent}
                      editable={instagramStatus}
                      /> 
                    <TouchableOpacity 
                      style = {{paddingLeft : 8, paddingTop : 8}}
                      onPress = {this.handleInstagramStatus}>
                      <Image
                        onPress = {this.handleInstagramStatus}
                        source = {require('../../assets/images/edit.png')}
                        style = {StyleSheet.flatten(styles.penIcon)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style = {styles.toggleButtonView}>
                  <Switch
                    onValueChange={this._handleToggleInSwitch}
                    value={this.state.switchValueIn}
                    trackColor = {theme.secondaryTextColor}
                    thumbColor = {theme.colorAccent}
                    />
                </View>
              </View>
            </View>
          </View>
          <View style = {styles.btnView}>
            <SubmitButton
              title={'Sign Up'}
              disabled={false}
              onPress={this.handleOnboardSocial}
              imgSrc={require('../../assets/images/resume.png')}
              btnStyle={styles.buttonWithImage}
              imgStyle={StyleSheet.flatten(styles.iconDoor)}
              titleStyle={StyleSheet.flatten(styles.buttonTxt)}
            />
 
            <Toast
              ref="toast"
              style={{backgroundColor: 'green'}}
              position='bottom'
              positionValue={200}
              fadeInDuration={750}
              fadeOutDuration={5000}
              opacity={0.8}
              textStyle={{color:'white'}}
            /> 

            <ProgressDialog
              visible={showLoading}
              title="Processing"
              message="Please wait..."
            />
            <SingleButtonAlert
              title = {'Hello'} 
              message = {message}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showAlert}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    
   )
  }
} 
