'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet, Picker} from 'react-native';
import { getToken, getUserId, ProfileUpdateEndpoint, isEmpty, putRoute, logout} from '../../utils';
import {DisplayText, InputField, SingleButtonAlert } from '../../components';
import styles from './styles';
import colors from '../../assets/colors'
import theme from '../../assets/theme';
import { ProgressDialog } from 'react-native-simple-dialogs';

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
      token: '',
      title : 'Mr.',
      isValidTitle : false,
      titleVisible : false,
      modalTitleVisible : false,
      showLoading: false,

      isNameValid: false,
      name : '',
      job_title : '',
      isJobTitleValid : false,
      role:'',
      _id:'',
      title: '',
    }
  }

   async componentDidMount(){
    //logout();
     let _id = await getUserId(),
      token = await getToken();
    return await this.setState({
      token, _id
    });

    
  }
  handleEdit = async() => {
    alert('edit me please eddie')
  }

  submitForm =async()=> {
    const {name, job_title, role, title, _id, token} = this.state;
   // let expoToken = await getExpoToken();
       console.log('helllooo...')
    if(isEmpty(name)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Name'
      })
    }
    else if(isEmpty(job_title)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Job Title'
      })
    }
    console.log('helllooo22...')

    this.setState({
      showLoading: true,
    });

    let data = await JSON.stringify({
      'query':{_id},
      'update' : {title, name, job_title, role}   
    });
    console.log({token})
    console.log({data})
    console.log({ProfileUpdateEndpoint})

    await putRoute (ProfileUpdateEndpoint, data, token)
      .then((res) => {
        console.log({res})
        this.setState({ 
          showLoading : false, 
        });

        // if(typeof res.status == 'undefined') {
        //   this.setState({ 
        //     showLoading : false, 
        //   });
        //   if(!res.payload.verified) {
        //     saveEmail(res.payload.email);
        //     return this.resetNavigationStack('Verification');         
        //   }
        //   else if(res.payload.verified) {
        //     saveToken(res.token);
        //     return this.resetNavigationStack('Profile');    
        //   }
        // } 
        // else {
          //this.setState({ 
           // showLoading : false, 
          //  message: res.message,
           // showAlert: true,
           // title: 'Hello'
         // });
       // }
      });
  }

  
  handleNameChange = (name) => {
    if(name.length > 0) {
      this.setState({
        isNameValid: true,
        name
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
  handleJobTitleChange = (job_title) => {
    if(job_title.length > 0) {
      this.setState({
        isJobTitleValid: true,
        job_title
      });
    }
    else {
      if (job_title.length < 1) {
        this.setState({
          isJobTitleValid : false
        });
      }
    }
  }


  render () {
    const {showLoading, title, message, showAlert} = this.state;
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
        <View style={{borderBottomWidth:1, borderColor: 'rgb(204, 204, 204)', width:'50%'}}>
          <Picker
            selectedValue={this.state.role}
           // style={styles.userCathegoryView}
            onValueChange={role => this.setState({ role })}>
            <Picker.Item  label="attendee" value="attendee" />
            <Picker.Item label="speaker" value="speaker" />
            <Picker.Item label="sponsor" value="sponsor" />
            <Picker.Item label="user" value="user" />
          </Picker>
         </View> 
        
          <View style = {styles.titleView}>
            <DisplayText
              styles={StyleSheet.flatten(styles.titleText)}
              text = {'Title'}
            />
            <View style = {styles.selectView}>
              <View style={{borderBottomWidth:0, borderColor: 'rgb(204, 204, 204)', width:'90%'}}>

                <Picker
                  selectedValue={this.state.title}
                  style={styles.userCathegoryView}
                  onValueChange={title => this.setState({ title })}>
                  <Picker.Item  label="Mr." value="Mr." />
                  <Picker.Item label="Mrs" value="Mrs" />
                  <Picker.Item label="Dr." value="Dr." />
                  <Picker.Item label="Chief" value="Chief" />
                </Picker>

              </View>
              
              <TouchableOpacity onPress = {this.handleEdit}>
                <Image
                  onPress = {this.handleEdit}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>
            
          </View>
          {/* Name TextInput */}
          <View style = {styles.nameInputView}>
            <DisplayText
              styles={StyleSheet.flatten(styles.titleText)}
              text = {'Name'}
            />
            <View style = {{flexDirection : 'row', width : '90%'}}>
              <InputField
                placeholderTextColor = {colors.blackShade}
                textColor={colors.blackShade}
                inputType={'text'}
                keyboardType={'default'}
                onChangeText = {this.handleNameChange}
                autoCapitalize = "none"
                width = {'100%'}
                borderBottomWidth = {0}
                borderBottomColor={'transparent'}
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
                autoCapitalize = "none"
                height = {30}
                width = {'100%'}
                borderBottomWidth = {0}
                borderBottomColor={'transparent'}
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
            onPress = {this.submitForm}
            style = {styles.buttonView}>
            <DisplayText
              onPress = {this.submitForm}
              text={'NEXT'}
              styles = {StyleSheet.flatten(styles.txtNext)}
            />
            <Image
              onPress = {this.submitForm}
              source = {require('../../assets/images/send_arrow.png')}
              style = {StyleSheet.flatten(styles.nextIcon)}
            />
          </TouchableOpacity>

          <ProgressDialog
            visible={showLoading}
            title="Processing"
            message="Please wait..."
          />

          <SingleButtonAlert
            title = {title} 
            message = {message}
            handleCloseNotification = {this.handleCloseNotification}
            visible = {showAlert}
          />
          
      </View>
    </SafeAreaView>
    )
  }
} 
