'use strict';
import React, {Component} from 'react';
import { View, ScrollView, FlatList, TextInput,KeyboardAvoidingView,Picker, Modal,
   Text, TouchableWithoutFeedback, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import data from '../../utils/Countries';
import colors from '../../assets/colors';
import { isEmpty,  putRoute, ProfileUpdateEndpoint, getProfile} from '../../utils';
import { ProgressDialog } from 'react-native-simple-dialogs';


export default class OnboardingBio extends Component {
  constructor(props) {
    super(props);
    this.state ={
      gender: '',
      nationalityModalVisible : false,
      nationality : 'Nationality',
      company : '',
      biodata : '',
      interests: '',
      companyStatus: false,
      biodataStatus: false,
      interestStatus: false,  
      showAlert: false,
      showLoading:false,  
      message: '',
      title: '',
      token:'',
      _id:'',

    }
  }

   async componentDidMount(){
    let profile = await getProfile();  
    return await this.setState({
      '_id' : profile.id,
      'token' : profile.sessionToken,
    })
  }

  handleCompanyStatus = () => {
    return this.setState(prevState => ({
      companyStatus: !prevState.companyStatus,
    }));
  }

  handleBiodataStatus = () => {
    return this.setState(prevState => ({
      biodataStatus: !prevState.biodataStatus,
    }));
  }

  handleInterestStatus = () => {
    return this.setState(prevState => ({
      interestStatus: !prevState.interestStatus,
    }));
  }
  
  handleAddMore = () => {
    alert('Alert add more');
  }

  // country modal
  selectNationality = async(country) => {
    // Get data from Countries.js  
    const countryData = await data
    try {
      //get country  name
      const countryName = await countryData.filter(
        obj => obj.name === country
      )[0].name
      // Update the state then hide the Modal
      this.setState({ 
        nationality : countryName,
      })
      await this.hideNationalityModal()
    }
    catch (err) {
      console.log(err)
    }
  }
  showNationalityModal = ()=> {
    this.setState({ 
      nationalityModalVisible: true 
    })
  }
  hideNationalityModal =()=> {
    this.setState({ 
      nationalityModalVisible: false 
    })
    // Refocus on the Input field after selecting the country code
    // this.refs.PhoneInput._root.focus()
  }


  handleCompanyChange = (company) => {
    
    this.setState({
      company
    });
    
  }
  handleShortBio = (biodata) => {
    
    this.setState({
      biodata
    });
   
  }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }


  handleNextButton =async()=> {

    const {gender, nationality, biodata, company, interest, _id, token} = this.state;
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
  
  render () {
    const countryData = data
    const {biodataStatus, companyStatus, title, message, showAlert, showLoading } = this.state;

   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colorAccent}/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          style = {styles.headerImage}
          onPress={()=>this.props.navigation.navigate('OnboardingProfile')}
          >
          <Image
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <DisplayText
            text={'ONBOARDING BIO'}
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
              {/* Gender modal selection */}
            <View style = {styles.titleView}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Gender'}
              />
              <View style = {styles.selectView}> 
                <View style={{ width:'90%'}}>
                  <Picker
                    selectedValue={this.state.gender}
                    onValueChange={gender => this.setState({ gender })}>
                    <Picker.Item  label="male" value="male" />
                    <Picker.Item label="female" value="female" />
                  </Picker>
                </View>
                  
                <Image
                  source = {require('../../assets/images/down_arrow.png')}
                  style = {StyleSheet.flatten(styles.downArrow)}
                />
            </View>
    
        </View>
        <View style = {styles.CountryView}>
          <DisplayText
            text={'Nationality'}
            styles = {styles.formHeaderTxt}
          />
          <TouchableOpacity 
            underlayColor={colors.white}
            onPress={() => this.showNationalityModal()}
            style = {styles.textBoder}>
            <View style = {styles.viewTxtNationality}>
              <Text style = {styles.inputTxt}>
                {this.state.nationality}
              </Text>
              <Image
                source = {require('../../assets/images/down_arrow.png')}
                style = {StyleSheet.flatten(styles.downArrow)}
              />
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={this.hideNationalityModal}
            visible={this.state.nationalityModalVisible}>
            <View style={{ flex : 1, paddingLeft : 20, paddingRight : 20}}>
              <View style={{ flex: 7, marginTop: 10 }}>
              {/* Render the list of countries */}
              <FlatList
                data={countryData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={
                  ({ item }) =>
                    <TouchableWithoutFeedback onPress={() => this.selectNationality(item.name)}>
                      <View style={styles.countryStyle}>
                        <Text style={styles.textStyle}>
                          {item.flag} {item.name} 
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                      }
                    />
                  </View>
                  <View style={styles.closeButtonStyle}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => this.hideNationalityModal()}>
                    <Text style={styles.textBtn}>
                      Close
                    </Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View style = {styles.nameInputView}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Company'}
              />
            <View style = {{flexDirection : 'row', width : '90%'}}>
              <InputField
                placeholderTextColor = {colors.blackShade}
                textColor={theme.primaryTextColor}
                inputType={'name'}
                keyboardType={'default'}
                onChangeText = {this.handleCompanyChange}
                autoCapitalize = "words"
                height = {30}
                width = {'100%'}
                borderBottomWidth = {0}
                borderColor = {colors.white}
                editable = {companyStatus}

                /> 
                <TouchableOpacity 
                  style = {{paddingLeft : 8}}
                  onPress = {this.handleCompanyStatus}>
                <Image
                  onPress = {this.handleCompanyStatus}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>
          </View>
            <View style = {styles.nameInputView}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Short Bio'}
              />
            <View style = {{flexDirection : 'row', width : '90%'}}>
              <TextInput
                placeholder = {'Graphic designers use computers or hand an tools to create posters, websites, logos, bro nchures, magazines and many other materials to communicate ideas and information'}
                numberOfLines = {5}
                multiline={true}
                onChangeText = {this.handleShortBio}
                style={styles.textInputStyles} 
                editable={biodataStatus}
                />
              <TouchableOpacity 
                style = {{paddingLeft : 8}}
                onPress = {this.handleBiodataStatus}>
                <Image
                  onPress = {this.handleBiodataStatus}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style = {styles.interestView}>
            <View style = {styles.interestHeader}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Interest'}
              />
              <TouchableOpacity onPress = {this.handleInterestStatus}>
                <Image
                  onPress = {this.handleInterestStatus}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>
            <View style = {styles.selectedInterest}>
              <TouchableOpacity 
                onPress = {this.handleAddMore}
                style = {styles.addmoreBtn}>
                <DisplayText
                  onPress = {this.handleAddMore}
                  text={'+Add more'}
                  styles = {StyleSheet.flatten(styles.addMore)}
                />
              </TouchableOpacity>
            </View>
            
          </View>
          <View style = {styles.btnViewNext}> 
            <TouchableOpacity 
              onPress = {this.handleNextButton}
              style = {styles.buttonView}>
              <DisplayText
                onPress = {this.handleNextButton}
                text={'NEXT'}
                styles = {StyleSheet.flatten(styles.txtNext)}
              />
              <Image
                onPress = {this.handleNextButton}
                source = {require('../../assets/images/send_arrow.png')}
                style = {StyleSheet.flatten(styles.nextIcon)}
              />
            </TouchableOpacity>
          </View>
            <ProgressDialog
              visible={showLoading}
              title="Processing"
              message="Please wait..."
            />  
        </ScrollView>
      </KeyboardAvoidingView>
       <SingleButtonAlert
          title = {title} 
          message = {message}
          handleCloseNotification = {this.handleCloseNotification}
          visible = {showAlert}
        />
    </SafeAreaView>
    )
  }
} 
