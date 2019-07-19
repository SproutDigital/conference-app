'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import {connect} from 'react-redux';

class People extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
    }
  }


  componentWillMount(){
    const {speakers, sponsors, attendees} = this.props
    this.setState({
      data: [ ...speakers, ...sponsors, ...attendees],
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
              source = {{uri: item.profile.photo}}
              style = {StyleSheet.flatten(styles.personImage)}
            />
          </View>
          <View style = {styles.txtView}>
            <DisplayText
              numberOfLines = { 1 } 
              ellipsizeMode = 'middle'
              text = {item.profile.name}
              styles = {StyleSheet.flatten(styles.headerText)}
            />

            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.profile.company_name}
              styles = {StyleSheet.flatten(styles.subHeaderText)}
            />
          </View>
          </View>
            <View style={styles.buttonMoreView}>
              <View style = {styles.bioTextView}>
                <DisplayText
                  numberOfLines = { 2 } 
                  ellipsizeMode = 'middle'
                  text = {item.profile.short_bio}
                  styles = {StyleSheet.flatten(styles.bioDetailTxt)}
                />
              </View>
              {/* <TouchableOpacity style = {styles.plusBtn}>
                <Image
                  source = {require('../../assets/images/plus_btn.png')}
                  style = {StyleSheet.flatten(styles.plusIcon)}
                />
              </TouchableOpacity> */}
          </View>
          
        </TouchableOpacity>
        </View>
      );
  }

  render () {
    console.log({'statesss' : this.state.data})
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

 const mapStateToProps = (state, ownProps) =>{
  return{
    attendees: state.AttendeeReducer.attendees,
    sponsors: state.SponsorReducer.sponsorProfile,
    speakers: state.SpeakerReducer.speakers,


  }
}


export default connect(mapStateToProps)(People)