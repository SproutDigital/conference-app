'use strict';
import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import {DisplayText, SubmitButton} from '../../components';
import styles  from './styles';
import { getProfile} from '../../utils';
import AppIntroSlider from 'react-native-app-intro-slider';
 
const slides = [
  {
    key: 'somethun',
    title: 'Check the Conference \nCalendar',
    text: 'Pickout talks You like to attend and \nset Reminder',
    image: require('../../assets/images/people.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Network!',
    text: 'Learn about the Organizers, speakers \nand other delegates and connect with \nthem easily via the app',
    image: require('../../assets/images/man.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Quick Help',
    text: 'Cant find a meeting room, not sure \nabout the weather? Like we said, \n"Everything in one place"',
    image: require('../../assets/images/woman.png'),
    backgroundColor: '#22bcb5',
  }
];


export default class BoardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
      restoring : true,
      showRealApp: false
    }

  }

  componentWillMount(){
    this.checkLogin();
  }

  _renderItem = (item) => {
    return (
      <View style={styles.slide}>
        <View style = {{}}>
          <Image source={item.image} />
        </View>

        <DisplayText 
          styles={styles.sliderTitle}
          text={item.title}
        />

        <DisplayText 
          styles={styles.sliderText}
          text={item.text}
          />
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }

  checkLogin =  async() => {

    let token = await getProfile();
    if(typeof token !== 'undefined' && token !== null ) {
      this.setState({
        restoring : false,
      });
      return this.props.navigation.navigate('Navigations');
    }
    else {
      this.setState({
        restoring : false,
      });
    }

  }


  handleLogin = () => {
    return this.props.navigation.navigate('Login');
  };

  handleRegistration = () => {
    return this.props.navigation.navigate('Register');
  };

  render () {
    
    const {restoring } = this.state;
    if(restoring) {
      return (
        <View>

        </View>
      );
    }
    else {
      
      return(
        <View style={styles.container}>         
          
         <AppIntroSlider 
            renderItem={this._renderItem} 
            slides={slides} 
            onDone={this._onDone}
            showSkipButton ={true}
            showNextButton={false}
            onSkip={() => this.props.navigation.navigate('Register')}
            onDone={() => this.props.navigation.navigate('Register')}
          />
        </View>
      )
    }  
  }  
} 


