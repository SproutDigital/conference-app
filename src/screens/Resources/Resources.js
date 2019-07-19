'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField, Preloader, ErrorAlert, SuccessAlert} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import {connect} from 'react-redux';
import * as FileSystem from 'expo-file-system';




 class Resources extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
      showSuccessAlert : false,
      successMessage: '',
      showErrorAlert: false,
      errorMessage: '',
      showLoading:false,
    }
    this.arrayholder = [];

  }

  componentDidMount(){
    this.setState({
      data: this.props.resources,
    });
    
    this.arrayholder = this.props.resources;
  }

 
  handleGoBack = () => {
    return this.props.navigation.goBack();
  }
  handlePeopleMain(item){
    return this.props.navigation.navigate('PeopleMain', {
       item
    });
  }

  handleCloseNotification = () => {
    return this.setState({
      showSuccessAlert : false,
      showErrorAlert: false
    });
  }

   async downloadResource(remoteUri){
    this.setState({showLoading : true})
    FileSystem.downloadAsync(
      'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
      FileSystem.documentDirectory +`${'resource.pdf'}`
    )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
        this.setState({
          showLoading: false,
          showSuccessAlert: true,
          successMessage : `${'Downloaded to'}${uri}`
          
        })
      })
      .catch(error => {
        console.error(error);
        this.setState({
          showLoading: false,
          showErrorAlert: true,
          errorMessage : `${'Downloaded to'}${error}`
          
        })
      });
  }
  renderRow = ({item}) => {
    console.log({item})
    return (
       <View style = {styles.listViewItem}>    
        <View style = {styles.cardView}>
          <DisplayText
             text = {item.title}
             styles = {StyleSheet.flatten(styles.titleText)}
           />
          <View style = {styles.resouceView}>
            <Image
              source = {require('../../assets/images/pdf.png')}
              style = {StyleSheet.flatten(styles.pdfIcon)}
            />
            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.description}
              styles = {StyleSheet.flatten(styles.resourceTxt)}
            />
       
          </View>
          <View style={styles.line}></View>
          <TouchableOpacity style = {styles.downloadBtn} onPress={()=>this.downloadResource(item.url, item.title)}>
            <DisplayText
              text = {'Download'}
              styles = {StyleSheet.flatten(styles.downloadtxt)}
            />
          </TouchableOpacity>
          
          </View>
        </View>
      );
  }

  render () {
    const {showLoading, errorMessage, showErrorAlert, successMessage, showSuccessAlert} = this.state;    

    return(
     <SafeAreaView style={styles.container}> 
       <StatusBar barStyle="default"/>
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
             text = {"RESOURCES"}
             styles = {StyleSheet.flatten(styles.txtHeader)}
           />
         </View>
       </View>
       <View style = {styles.viewBody}>
         <View style={styles.searchView}>
           <Image
             source = {require('../../assets/images/search.png')}
             style = {StyleSheet.flatten(styles.searchIcon)}
           />
           <InputField
             placeholder = {'Search Following'}
             placeholderTextColor = {theme.secondaryTextColor}
             textColor={theme.primaryTextColor}
             inputType={'name'}
             keyboardType={'default'}
             onChangeText={text => this.searchFilterFunction(text)}
             autoCorrect={false}
             value={this.state.value}
             height = {30}
             width = {'80%'}
             borderBottomWidth = {0}
             paddingLeft  = {8}
           /> 
         </View>
         <View style = { styles.dateView}>
          <DisplayText
             text = {"Filter"}
             styles = {StyleSheet.flatten(styles.txtFilter)}
           />
         <TouchableOpacity style = {styles.datebutton}>
          <DisplayText
             text = {"Date"}
             styles = {StyleSheet.flatten(styles.txtDate)}
           />
         </TouchableOpacity>
         </View>
           <FlatList          
             data={this.state.data}          
             renderItem={this.renderRow}          
             keyExtractor={ data=> data._id}   
             showsVerticalScrollIndicator={false}
           />
       </View>  
       <Preloader
          modalVisible={showLoading}
          animationType="fade"
        />
        <ErrorAlert
            title = {'Error!'} 
            message = {errorMessage}
            handleCloseNotification = {this.handleCloseNotification}
            visible = {showErrorAlert}
          />
        <SuccessAlert
          title = {'Success!'} 
          message = {successMessage}
          handleCloseNotification = {this.handleCloseNotification}
          visible = {showSuccessAlert}
        />
     </SafeAreaView>
     )
   }
 } 

 const mapStateToProps = (state, ownProps) =>{
  return{
    resources: state.ResourceReducer.resources
  }
}


export default connect(mapStateToProps)(Resources)