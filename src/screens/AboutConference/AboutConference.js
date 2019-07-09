'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, Text,TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

//const { width: screenWidth } = Dimensions.get('window')

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
    return this.props.navigation.goBack();
  }



  _renderItem ({item, index}, parallaxProps) {
    return (
        <View style={styles.item}>
            <ParallaxImage
                source={{ uri: item.thumbnail }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
            />
            {/* <Text style={styles.title} numberOfLines={2}>
                { item.title }
            </Text> */}
        </View>
    );
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
            {/* <Carousel
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 60}
              data={this.props.header_image}
              renderItem={this._renderItem}
              hasParallaxImages={true}
            /> */}
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

