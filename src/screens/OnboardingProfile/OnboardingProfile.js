'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, KeyboardAvoidingView,StatusBar,Picker, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert } from '../../components';
import styles from './styles';
import colors from '../../assets/colors'
import theme from '../../assets/theme';
import {logout, isEmpty, putRoute, sendRoute, ProfileUpdateEndpoint, ImageUploadEndpoint, getProfile} from '../../utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';



export default class OnboardingProfile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      isValidCategory : false,
      catVisible : false,
      modalCategoryVisible : false,
      token: '',
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
      token: '',
      name: '',
      namestatus: false,
      jobstatus: false,
      jobtitle: '',
      photo:'',
    }
  }

  async componentDidMount(){
    //logout();
    let profile = await getProfile();  
    return await this.setState({
      '_id' : profile.id,
      'token' : profile.sessionToken,
      'name': profile.name,
    })
  }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: 'Images',
        quality:0.1,
        base64:true,
      });
      this._handleImagePicked(pickerResult);
    }
  }

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
       showLoading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await this.uploadImageAsync(pickerResult); 
      }
    } catch (e) {
      this.setState({
        showAlert: true,
        message: 'Oops Something Went Wrong',
        title: 'Hello'
        });
    } finally {
      // this.setState({
      //   showAlert: true,
      //   message: 'Oops Something Went Wrong',
      // title: 'Hello0'
      // });
    }
  }

  handleEdit = () => {
    // this.props.navigation.navigate('DashBoard')
  }

  uploadImageAsync = async(pickerResult) =>{
    this.setState({
      showLoading: true,
    });

    let uriParts = pickerResult.uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
    let data = await JSON.stringify({
      'photo' : pickerResult.base64 ,
      'name' : Math.floor(Date.now() / 1000).toString(),
      'type' : `${pickerResult.type}/${fileType}`
    });
    
     await sendRoute (ImageUploadEndpoint, data, 'POST')
      .then((res) => {
        this.setState({ 
          showLoading : false, 
        });

        if(typeof res.Location !== 'undefined') {
          this.handleUpdateImageUri(res.Location); 
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
  handleNametataus = ()=> {
    return this.setState(prevState=>({
        namestatus:!prevState.namestatus,
        jobstatus:false
      })
    )
  }

  handleJobStataus = ()=> {
    return this.setState(prevState=>({
      jobstatus:!prevState.jobstatus,
      namestatus:false
    })
  )
  }


  handleUpdateImageUri =async(photo)=>{
     const {_id, token} = this.state
    let data = await JSON.stringify({
      'query':{_id},
      'update' : {photo}   
    });

    await putRoute (ProfileUpdateEndpoint, data, token)
      .then((res) => {
        this.setState({ 
          showLoading : false, 
        });

        if(res.status == 'success') {
          this.setState({ 
            showLoading : false, 
            photo:res.data.photo,
          });
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

  handleSubmitForm =async()=> {
    const {name, job_title, title, _id, token} = this.state;
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

    this.setState({
      showLoading: true,
    });

    let data = await JSON.stringify({
      'query':{_id},
      'update' : {title, name, job_title}   
    });

    await putRoute (ProfileUpdateEndpoint, data, token)
      .then((res) => {
        this.setState({ 
          showLoading : false, 
        });

        if(res.status == 'success') {
          this.setState({ 
            showLoading : false, 
          });
          this.props.navigation.navigate('OnboardingBio')
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
    const {showLoading, title, message, showAlert, name, photo, jobtitle, namestatus, jobstatus} = this.state;
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
      <KeyboardAvoidingView
          style={styles.wrapper}
          behavior = 'padding'> 
        <ScrollView style={{flex:1,}} showsVerticalScrollIndicator={false}>
          <View style = {styles.viewBody}>

        <View style = {styles.imageView}>

        { 
            photo && photo.length > 0 ?
            <Image 
              source={{ uri: photo }} 
              style={styles.imageStyle} 
              /> 
              : 
            <Image
              resizeMode = 'center'
              style = {styles.imageStyle}
              source = {require('../../assets/images/sample_pics.png')}
              />
          }
          
          <TouchableOpacity 
            style = { styles.cameraTouch}
            onPress={this._pickImage}
          >
            <Image
              onPress={this._pickImage}
              source = {require('../../assets/images/camera.png')}
              style = {StyleSheet.flatten(styles.cameraIcon)}
            />
        </TouchableOpacity>
        </View>
        <DisplayText
          styles={StyleSheet.flatten(styles.profileNameTxt)}
          text = {name}
        />
        {/* <View style={{borderBottomWidth:1, borderColor: 'rgb(204, 204, 204)', width:'50%'}}>
          <Picker
            selectedValue={this.state.role}
           // style={styles.userCathegoryView}
            onValueChange={role => this.setState({ role })}>
            <Picker.Item  label="attendee" value="attendee" />
            <Picker.Item label="speaker" value="speaker" />
            <Picker.Item label="sponsor" value="sponsor" />
            <Picker.Item label="user" value="user" />
          </Picker>
         </View>  */}
        
          <View style = {styles.titleView}>
            <DisplayText
              styles={StyleSheet.flatten(styles.pickerLabel)}
              text = {'Title'}
            />
            <View style = {styles.selectView}>
              {/* <View style={{borderBottomWidth:0, borderColor: 'rgb(204, 204, 204)', width:'90%'}}> */}
              <View style={styles.pickerView}>

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
                  style = {StyleSheet.flatten(styles.penIcon)}/>
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
                textColor={theme.primaryTextColor}
                inputType={'name'}
                keyboardType={'default'}
                onChangeText = {this.handleNameChange}
                autoCapitalize = "words"
                height = {25}
                width = {'100%'}
                //borderBottomWidth = {0}
                borderColor = {theme.colorAccent}
                defaultValue = {name}
                editable = {namestatus}
                /> 
                <TouchableOpacity onPress = {this.handleNametataus}>
                <Image
                  onPress = {this.handleNamestatus}
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
                textColor={theme.primaryTextColor}
                inputType={'default'}
                keyboardType={'default'}
                onChangeText = {this.handleJobTitleChange}
                autoCapitalize = "words"
                height = {25}
                width = {'100%'}
                //borderBottomWidth = {0}
                borderColor = {theme.colorAccent}
                defaultValue = {jobtitle}
                editable={jobstatus}
                /> 
                <TouchableOpacity onPress = {this.handleJobStataus}>
                <Image
                  onPress = {this.handleJobStataus}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            onPress = {this.handleSubmitForm}
            style = {styles.buttonView}>
            <DisplayText
              onPress = {this.handleSubmitForm}
              text={'NEXT'}
              styles = {StyleSheet.flatten(styles.txtNext)}
            />
            <Image
              onPress = {this.handleSubmitForm}
              source = {require('../../assets/images/send_arrow.png')}
              style = {StyleSheet.flatten(styles.nextIcon)}
            />
          </TouchableOpacity>

          <ProgressDialog
              visible={showLoading}
              title="Processing"
              message="Please wait..."
            />
        </View>
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
