'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import { postRoute, getRoute, getEmail, } from '../../utils';



export default class People extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
    }
  }

  people = [
    {
      "_id": "5d1f909571e71900179b72f3",
      "email": "mastat17@yahoo.com",
      "name": "Tunde Anwo",
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
      "short_bio": "Love lifeAug 18, 2018 - If you have been developing mobile people have thought about and already!!",
      "title": "Mr",
      "twitter": "btcrown",
      "twitter_visible": true,
      "website": "www.Cobwebsolutionsng.com",
      "linkedin": "btcrown",
      "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

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
    "short_bio": "Love lifeAug 18, 2018 - If you have been developing mobile people have thought about and already!!",
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
      "name": "Edward Obande",
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
    "name": "Victor Ajor",
    "expo_token": "ExponentPushToken[dmwWVMIU9rFjTYuwJk30Rv]",
    "event": [],
    "__v": 0,
    "job_title": "Developers",
    "title": "Mrs",
    "company_name": "logical address",
    "gender": "Male",
    "short_bio": "you have been developing mobile people have thought about and already!!",
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
    "name": "Dihweng Albert",
    "expo_token": "ExponentPushToken[dmwWVMIU9rFjTYuwJk30Rv]",
    "event": [],
    "__v": 0,
    "job_title": "Developers",
    "title": "Mrs",
    "company_name": "logical address",
    "gender": "Male",
    "short_bio": "Love lifeAug 1 people have thought about and already!!",
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
  componentWillMount(){
    // logout();
    this.setState({
      data:this.people
    })
  }


  handleGoBack = () => {
    return this.props.navigation.goBack();
  }
  handlePeopleMain(item){
    return this.props.navigation.navigate('PeopleMain', {
       item
    });
  }
  renderRow = ({item}) => {
    return (
       <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handlePeopleMain(item)}
          style = {styles.cardView}>
          <View style ={styles.imageText}>
          <View style = {styles.ImageView}>
            <Image
              source = {{uri: item.photo}}
              style = {StyleSheet.flatten(styles.personImage)}
            />
          </View>
          <View style = {styles.txtView}>
            <DisplayText
              numberOfLines = { 1 } 
              ellipsizeMode = 'middle'
              text = {item.name}
              styles = {StyleSheet.flatten(styles.headerText)}
            />

            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.company_name}
              styles = {StyleSheet.flatten(styles.subHeaderText)}
            />
          </View>
          </View>
            <View style={styles.buttonMoreView}>
              <View style = {styles.bioTextView}>
                <DisplayText
                  numberOfLines = { 2 } 
                  ellipsizeMode = 'middle'
                  text = {item.short_bio}
                  styles = {StyleSheet.flatten(styles.bioDetailTxt)}
                />
              </View>
              <TouchableOpacity style = {styles.plusBtn}>
                <Image
                  source = {require('../../assets/images/plus_btn.png')}
                  style = {StyleSheet.flatten(styles.plusIcon)}
                />
              </TouchableOpacity>
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
             text = {"PEOPLE"}
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