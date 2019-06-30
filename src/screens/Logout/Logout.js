import React, { Component } from 'react';
import {SafeAreaView, AsyncStorage} from 'react-native';
import {logout} from '../../utils/index'


export default class Logout extends Component {

  constructor(){
    super();
  
  }

  componentWillMount() {
    logout()
   }
  render() {

    return (
      <SafeAreaView style={styles.container}>
          
            
      </SafeAreaView>

    );
  }
}


