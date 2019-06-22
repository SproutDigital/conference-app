'use strict';
import React, {Component} from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import {DisplayText, SubmitButton} from '../../components';
import styles, { IMAGE_HEIGHT, }  from './styles';
import { getProfile} from '../../utils';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state ={
      restoring : true,
    }

    this.animatedValue1 = new Animated.Value(0)
    this.animatedValue2 = new Animated.Value(0)
    this.animatedValue3 = new Animated.Value(0)
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount(){
    this.checkLogin();
  }

  componentDidMount () {
    this.animate()
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

  animate () {
    this.animatedValue1.setValue(0)
    this.animatedValue2.setValue(0)
    this.animatedValue3.setValue(0)
    const createAnimation = function (value, duration, easing, delay = 0) {
      return Animated.timing(
       value,
        {
          toValue: 1,
          duration,
          easing,
          delay
        }
      )
    }
    Animated.parallel([
      createAnimation(this.animatedValue1, 2000, Easing.ease),
      createAnimation(this.animatedValue2, 1000, Easing.ease, 1000),
      createAnimation(this.animatedValue3, 1000, Easing.ease, 2000)
    ]).start()
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
      const scaleText = this.animatedValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1]
      })
      return(
        <View style={styles.container}>         
          <View style = {styles.textView}>
            <DisplayText
              text={'Welcome to ignite.'}
              styles = {styles.welcomeTxt}
              onPress = {this.handleLogin}
            />
              <DisplayText
                text={'Everything about your conference, right to'}
                styles = {styles.smallWelcomeTxt}
              />
              <DisplayText
                text={'your finger tips. Everything in 1 place.'}
                styles = {styles.smallWelcomeTxt}
              />

          </View>

          <TouchableOpacity style = {StyleSheet.flatten(styles.signupLinkView)}>
            <DisplayText
              text={'GET STARTED'}
              styles = {styles.signupText}
              onPress = {this.handleLogin}
            />
          </TouchableOpacity>
        </View>
      )
    }  
  }  
} 


