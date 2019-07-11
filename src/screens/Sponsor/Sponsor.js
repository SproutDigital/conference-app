'use strict';
import React, {Component} from 'react';
import { View,SafeAreaView, StatusBar, Image, FlatList, Text,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import theme from '../../assets/theme'

export default class Sponsor extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      data: []
    }
    this.arrayholder = [];

  }


  data = [
    {
      "_id": "5d1f909571e71900179b72f3",
      "email": "mastat17@yahoo.com",
      "name": "Babatunde Anwo-Ade",
      "expo_token": "ExponentPushToken[abY2COJOc1w7SzoGxa1SVZ]",
      "event": [],
      "__v": 0,
      "company_name": "cobweb solutions",
      "country": "Nigeria",
      "facebook": "btcrown",
      "facebook_visible": true,
      "gender": "male",
      "instagram": "btcrown",
      "instagram_visible": false,
      "job_title": "Digital Communications",
      "linkedin_visible": true,
      "phone": 2348094206060,
      "short_bio": "Love life!!",
      "title": "Mr",
      "twitter": "btcrown",
      "twitter_visible": true,
      "website": "www.Cobwebsolutionsng.com",
      "linkedin": "btcrown"
  },



  {
    "_id": "5d1f909571e71900179b72f2",
    "email": "mastat17@yahoo.com",
    "name": "Babatunde Anwo-Ade",
    "expo_token": "ExponentPushToken[abY2COJOc1w7SzoGxa1SVZ]",
    "event": [],
    "__v": 0,
    "company_name": "cobweb solutions",
    "country": "Nigeria",
    "facebook": "btcrown",
    "facebook_visible": true,
    "gender": "male",
    "instagram": "btcrown",
    "instagram_visible": false,
    "job_title": "Digital Communications",
    "linkedin_visible": true,
    "phone": 2348094206060,
    "short_bio": "Love life!!",
    "title": "Mr",
    "twitter": "btcrown",
    "twitter_visible": true,
    "website": "www.Cobwebsolutionsng.com",
    "linkedin": "btcrown",
    "photo": "https://s3.us-west-2.amazonaws.com/spr-bucket/1562533768",

  },

  
  {
      "_id": "5d1c92249b0b080017036e52",
      "email": "edwardobande36@gmail.com",
      "name": "Etisalat",
      "expo_token": "ExponentPushToken[dmwWVMIU9rFjTYuwJk30Rv]",
      "event": [],
      "__v": 0,
      "job_title": "Developers",
      "title": "Mrs",
      "company_name": "logical address",
      "gender": "Male",
      "short_bio": "Very easy ND fast learner",
      "facebook": "Edward.obande",
      "facebook_visible": true,
      "instagram": "eddie",
      "instagram_visible": false,
      "linkedin_visible": true,
      "phone": 3568103727918,
      "twitter": "@eddiebigs",
      "twitter_visible": true,
      "website": "Facebook. Com",
      "country": "Greenland",
      "photo": "https://yt3.ggpht.com/a-/ACSszfGfL6O_P3JLe_4K7DYh2jsqdmVUYAdhOJKP=s900-mo-c-c0xffffffff-rj-k-no",
      "linkedin": "edddiessss"
  },

  {
    "_id": "5d1c92249b0b080017036e51",
    "email": "edwardobande36@gmail.com",
    "name": "GLO",
    "expo_token": "ExponentPushToken[dmwWVMIU9rFjTYuwJk30Rv]",
    "event": [],
    "__v": 0,
    "job_title": "Developers",
    "title": "Mrs",
    "company_name": "logical address",
    "gender": "Male",
    "short_bio": "Very easy ND fast learner",
    "facebook": "Edward.obande",
    "facebook_visible": true,
    "instagram": "eddie",
    "instagram_visible": false,
    "linkedin_visible": true,
    "phone": 3568103727918,
    "twitter": "@eddiebigs",
    "twitter_visible": true,
    "website": "Facebook. Com",
    "country": "Greenland",
    "photo": "http://freedomonline.com.ng/wp-content/uploads/2013/05/glo_logo.jpg",
    "linkedin": "edddiessss"
  },

  {
    "_id": "5d1c92249b0b080017036e53",
    "email": "edwardobande36@gmail.com",
    "name": "MTN",
    "expo_token": "ExponentPushToken[dmwWVMIU9rFjTYuwJk30Rv]",
    "event": [],
    "__v": 0,
    "job_title": "Developers",
    "title": "Mrs",
    "company_name": "logical address",
    "gender": "Male",
    "short_bio": "Very easy ND fast learner",
    "facebook": "Edward.obande",
    "facebook_visible": true,
    "instagram": "eddie",
    "instagram_visible": false,
    "linkedin_visible": true,
    "phone": 3568103727918,
    "twitter": "@eddiebigs",
    "twitter_visible": true,
    "website": "Facebook. Com",
    "country": "Greenland",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",
    "linkedin": "edddiessss"
  }
  ];

  componentDidMount(){
    this.setState({
      data:this.data
    })
    this.arrayholder = this.data;
  }
  

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.short_bio.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    return this.setState({
      data: newData,
    });
  }

  
  handleGoBack = () => {
    return this.props.navigation.goBack();
  }
  handleViewSponser = () => {
    return this.props.navigation.navigate('SponsorDetails');
  }


  renderRow = ({item}) => {
    return (
      <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {this.handleViewSponser}
          style = {styles.cardView}>
          <View style = {styles.sponsorImageView}>
            <Image
              source = {{uri: item.photo}}
              style = {StyleSheet.flatten(styles.sponsorImage)}
            />
          </View>
          <View style = {styles.txtView}>
            <DisplayText
              text = {item.name}
              styles = {StyleSheet.flatten(styles.headerText)}
            />
 
             <Text  
              // onPress = {() => this.handleFlatlist()} 
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
               style = {styles.subHeaderText}>
              {item.short_bio}
            </Text>
            
            <View style={styles.buttonMoreView}>
              <DisplayText
                text = {"see more"}
                styles = {StyleSheet.flatten(styles.moreText)}
              />
              <TouchableOpacity style ={styles.iconView}>
                <Image
                  source = {require('../../assets/images/contactplusicon.png')}
                  style = {StyleSheet.flatten(styles.plusIcon)}
                />
              </TouchableOpacity>
            </View>
          </View>
          
        </TouchableOpacity>
        
      </View>
    );
  }

  
  render () {
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
            text = {"Sponsor List"}
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
        {/* Add this disign to you flatlist after fetching your data */}
          <FlatList          
            data={this.state.data}          
            renderItem={this.renderRow}          
            keyExtractor={ data=> data._id}   
            showsVerticalScrollIndicator={false}
          
          />
        
      </View>  
      
    </SafeAreaView>
    
   )
  }
} 


// const mapStateToProps = (state, ownProps) =>{
//   return  {
//      // isLoggedIn: state.authreducer.isLoggedIn
//   }
// }

// const mapDispatchToProps = (dispatch) =>{
//   return{
//     setProfile: (data) =>{dispatch(addProfile(data))},
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Sponsor)

