'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Text,Image, Modal, TouchableOpacity, TouchableHighlight,StyleSheet,} from 'react-native';
import {DisplayText, InputField } from '../../components';
import styles from './styles';
import colors from '../../assets/colors'
import theme from '../../assets/theme';

export default class OnboardingProfile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      category : 'Speaker',
      isValidCategory : false,
      catVisible : false,
      modalCategoryVisible : false,

      title : 'Mr.',
      isValidTitle : false,
      titleVisible : false,
      modalTitleVisible : false,

      isNameValid: false,
      name : '',
      jobTitle : '',
      isJobTitleValid : false,
    }
  }
  handleEdit = () => {
    alert('edit me please eddie')
  }

  //set Category picker
  setCategoryPicker = (catValue) => {
    this.setState({
      category: catValue,
      isValidCategory: true
    });
    this.closeCategoryModal();
  }

  handleCategory = () => {
    this.toggleCategoryModal(true);
  };

  toggleCategoryModal = (catVisible) => {
    this.setState({ modalCategoryVisible : catVisible });
  };

  closeCategoryModal = () => {
    this.toggleCategoryModal(!this.state.modalCategoryVisible);
  };

    //set Title picker
  setTitlePicker = (titleValue) => {
    this.setState({
      title: titleValue,
      isValidTitle: true
    });
    this.closeTitleModal();
  }

  handleTitle = () => {
    this.toggleTitleModal(true);
  };

  toggleTitleModal = (titleVisible) => {
    this.setState({ modalTitleVisible : titleVisible });
  };

  closeTitleModal = () => {
    this.toggleTitleModal(!this.state.modalTitleVisible);
  };
  handleNameChange = (name) => {
    if(name.length > 0) {
      this.setState({
        isNameValid: true,
        name : name
      });
    }
    else {
      if (name.length < 1) {
        this.setState({
          isNameValid : false
        });
      }
    }
  }
  handleJobTitleChange = (jobTitle) => {
    if(jobTitle.length > 0) {
      this.setState({
        isJobTitleValid: true,
        jobTitle : jobTitle
      });
    }
    else {
      if (jobTitle.length < 1) {
        this.setState({
          isJobTitleValid : false
        });
      }
    }
  }


  render () {
    const pickerCategory = [
      {title: 'Speaker', value: 'Speaker'},
      {title: 'Organiser', value: 'Organiser'},
      {title: 'Attende', value: 'Attende'},

    ];
    const pickerTitle = [
      {title: 'Mr.', value: 'Mr'},
      {title: 'Mrs.', value: 'Mrs'},
      {title: 'Miss.', value: 'Miss'},
      {title: 'Dr.', value: 'Dr'},
      {title: 'Prof.', value: 'Prof'},

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
            text={'ONBOARDING PROFILE'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
      {/* End of Toolbar */}
      <View style = {styles.viewBody}>

        <View style = {styles.imageView}>
          <Image
            source = {require('../../assets/images/sample_pics.png')}
            style = {StyleSheet.flatten(styles.imageStyle)}
          />
          <TouchableOpacity 
            style = { styles.cameraTouch}>
            <Image
              source = {require('../../assets/images/camera.png')}
              style = {StyleSheet.flatten(styles.cameraIcon)}
            />
        </TouchableOpacity>
        </View>
        <DisplayText
          styles={StyleSheet.flatten(styles.profileNameTxt)}
          text = {'Mr Ciroma Hassan'}
        />
          <TouchableOpacity 
            onPress = {this.handleCategory}
            style = { styles.userCathegoryView}>
            <DisplayText
              onPress = {this.handleCategory}
              styles={StyleSheet.flatten(styles.userCathegoryTxt)}
              text = {this.state.category}
            />
            <Image
              source = {require('../../assets/images/down_arrow.png')}
              style = {StyleSheet.flatten(styles.downArrow)}
            />
          </TouchableOpacity> 

          <Modal
            animationType="slide"
            transparent={true}
            visible = {this.state.modalCategoryVisible}
            onRequestClose={() => {console.log('Request was closed')}}>
            <View style={styles.modalContainer}> 
              <View style={styles.modalStyle}>
                <ScrollView 
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ padding: 16}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <DisplayText
                      style={styles.textHeaderStyle}
                      text ={' Category '} 
                      />
                    {pickerCategory.map((value, index) => {
                      return <TouchableHighlight key={index} onPress={() => this.setCategoryPicker(value.value)}>
                        <Text style={styles.modalTxt}>{value.title}</Text>
                      </TouchableHighlight>;
                    })
                    }                    
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          {/* text input view */}
        
          <View style = {styles.titleView}>
            <DisplayText
              styles={StyleSheet.flatten(styles.titleText)}
              text = {'Title'}
            />
            <View style = {styles.selectView}>
              <TouchableOpacity 
                onPress = {this.handleCategory}
                style = { styles.userTitleView}>
                <DisplayText
                  onPress = {this.handleTitle}
                  styles={StyleSheet.flatten(styles.inputTxt)}
                  text = {this.state.title}
                />
                <Image
                  source = {require('../../assets/images/down_arrow.png')}
                  style = {StyleSheet.flatten(styles.downArrow)}
                />
              </TouchableOpacity> 
              <TouchableOpacity onPress = {this.handleEdit}>
                <Image
                  onPress = {this.handleEdit}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible = {this.state.modalTitleVisible}
              onRequestClose={() => {console.log('Request was closed')}}>
              <View style={styles.modalContainer}> 
                <View style={styles.modalStyle}>
                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <DisplayText
                        style={styles.textHeaderStyle}
                        text ={'Title'} 
                        />
                      {pickerTitle.map((value, index) => {
                        return <TouchableHighlight key={index} onPress={() => this.setTitlePicker(value.value)}>
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
          {/* Name TextInput */}
          <View style = {styles.nameInputView}>
            <DisplayText
              styles={StyleSheet.flatten(styles.titleText)}
              text = {'Name'}
            />
            <View style = {{flexDirection : 'row', width : '90%'}}>
              <InputField
                // placeholder={'Email'}
                placeholderTextColor = {colors.blackShade}
                textColor={colors.blackShade}
                inputType={'email'}
                keyboardType={'email'}
                onChangeText = {this.handleNameChange}
                autoCapitalize = "word"
                height = {30}
                width = {'80%'}
                borderBottomWidth = {0}
                borderColor = {theme.secondaryTextColor}
                /> 
                <TouchableOpacity onPress = {this.handleEdit}>
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
              text = {'Job Title'}
            />
            <View style = {{flexDirection : 'row', width : '90%'}}>
              <InputField
                // placeholder={'Email'}
                placeholderTextColor = {colors.blackShade}
                textColor={colors.blackShade}
                inputType={'email'}
                keyboardType={'email'}
                onChangeText = {this.handleJobTitleChange}
                autoCapitalize = "word"
                height = {30}
                width = {'80%'}
                borderBottomWidth = {0}
                borderColor = {theme.secondaryTextColor}
                /> 
                <TouchableOpacity onPress = {this.handleEdit}>
                <Image
                  onPress = {this.handleEdit}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            onPress = {this.handleEdit}
            style = {styles.buttonView}>
            <DisplayText
              onPress = {this.handleEdit}
              text={'NEXT'}
              styles = {StyleSheet.flatten(styles.txtNext)}
            />
            <Image
              onPress = {this.handleEdit}
              source = {require('../../assets/images/send_arrow.png')}
              style = {StyleSheet.flatten(styles.nextIcon)}
            />
          </TouchableOpacity>
          
      </View>
    </SafeAreaView>
    )
  }
} 
