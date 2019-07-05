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
import {connect} from 'react-redux';
import { addProfile } from '../../redux/actions/profileActions';


 class OnboardingProfile extends Component {
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
       title:'',
      isNameValid: false,
      name : '',
      job_title : '',
      isJobTitleValid : false,
      role:'',
      _id:'',
      name_title: 'Mr',
      token: '',
      name: '',
      namestatus: false,
      jobstatus: false,
      jobtitle: '',
      photo:'',
      isNameFocused:false,
      isJobTitleFocused:false,
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
     
    }
  }

  handleEdit = () => {
    this.props.navigation.navigate('OnboardingSocial')
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
    
     await sendRoute (ImageUploadEndpoint, data)
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
        jobstatus:false, 
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

    const {name, job_title, name_title} = this.state;
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

    let data = await {
      title: name_title, name, job_title  
    };

    this.props.setProfile(data);
    this.props.navigation.navigate('OnboardingBio');
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
    const {showLoading, name_title, title, message, showAlert, name, photo, jobtitle, isNameFocused, isJobTitleFocused} = this.state;
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
            text={'PROFILE'}
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
        
          <View style = {styles.titleView}>
            <DisplayText
              styles={StyleSheet.flatten(styles.pickerLabel)}
              text = {'Title'}
            />
            <View style = {styles.selectView}>
              <View style={styles.pickerView}>
                <Picker
                  selectedValue={name_title}
                  style={styles.userCathegoryView}
                  onValueChange={name_title => this.setState({ name_title })}>
                  <Picker.Item  label="Mr." value="Mr." />
                  <Picker.Item label="Mrs" value="Mrs" />
                  <Picker.Item label="Dr." value="Dr." />
                  <Picker.Item label="Chief" value="Chief" />
                </Picker>

              </View>
              
              <TouchableOpacity>
                
                <Image
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}/>
              </TouchableOpacity>
            </View>
            
          </View>
          {/* Name TextInput */}
          <View style = {[styles.nameInputView, { 
            borderBottomColor: isNameFocused ? colors.green
            :theme.secondaryTextColor,
              }]}>
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
                borderColor = {theme.colorAccent}
                defaultValue = {name}
                editable = {true}
                ref={this.fullname}
                returnKeyType = {"next"}
                blurOnSubmit={false}
                onFocus={()=>this.setState({isNameFocused:true})}
                onBlur={()=>this.setState({isNameFocused:false})}
                onSubmitEditing={() => { 
                  this.jobTitleRef && this.jobTitleRef.focus()
                }}
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
          <View style = {[styles.nameInputView, { 
            borderBottomColor: isJobTitleFocused ? colors.green
            :theme.secondaryTextColor,
              }]}>
            <DisplayText
              styles={StyleSheet.flatten(styles.titleText)}
              text = {'Job Title'}
            />
            <View style = {{flexDirection : 'row', width : '90%'}}>
              <InputField
                placeholderTextColor = {colors.blackShade}
                textColor={theme.primaryTextColor}
                inputType={'default'}
                keyboardType={'default'}
                onChangeText = {this.handleJobTitleChange}
                autoCapitalize = "words"
                height = {25}
                width = {'100%'}
                returnKeyType = {"done"}
                borderColor = {theme.colorAccent}
                defaultValue = {jobtitle}
                editable={true}
                returnKeyType = {"next"}
                blurOnSubmit={false}
                refs={(input) => { this.jobTitleRef = input; }}
                onFocus={()=>this.setState({isJobTitleFocused:true})}
                onBlur={()=>this.setState({isJobTitleFocused:false})}
                onSubmitEditing={() => { 
                  this.handleSubmitForm();
                }}
                
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

const mapStateToProps = (state, ownProps) =>{
  return  {
     // isLoggedIn: state.authreducer.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      setProfile: (data) =>{dispatch(addProfile(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingProfile)

