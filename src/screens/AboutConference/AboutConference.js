'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, Text,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import Carousel from 'react-native-carousel';
import {connect} from 'react-redux'

class AboutConference extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
    }
  }
  
  handleGoBack = () => {
    return this.props.navigation.popToTop();
  }

  render () {
    const {data} = this.props;
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.green_background}/>
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
            text = {"ABOUT"}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
        
      <View style={styles.viewBody}>
        <ScrollView 
            style={{flex:1}}
            showsVerticalScrollIndicator={false}>
          <View style = {styles.sliderView}>
          <Carousel 
            indicatorAtBottom={true}
            indicatorColor="#FFFFFF"
            indicatorSize={20}
            indicatorSpace={15}
            indicatorText= '•'
            delay={8000}
            width={375}>
            <View style={styles.slideCarosel}>
              <Text>Page 1</Text>
            </View>
            <View style={styles.slideCarosel}>
              <Text>Page 2</Text>
            </View>
            <View style={styles.slideCarosel}>
              <Text>Page 3</Text>
            </View>
          </Carousel>
        </View>
            <View style={styles.srollContent}>
              <DisplayText
                text = {data.title}
                styles = {StyleSheet.flatten(styles.aboutHeaderTxt)}
              />
              <DisplayText
                text = {data.description}
                styles = {StyleSheet.flatten(styles.aboutBodyTxt)}
              />
          </View>
        </ScrollView>
      </View>
      
    </SafeAreaView>
    
   )
  }
} 

const mapStateToProps = (state, ownProps) =>{
  return{
    
    data: state.eventReducer.eventProfile
  }
}

export default connect(mapStateToProps)(AboutConference)

