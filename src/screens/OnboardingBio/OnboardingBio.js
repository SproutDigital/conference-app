'use strict';
import React, {Component} from 'react';
import { View, ScrollView, FlatList, TextInput,KeyboardAvoidingView, Modal, Text, TouchableWithoutFeedback,TouchableHighlight, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import data from '../../utils/Countries';
import colors from '../../assets/colors';


export default class OnboardingBio extends Component {
  constructor(props) {
    super(props);
    this.state ={
      gender: 'Gender',
      isValidGender: false,
      modalGenderVisible: false,

      nationalityModalVisible : false,
      nationality : 'Nationality',
      isCompanyValid : false,
      company : '',
      shortBio : '',
      isShortBioValid : false
    }
  }

  handleNext = () => {
    return this.props.navigation.navigate('LastPage');
  }
  handleEdit = () => {
    console.log({click : editing});
  }
  handleAddMore = () => {
    alert('Alert add more');
  }
  
  //set gender picker
  setGenderPicker = (newValue) => {
    this.setState({
      gender: newValue,
      isValidGender: true
    });
    this.closeGenderModal();
  }

  handleGender = () => {
    this.toggleGenderModal(true);
  };

  toggleGenderModal = (visible) => {
    this.setState({ modalGenderVisible : visible });
  };

  closeGenderModal = () => {
    this.toggleGenderModal(!this.state.modalGenderVisible);
  };

  handleCompanyChange = (company) => {
    if(company.length > 0) {
      this.setState({
        isCompanyValid: true,
        company : company
      });
    }
    else {
      if (company.length < 1) {
        this.setState({
          isCompanyValid : false
        });
      }
    }
  }
  handleShortBio = (shortBio) => {
    if(shortBio.length > 0) {
      this.setState({
        isShortBioValid: true,
        shortBio : shortBio
      });
    }
    else {
      if (shortBio.length < 1) {
        this.setState({
          isShortBioValid : false
        });
      }
    }
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
  
  render () {
    const countryData = data
    const pickerGender = [
      {title: 'Female', value: 'Female'},
      {title: 'Male', value: 'Male'},
    ];
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
              {/* <View style = {styles.selectView}> */}
              <TouchableOpacity 
                onPress = {this.handleGender}
                style = { styles.userGenderView}>
                <DisplayText
                  onPress = {this.handleGender}
                  styles={StyleSheet.flatten(styles.inputTxt)}
                  text = {this.state.gender}
                />
                <Image
                  source = {require('../../assets/images/down_arrow.png')}
                  style = {StyleSheet.flatten(styles.downArrow)}
                />
              </TouchableOpacity> 
            {/* </View> */}
            <Modal
              animationType="slide"
              transparent={true}
              visible = {this.state.modalGenderVisible}
              onRequestClose={() => {console.log('Request was closed')}}>
              <View style={styles.modalContainer}> 
                <View style={styles.modalStyle}>
                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <DisplayText
                        style={styles.textHeaderStyle}
                        text ={' Gender '} 
                        />
                      {pickerGender.map((value, index) => {
                        return <TouchableHighlight key={index} onPress={() => this.setGenderPicker(value.value)}>
                          <Text style={styles.modalTxt}>{value.title}</Text>
                        </TouchableHighlight>;
                      })
                    }                    
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
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
                // placeholder={'Email'}
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
          <View style = {styles.interestView}>
            <View style = {styles.interestHeader}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Interest'}
              />
              <TouchableOpacity onPress = {this.handleEdit}>
                <Image
                  onPress = {this.handleEdit}
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
              onPress = {this.handleNext}
              style = {styles.buttonView}>
              <DisplayText
                onPress = {this.handleNext}
                text={'NEXT'}
                styles = {StyleSheet.flatten(styles.txtNext)}
              />
              <Image
                onPress = {this.handleNext}
                source = {require('../../assets/images/send_arrow.png')}
                style = {StyleSheet.flatten(styles.nextIcon)}
              />
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    )
  }
} 
