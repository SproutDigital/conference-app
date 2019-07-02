'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { DrawerActions } from "react-navigation";



export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
    }
  }
  
  toggleDrawer = () => {
    //Props to open/close the drawer
    // this.props.navigation.toggleDrawer();
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  };

  handleAboutRoute = () => {
    return this.props.navigation.navigate('About');
  }
  

  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.green_background}/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          onPress={this.toggleDrawer} 
          style = {styles.headerImage}>
          <Image
            onPress={this.toggleDrawer} 
            source = {require('../../assets/images/menu.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <Image
            source = {require('../../assets/images/inapp_logo.png')}
            style = {StyleSheet.flatten(styles.headerLogoIcon)}
          />
      </View>
      </View>
      <View style = {styles.sliderView}>
        
      </View>
      <View style={styles.tileView}>
        <ScrollView 
          style={{flex:1}}
          showsVerticalScrollIndicator={false}>     

          <View style={styles.boxViews}>
            <TouchableOpacity 
              onPress = {this.handleAboutRoute}
              style={styles.boxes}>
              <Image
                onPress = {this.handleAboutRoute}
                source = {require('../../assets/images/about.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                onPress = {this.handleAboutRoute}
                text={'About'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/program.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'Programs'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/group.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'People'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/sponsors.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'Sponsors'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/resources.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'Resources'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/news_feed.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'News Feed'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/contact.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'Contact'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/floor_plan.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'Floor Plan'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/message.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'Message/Chat'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/photo.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'Photo'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/guide.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'Guide'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Image
                source = {require('../../assets/images/feedback.png')}
                style = {StyleSheet.flatten(styles.boxIcon)}
              />
              <DisplayText
                text={'Feedback/\nSurvey'}
                styles = {styles.boxText}
              />
            </TouchableOpacity>
          </View>
                
        </ScrollView>
      </View>
    </SafeAreaView>
    
   )
  }
} 
