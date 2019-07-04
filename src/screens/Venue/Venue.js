'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, Text,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { DrawerActions } from "react-navigation";
import Carousel from 'react-native-carousel';



export default class Venue extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
    }
  }
  
  handleGoBack = () => {
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
            text = {"ABOUT VENUE"}
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
                text = {'Central Hall , Kenya'}
                styles = {StyleSheet.flatten(styles.aboutHeaderTxt)}
              />
              <DisplayText
                text = {'Lorem ipsum dolor sit amet, consecteturfree remrreww adipiscing elit, sed do eiusmod tempors quiaeincididu utell labore etonemeswedd dolore magna aliquamani Ut enim adamxsw minim veniam, quis nostruddddgeio exercitationssdi ullamco laboris nisite ute aliquip exitt eaisffffi commodo consequat. Duis aute irure doloro oi reprehenderit in voluptate velit essencsi cillum dolorei eu fugiat nulla pariatur. Utenti excepteur sint occaecat cupidatat nonuytree profite proident, suntino in culpar qui official deserunt mollit anim id est laborum.teeerrr But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'}
                styles = {StyleSheet.flatten(styles.aboutBodyTxt)}
              />
          </View>
        </ScrollView>
      </View>
      
    </SafeAreaView>
    
   )
  }
} 
