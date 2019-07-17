import React, { Component } from 'react';
import {SafeAreaView,} from 'react-native';
import {logout} from '../../utils/index'
import { ProgressDialog } from 'react-native-simple-dialogs';


export default class Logout extends Component {

  constructor(){
    super();
    this.state = {
      showLoading: true,
    }
  }

  componentWillMount() {
    logout().then(()=>{   
      this.setState({showLoading:false});
      return this.props.navigation.navigate('Auth');    
    })
   }
  render() {
    const {showLoading} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ProgressDialog
          visible={showLoading}
          title="Processing"
          message="Please wait..."
        />      
      </SafeAreaView>

    );
  }
}


