'use strict';

import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import {DisplayText} from '../../components';
import styles from './styles';

export default class Register extends Component {
  constructor(props) {
    super(props);
   
    this.state = {

    };
   
  }

  componentDidMount() {
  }

  
  render () {
    return(
      <View style={styles.container}>  
  
          <DisplayText
            text={'welcome to Reset Password'}
            style={StyleSheet.flatten(styles.text)}
            onPress = {()=>this.props.navigation.goBack()}
          />
  
      </View>
    )
   
  }
  
} 

