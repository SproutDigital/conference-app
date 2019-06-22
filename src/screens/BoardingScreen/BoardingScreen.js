'use strict';
import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, Text , Image} from 'react-native';
import {DisplayText, SubmitButton} from '../../components';
import styles  from './styles';
import { getProfile} from '../../utils';
import AppIntroSlider from 'react-native-app-intro-slider';
 
const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Check the conference calendar',
    image: require('../../assets/images/icon.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Network!',
    image: require('../../assets/images/icon.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'Quick Help',
    image: require('../../assets/images/icon.png'),
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
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
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
         <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>
        </View>
      )
    }  
  }  
} 


