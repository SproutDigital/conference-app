import React, { Component } from 'react';
import {SafeAreaView, AsyncStorage} from 'react-native';



export default class Logout extends Component {

  constructor(){
    super();
  
  }

  componentDidMount() {
    this.props.navigation.navigate('Login');
     AsyncStorage.clear();  
  }
  render() {

    return (
      <SafeAreaView style={styles.container}>
          
            
      </SafeAreaView>

    );
  }
}


